import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { loadAsync } from 'expo-font';
import newbook from '../../assets/img/newbook.png';
import StoreStyles from './Store.styles';
import books from '../../util/files';

interface StoreState {
  bookList: any,
  fontsReady: boolean,
  order: string []
}

interface StoreProps {
  initial: number,
}

export default class Store extends React.Component<StoreProps, StoreState> {
  constructor(props) {
    super(props);
    this.state = {
      bookList: books,
      fontsReady: false,
      order: []
    }
  }

  async componentDidMount() {
    const { fontsReady } = this.state;

    if (!fontsReady) {
      await loadAsync({
        'cabin': require('../../assets/fonts/CabinSketch-Regular.ttf'),
        'worksans-regular': require('../../assets/fonts/WorkSans-Regular.ttf'),
        'worksans-light': require('../../assets/fonts/WorkSans-Light.ttf'),
        'worksans-medium': require('../../assets/fonts/WorkSans-Medium.ttf')
      });

      this.setState({
        fontsReady: true,
      });
    }
  }

  render() {
    const { fontsReady, bookList } = this.state;

    return (
      fontsReady && (
        <View style={StoreStyles.storeContainer}>
          <View style={StoreStyles.headerContainer}>
            <Text style={{ fontFamily: 'cabin', fontSize: 40 }}>
              Store
            </Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'worksans-regular', fontSize: 16, marginRight: 10 }}>
                New
                {"\n"}
                Book
              </Text>
              <Image source={newbook} style={{ resizeMode: 'contain', width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {bookList.map((book, index) => (
              index < 10 && (<Text>
                {book.title}
              </Text>)
            ))}
          </ScrollView>
        </View>
      )
    )
  }
}