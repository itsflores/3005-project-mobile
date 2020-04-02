import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import * as imagePicker from 'expo-image-picker';
import { generalStyles, colors } from '../../App.styles';
import StoreStyles from './Store.styles';
import BookStyles from '../BookCard/BookCard.styles';
import books from '../../util/files';
import BookCard from '../../components/BookCard/BookCard';
import { Header } from '../../components/Shared/SharedComponents';
import newbook from '../../assets/img/newbook.png';
import emptyCover from '../../assets/img/emptyCover.png';

interface newBook {
  uri: string | null,
  title: string | null,
  authors: string | null,
  release: string | null,
  catergories: string | null, 
  isbn: string | null,
  price: string | null,
}

const newBookInit = {
  uri: null,
  title: null,
  authors: null,
  release: null,
  catergories: null, 
  isbn: null,
  price: null,
}

interface StoreState {
  bookList: any,
  order: string[],
  userAdmin: boolean,
  search: null | string,
  showNewBook: boolean,
  newBook: newBook
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
      search: null,
      showNewBook: false,
      newBook: newBookInit,
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

  uploadImage = () => {
    imagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 0.2,
    }).then((upload) => {
      if (upload.cancelled) {
        Alert.alert(
          'LookinnaBook',
          `That image didn't work, please try again!`,
          [{
            text: 'Done',
            style: 'default'
          }], {
            cancelable: true
          }
        );
      } else {
        this.setState((prevState) => ({
          newBook: {
            ...prevState.newBook,
            uri: upload.uri
          }
        }));
      }
    })
  }

  updateNewBook = (input, type) => {
    this.setState((prevState) => ({
      newBook: {
        ...prevState.newBook,
        [type]: input
      }
    }))
  }

  saveNewBook = () => {
    this.setState({ showNewBook: false, newBook: newBookInit })
  }

  render() {
    const { bookList, userAdmin, order, search, showNewBook, newBook } = this.state;

    return (
      <View style={StoreStyles.storeContainer}>
        <Modal 
          animationType='fade'
          transparent={true}
          visible={showNewBook}
        >
          <View style={generalStyles.overlayContainer}>
            <View style={generalStyles.contentOverlayContainer}>
              <ScrollView style={{ width: '100%', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => this.uploadImage()} style={{ alignSelf: 'center' }}>
                  <Image source={newBook.uri ? {uri: newBook.uri} : emptyCover} style={BookStyles.bookOverlayImage}/>
                </TouchableOpacity>
                <TextInput 
                  value={newBook.title}
                  onChangeText={(input) => this.updateNewBook(input, 'title')}
                  style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
                  placeholder="title" 
                />
                <TextInput 
                  value={newBook.authors}
                  onChangeText={(input) => this.updateNewBook(input, 'authors')}
                  style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
                  placeholder="authors"
                />
                <TextInput 
                  value={newBook.release}
                  onChangeText={(input) => this.updateNewBook(input, 'release')}
                  style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
                  placeholder="release date" 
                />
                <TextInput 
                  value={newBook.catergories}
                  onChangeText={(input) => this.updateNewBook(input, 'categories')}
                  style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
                  placeholder="categories"
                />
                <TextInput 
                  value={newBook.isbn}
                  onChangeText={(input) => this.updateNewBook(input, 'isbn')}
                  style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
                  placeholder="ISBN" 
                />
                <TextInput 
                  value={newBook.price}
                  onChangeText={(input) => this.updateNewBook(input, 'price')}
                  style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
                  placeholder="price"
                  keyboardType='number-pad'
                />
              </ScrollView>
              <TouchableOpacity 
                style={generalStyles.closeOverlayButton} 
                onPress={() => this.saveNewBook()}
              >
                <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
                  add book 
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={StoreStyles.headerContainer}>
          <Header title="Store" />
          {userAdmin && (
            <TouchableOpacity onPress={() => this.setState({ showNewBook: true })} style={StoreStyles.newBookButton}>
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