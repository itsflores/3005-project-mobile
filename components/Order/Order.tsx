import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import newbook from '../../assets/img/newbook.png';
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

interface OrderState {
  order: string [],
  totalPrice: number,
  booksPrice: number,
}

export default class Order extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      order: [1,2,3,4].map((book, index) => books[index].id),
      booksPrice: 0,
      totalPrice: 0,
    }
  }

  removeFromCart = (target) => {
    const { order } = this.state;
    const newOrder = order;
    
    newOrder.splice(newOrder.findIndex((id) => id === target), 1);
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
            {books.map((book, index) => (
              order.includes(book.id) && (<BookCard
                key={index}
                author={book.authors}
                title={book.title}
                cover={book.thumbnailUrl}
                price={book.price}
                release={book.publishedDate.date}
                id={book.id}
                isbn={book.isbn}
                genres={book.categories}
                addBook={null}
                isSelected={true}
                removeBook={this.removeFromCart}
                type="order"
              />)
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
              <View style={{ marginLeft: 20 }}>
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
                checkout ->
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    );
  }
}