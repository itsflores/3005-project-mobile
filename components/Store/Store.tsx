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
  thumbnailUrl: string | null,
  title: string | null,
  authors: string | null,
  publishedYear: string | null,
  categories: string | null, 
  isbn: string | null,
  price: string | null,
  pageCount: string | null,
}

interface StoreState {
  bookList: any,
  order: string[],
  userAdmin: boolean,
  search: null | string,
  showNewBook: boolean,
  newBook: newBook,
}

interface StoreProps {
}

const newBookInit = {
  thumbnailUrl: null,
  title: null,
  authors: null,
  publishedYear: null,
  categories: null, 
  isbn: null,
  price: null,
  pageCount: null,
}

const bookInputInfo = {
  title: 'title',
  authors: 'authors',
  publishedYear: 'year published',
  categories: 'categories',
  pageCount: 'number of pages',
  isbn: 'ISBN',
  price: 'price'
}

export default class Store extends React.Component<StoreProps, StoreState> {
  constructor(props) {
    super(props);
    this.state = {
      bookList: books.sort((a: any, b: any) => parseInt(b.publishedYear) - parseInt(a.publishedYear)),
      order: [],
      userAdmin: true,
      search: null,
      showNewBook: false,
      newBook: newBookInit,
    }
  }

  addToCart = (newId) => {
    const { order } = this.state;
    const newOrder = order;
    newOrder.push(newId);

    this.setState({ order: newOrder })
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
        return (book.title.toUpperCase().includes(input.toUpperCase()))
        || (book.authors.join(' ').toUpperCase().includes(input.toUpperCase()))
        || (book.categories.join(' ').toUpperCase().includes(input.toUpperCase()))
        || (book.publishedYear.toString().includes(input.toUpperCase()))
        || (book.pageCount.toString().includes(input.toUpperCase()))
        || (book.price.toString().includes(input.toUpperCase()))
        || (book.isbn.includes(input.toUpperCase()))
      });
    
      if (currList.length > 0) {
        this.setState({ bookList: currList });
      } else {
        this.setState({ bookList: [] });
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
            thumbnailUrl: upload.uri
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
    const { newBook, bookList } = this.state;
    let verified = true;

    Object.keys(newBook).forEach((entry) => {
      if (newBook[entry] === null 
        || parseInt(newBook['price']) === NaN
        || newBook['price'].length > 4
        || parseInt(newBook['publishedYear']) === NaN
        || parseInt(newBook['pageCount']) === NaN) {
        verified = false;
      }
    })

    // console.log(newBook);

    if (verified) {
      const newList = bookList;

      newList.push({
        ...newBook,
        id: `b-${bookList.length + 1}`,
        publishedYear: parseInt(newBook.publishedYear),
        authors: [...newBook.authors.split(',')],
        categories: [...newBook.authors.split(',')],
        pageCount: parseInt(newBook.pageCount),
        price: parseInt(newBook.price)
      })
      newList.sort((a, b) => parseInt(b.publishedYear) - parseInt(a.publishedYear))

      this.setState({
        showNewBook: false, 
        newBook: newBookInit, 
        bookList: newList
      })
    } else {
      Alert.alert(
        'LookinnaBook',
        `Please verify your information and try again!`,
        [{
          text: 'Done',
          style: 'default'
        }], {
          cancelable: true
        }
      );
    }

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
                  <Image source={newBook.thumbnailUrl ? {uri: newBook.thumbnailUrl} : emptyCover} style={BookStyles.bookOverlayImage}/>
                </TouchableOpacity>
                <View>
                  {Object.keys(bookInputInfo).map((key, index) => (
                    <TextInput 
                      key={index}
                      value={newBook[key]}
                      onChangeText={(input) => this.updateNewBook(input, key)}
                      style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
                      placeholder={bookInputInfo[key]}
                      keyboardType={key === 'price' ? 'number-pad' : 'default'}
                    />
                  ))}
                </View>
              </ScrollView>
              <TouchableOpacity 
                style={generalStyles.closeOverlayButton} 
                onPress={() => this.saveNewBook()}
              >
                <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
                  add book 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={generalStyles.exitOverlayButton} 
                onPress={() => this.setState({ showNewBook: false, newBook: newBookInit })}
              >
                <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
                  close
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
              release={book.publishedYear}
              id={book.id}
              isbn={book.isbn}
              genres={book.categories}
              addBook={this.addToCart}
              removeBook={this.removeFromCart}
              type="store"
              numPages={book.pageCount}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}