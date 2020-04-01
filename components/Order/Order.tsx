import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import newbook from '../../assets/img/newbook.png';
import OrderStyles from './Order.styles';
import books from '../../util/files';
import BookCard from '../../components/BookCard/BookCard';
import { generalStyles } from '../../App.styles';
import { Header } from '../Shared/SharedComponents';

interface OrderProps {

}

interface OrderState {
  order: string [],
}

export default class Order extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    }
  }

  render() {
    return (
      <View style={OrderStyles.orderContainer}>
        <View style={OrderStyles.headerContainer}>
          <Header title="Order" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={OrderStyles.bookListConainer}>
          {/* {bookList.map((book, index) => (
            index < 10 && (
              <BookCard 
                key={index}
                author={book.authors} 
                title={book.title} 
                cover={book.thumbnailUrl} 
                price={book.price} 
                release={book.publishedDate.date}
                id={book.id}
                addBook={this.addToCart}
                removeBook={this.removeFromCart}
              />
            )
          ))} */}
        </ScrollView>
      </View>
    );
  }
}