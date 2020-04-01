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
}

export default class Order extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      order: [1,2,3,4].map((book, index) => books[index].id),
    }
  }

  removeFromCart = (target) => {
    const { order } = this.state;
    const newOrder = order;
    
    newOrder.splice(newOrder.findIndex((id) => id === target), 1);
    this.setState({ order: newOrder })
  }

  render() {
    const { order } = this.state;

    return (
      <View style={OrderStyles.orderContainer}>
        <View style={OrderStyles.headerContainer}>
          <Header title="Order" />
        </View>
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
          <View style={{ width: '100%', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <View>
              <Text>
                Books
              </Text>
              <Text>
                Shipping
              </Text>
              <Text>
                Total
              </Text>
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text>
                Books
              </Text>
              <Text>
                Shipping
              </Text>
              <Text>
                Total
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{ 
            width: '80%',
            padding: 10,
            borderRadius: 10,
            backgroundColor: colors.blue
           }}>
            <Text>
              checkout ->
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}