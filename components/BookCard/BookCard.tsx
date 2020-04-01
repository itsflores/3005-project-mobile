import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import selected from '../../assets/img/selected.png';
import unselected from '../../assets/img/unselected.png';
import { generalStyles } from '../../App.styles';
import bookStyles from './BookCard.styles';

const BookCard = ({ title, author, price, cover, release, id, addBook, removeBook }) => {
  const [bookSelected, setSelection] = useState(false)

  const updateCart = () => {
    setSelection(!bookSelected);

    if (!bookSelected) {
      addBook(id);
    } else {
      removeBook(id);
    }
  }

  return (
    <View style={bookStyles.cardContainer}>
      <View style={bookStyles.descriptionContainer}>
        <Image source={{uri: cover}} style={bookStyles.bookCover} />
        <View style={bookStyles.textContainer}>
          <Text style={generalStyles.title}>
            {title}
          </Text>
          <Text style={[generalStyles.header2, { marginTop: 10 }]}>
            {author}
          </Text>
          <Text style={[generalStyles.header2, { textDecorationLine: 'underline' }]}>
            {release}
          </Text>
          <Text style={[generalStyles.header3, { bottom: 0, right: 14, position: 'absolute'}]}>
            {`$${price}`}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={bookStyles.bookmarkButton} onPress={() => updateCart()}>
        <Image style={bookStyles.bookmarkImage} source={bookSelected ? selected : unselected} />
      </TouchableOpacity>
    </View>
  )
}

export default BookCard;