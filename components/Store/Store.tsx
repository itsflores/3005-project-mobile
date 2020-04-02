import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import StoreStyles from './Store.styles';
import books from '../../util/files';
import BookCard from '../../components/BookCard/BookCard';
import { Header } from '../../components/Shared/SharedComponents';
import newbook from '../../assets/img/newbook.png';

interface StoreState {
  bookList: any,
  order: string[],
  userAdmin: boolean,
  search: null | string
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
      search: null
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

    newOrder.splice(newOrder.findIndex((item) => item === target), 1);

    this.setState({ order: newOrder })
  }
  
  updateBookList = (input) => {
    const { bookList } = this.state;
    this.setState({ search: input })

    if (input) {
      const currList = bookList.filter((book) => {
        return book.title.toUpperCase().includes(input.toUpperCase())
      });
    
      if (currList.length > 0) {
        this.setState({ bookList: currList });
      } else {
        this.setState({ bookList: books });
      }
    } else {
      this.setState({ bookList: books });
    }
  }

  render() {
    const { bookList, userAdmin, order, search } = this.state;

    return (
      <View style={StoreStyles.storeContainer}>
        <View style={StoreStyles.headerContainer}>
          <Header title="Store" />
          {userAdmin && (
            <TouchableOpacity style={StoreStyles.newBookButton}>
              <Text style={[generalStyles.header1, { marginRight: 10 }]}>
                new
                {'\n'}
                book
              </Text>
              <Image source={newbook} style={StoreStyles.newBookImage} />
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          onChangeText={(e) => this.updateBookList(e)}
          style={[generalStyles.header1, StoreStyles.searchBox]}
          placeholder="search"
          value={search}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={StoreStyles.bookListConainer}>
          {bookList.map((book, index) => (
            <BookCard
              key={index}
              author={book.authors}
              title={book.title}
              cover={book.thumbnailUrl}
              price={book.price}
              release={book.publishedDate.date}
              id={book.id}
              isbn={book.isbn}
              genres={book.categories}
              addBook={this.addToCart}
              removeBook={this.removeFromCart}
              type="store"
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}