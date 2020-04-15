import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeBookFromOrder, increaseBookOrder, decreaseBookOrder, clearOrder } from '../../util/actions';
import OrderStyles from './Order.styles';
import BookCard from '../../components/BookCard/BookCard';
import { generalStyles, colors } from '../../App.styles';
import { Header } from '../Shared/SharedComponents';
import { runQuery } from '../../database';

const pricing = {
  shipping: 12,
  tax: 0.13
}

interface OrderProps {
  bookAppStore: any,
	removeBookFromOrder: Function,
  increaseBookOrder: Function, 
  decreaseBookOrder: Function,
  clearOrder: Function
}

interface OrderState {
  totalPrice: number,
  totalBooksPrice: number,
  totalBooks: number
  totalTax: number,
  totalShipping: number,
  currOrder: [],
}

class Order extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      totalBooksPrice: 0,
      totalBooks: 0,
      totalPrice: 0,
      totalTax: 0,
      totalShipping: 0,
      currOrder: []
    }
  }

  componentDidMount() {
    this.updatePricing(); 
  }

  componentDidUpdate(prevProps, prevState) {
    const { order } = this.props.bookAppStore;    
    const newBooksPrice = order.reduce((acc, currBook) => acc += currBook.quantity * currBook.book.price, 0);

    if (prevState.totalBooksPrice !== newBooksPrice) {
      this.updatePricing();
    }
  }

  updatePricing = () => {
    const { order } = this.props.bookAppStore;
    const newBooks = order.reduce((acc, currBook) => acc += currBook.quantity, 0)
    const newBooksPrice = order.reduce((acc, currBook) => acc += currBook.quantity * currBook.book.price, 0);
    const newTax = newBooksPrice * pricing.tax;
    const newShipping = order.reduce((acc, currBook) => acc += currBook.quantity, 0) % 3 * pricing.shipping + pricing.shipping;
    const newTotal = newBooksPrice + newTax + newShipping;

    this.setState({
      totalBooksPrice: parseFloat(newBooksPrice.toFixed()), 
      totalShipping: parseFloat(newShipping.toFixed()), 
      totalTax: parseFloat(newTax.toFixed()), 
      totalPrice: parseFloat(newTotal.toFixed()), 
      totalBooks: parseFloat(newBooks.toFixed()) 
    });
  }

  checkout = async () => {
    const { totalPrice } = this.state;
    const { order, currUser } = this.props.bookAppStore;

    if (currUser === null) {
      Alert.alert(
        'LookinnaBook',
        `You must be logged in in order to place an order!`,
        [{
          text: 'Done',
          style: 'default'
        }], {
          cancelable: true
        }
      );

      return;
    }

    if (!currUser.cardNumber) {
      Alert.alert(
        'LookinnaBook',
        `You don't seem to have valid billing information, please update it!`,
        [{
          text: 'Done',
          style: 'default'
        }], {
          cancelable: true
        }
      );

      return;
    }

    const numOrders = await runQuery(`
      select * 
      from orders;
    `).then((result: any) => Promise.resolve(result._array.length));

    const newOrderId = `o-${numOrders + 1}`;
    const currDate = new Date();

    await runQuery(`
      insert into orders (
        tracking_num, user_ID, price, year, day, month
      ) 
      values (
        '${newOrderId}', '${currUser.userId}', '${totalPrice}', ${currDate.getFullYear()}, ${currDate.getDay()}, ${currDate.getMonth()}
      );
    `);

    const numItems = await runQuery(`
      select * 
      from item;
    `).then((result: any) => Promise.resolve(result._array.length));

    await order.forEach(async (item, index) => {
      await runQuery(`
        insert into item (
          item_ID, order_ID, book_ID, quantity
        )
        values (
          'i-${numItems + index + 1}', '${newOrderId}', '${item.book.book_ID}', ${item.quantity}
        );
      `)

      // if (item.quantity === item.book.stock) {
        //!SEND EMAIL TO PUBLISHER HERE
      // }
    });

    const dbOrders = await runQuery('select * from orders').then((result: any) => result._array);
    const dbItems = await runQuery('select * from item').then((result: any) => result._array);

    // console.log(dbOrders);
    // console.log(dbItems);

    Alert.alert(
      'LookinnaBook',
      `Your order has been placed!`,
      [{
        text: 'Done',
        style: 'default'
      }], {
        cancelable: true
      }
    );
    this.props.clearOrder();
  }

  render() {
    const { order } = this.props.bookAppStore;
    const { totalPrice, totalBooksPrice, totalShipping, totalTax } = this.state;

    return (
      <View style={OrderStyles.orderContainer}>
        <View style={OrderStyles.headerContainer}>
          <Header title="Order" />
        </View>
        {order.length === 0 ? (
          <View style={OrderStyles.emptyOrderBanner}>
            <Text style={generalStyles.header1}>
              You have no items in your cart!
            </Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={OrderStyles.bookListConainer}>
            {order.map((currItem, index) => (
              <View key={index}>
                <BookCard
                  title={currItem.book.title}
                  author={currItem.book.authors}
                  cover={currItem.book.thumbnail_url}
                  price={currItem.book.price}
                  release={currItem.book.published_year}
                  id={currItem.book.book_ID}
                  isbn={currItem.book.isbn}
                  genres={currItem.book.categories}
                  numPages={currItem.book.page_count}
                  publisher={currItem.book.publisher_ID}
                  type="order"
                />
                <View style={{ 
                  flex: 1, 
                  flexDirection: 'row', 
                  alignContent: 'center', 
                  alignItems: 'center', 
                  justifyContent: 'center'
                }}>
                  <TouchableOpacity onPress={() => {
                    if (currItem.quantity === 1) {
                      this.props.removeBookFromOrder(order.findIndex((curr) => curr.book.book_ID === currItem.book.book_ID));
                    } else if (currItem.quantity > 0) {
                      this.props.decreaseBookOrder(order.findIndex((curr) => curr.book.book_ID === currItem.book.book_ID));
                      this.updatePricing();
                    }
                  }}>
                    <Text style={[generalStyles.actionExit, { color: colors.blue, fontSize: 30, lineHeight: 40 }]}>
                      -
                    </Text>
                  </TouchableOpacity>
                  <Text style={[generalStyles.header1Bold, { marginRight: 20, marginLeft: 20 }]}>
                    {currItem.quantity}
                  </Text>
                  <TouchableOpacity onPress={() => {
                    if (currItem.quantity < 25) {
                      this.props.increaseBookOrder(order.findIndex((curr) => curr.book.book_ID === currItem.book.book_ID));
                      this.updatePricing();
                    }
                  }}>
                    <Text style={[generalStyles.actionExit, { color: colors.blue, fontSize: 30, lineHeight: 40 }]}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '100%', borderBottomColor: 'black', borderBottomWidth: 1 }} />
              </View>
            ))}
            <View style={OrderStyles.checkoutContainer}>
              <View>
                <Text style={generalStyles.header1}>
                  Books
                </Text>
                <Text style={generalStyles.header1}>
                  Shipping
                </Text>
                <Text style={generalStyles.header1}>
                  Tax
                </Text>
                <Text style={generalStyles.header1Bold}>
                  Total
                </Text>
              </View>
              <View style={{ marginLeft: 40 }}>
                <Text style={generalStyles.header1}>
                  $
                </Text>
                <Text style={generalStyles.header1}>
                  $
                </Text>
                <Text style={generalStyles.header1}>
                  $
                </Text>
                <Text style={generalStyles.header1Bold}>
                  $
                </Text>
              </View>
              <View style={OrderStyles.checkoutPriceContainer}>
                <Text style={generalStyles.header1}>
                  {`${totalBooksPrice.toFixed(2)}`}
                </Text>
                <Text style={generalStyles.header1}>
                  {`${totalShipping.toFixed(2)}`}
                </Text>
                <Text style={generalStyles.header1}>
                  {`${totalTax.toFixed(2)}`}
                </Text>
                <Text style={generalStyles.header1Bold}>
                  {`${totalPrice.toFixed(2)}`}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.checkout()} style={[OrderStyles.checkoutButton, { marginBottom: 20 }]}>
              <Text style={[generalStyles.actionButton]}>
                checkout 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.props.clearOrder()} 
              style={[OrderStyles.checkoutButton, { 
                marginTop: 0, 
                justifyContent: 'center',
                backgroundColor: 'white',
                borderColor: colors.blue,
                borderWidth: 2,
                width: '50%',
                alignSelf: 'center'
              }]}>
              <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                clear order 
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
		removeBookFromOrder,
    increaseBookOrder,
    decreaseBookOrder,
    clearOrder,
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { bookAppStore } = state
  return { bookAppStore }
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);