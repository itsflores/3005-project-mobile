import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeBookFromOrder, increaseBookOrder, decreaseBookOrder } from '../../util/actions';
import OrderStyles from './Order.styles';
import BookCard from '../../components/BookCard/BookCard';
import { generalStyles, colors } from '../../App.styles';
import { Header } from '../Shared/SharedComponents';

const pricing = {
  shipping: 12,
  tax: 0.13
}

interface OrderProps {
  bookAppStore: any,
	removeBookFromOrder: Function,
  increaseBookOrder: Function, 
  decreaseBookOrder: Function
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

  updatePricing = () => {
    const { order } = this.props.bookAppStore;
    const newBooks = order.reduce((acc, currBook) => acc += currBook.quantity, 0)
    const newBooksPrice = order.reduce((acc, currBook) => acc += currBook.quantity * currBook.book.price, 0);
    const newTax = newBooksPrice * pricing.tax;
    const newShipping = order.reduce((acc, currBook) => acc += currBook.quantity, 0) % 3 * pricing.shipping + pricing.shipping;
    const newTotal = newBooksPrice + newTax + newShipping;

    this.setState({ 
      totalBooksPrice: newBooksPrice, 
      totalShipping: newShipping, 
      totalTax: newTax, 
      totalPrice: newTotal, 
      totalBooks: newBooks 
    });
  }

  render() {
    const { order } = this.props.bookAppStore;
    const { totalPrice, totalBooksPrice, totalShipping, totalTax } = this.state;
    // console.log(order);

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
                  cover={currItem.book.thumbnailUrl}
                  price={currItem.book.price}
                  release={currItem.book.publishedYear}
                  id={currItem.book.id}
                  isbn={currItem.book.isbn}
                  genres={currItem.book.categories}
                  numPages={currItem.book.pageCount}
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
                      this.props.removeBookFromOrder(order.findIndex((curr) => curr.book.id === currItem.book.id));
                    } else if (currItem.quantity > 0) {
                      this.props.decreaseBookOrder(order.findIndex((curr) => curr.book.id === currItem.book.id));
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
                      this.props.increaseBookOrder(order.findIndex((curr) => curr.book.id === currItem.book.id));
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
            <TouchableOpacity style={OrderStyles.checkoutButton}>
              <Text style={[generalStyles.actionButton]}>
                checkout 
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
    decreaseBookOrder
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { bookAppStore } = state
  return { bookAppStore }
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);