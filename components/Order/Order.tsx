import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import OrderStyles from './Order.styles';
import books from '../../util/files';
import BookCard from '../../components/BookCard/BookCard';
import { generalStyles, colors } from '../../App.styles';
import { Header } from '../Shared/SharedComponents';

const pricing = {
  shipping: 24,
  tax: 0.13
}

interface OrderProps {
  
}

interface bookUnit {
  book: any,
  quantity: number
}

interface OrderState {
  order: bookUnit [],
  totalPrice: number,
  booksPrice: number,
}

export default class Order extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      order: [{book: books[0], quantity: 1}, {book: books[1], quantity: 1}, {book: books[2], quantity: 1}, {book: books[3], quantity: 1}],
      booksPrice: 0,
      totalPrice: 0,
    }
  }

  removeFromCart = (target) => {
    const { order } = this.state;
    const newOrder = order;
    
    newOrder.splice(order.findIndex((currItem) => currItem.book.id === target), 1);
    this.setState({ order: newOrder })
  }

  render() {
    const { order, totalPrice, booksPrice } = this.state;

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
                  isSelected={true}
                  removeBook={this.removeFromCart}
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
                      this.removeFromCart(currItem.book.id)
                    } else if (currItem.quantity > 0) {
                      const newOrder = order;
                      newOrder[order.findIndex((curr) => curr.book.id === currItem.book.id)].quantity--;
                      this.setState({ order: newOrder })
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
                      const newOrder = order;
                      newOrder[order.findIndex((curr) => curr.book.id === currItem.book.id)].quantity++;
                      this.setState({ order: newOrder })
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
                <Text style={generalStyles.header1Bold}>
                  $
                </Text>
              </View>
              <View style={OrderStyles.checkoutPriceContainer}>
                <Text style={generalStyles.header1}>
                  {`${booksPrice.toFixed(2)}`}
                </Text>
                <Text style={generalStyles.header1}>
                  {`${pricing.shipping.toFixed(2)}`}
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