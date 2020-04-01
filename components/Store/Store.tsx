import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import newbook from '../../assets/img/newbook.png';
import StoreStyles from './Store.styles';
import books from '../../util/files';
import BookCard from '../../components/BookCard/BookCard';
import { generalStyles } from '../../App.styles';

interface StoreState {
  bookList: any,
  order: string [],
  userAdmin: boolean,
}

interface StoreProps {
}

export default class Store extends React.Component<StoreProps, StoreState> {
  constructor(props) {
    super(props);
    this.state = {
      bookList: books,
      order: [],
      userAdmin: true,
    }
  }

  addToCart = (newId) => {
    const { order } = this.state;
    const newORder = order;
    newORder.push(newId);

    this.setState({ order: newORder })
  }

  removeFromCart = (target) => {
    const { order } = this.state;
    const newOrder = order;

    newOrder.splice(newOrder.findIndex((item) => item === target));

    this.setState({order: newOrder})
  }

  render() {
    const { bookList, userAdmin, order } = this.state;

    return (
      <View style={StoreStyles.storeContainer}>
        <View style={StoreStyles.headerContainer}>
          <Text style={generalStyles.appHeader}>
            Store
          </Text>
          {userAdmin && (
            <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
              <Text style={[generalStyles.title, { marginRight: 10 }]}>
                New
                {"\n"}
                Book
              </Text>
              <Image source={newbook} style={{ resizeMode: 'contain', width: 50, height: 50 }} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>
          {bookList.map((book, index) => (
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
          ))}
        </ScrollView>
      </View>
    )
  }
}