import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Button, Modal } from 'react-native';
import selected from '../../assets/img/selected.png';
import unselected from '../../assets/img/unselected.png';
import { generalStyles, colors } from '../../App.styles';
import bookStyles from './BookCard.styles';

const BookCard = ({ title, author, price, cover, release, id, isbn, genres, addBook, removeBook, isSelected = false, type }) => {
  const [bookSelected, setSelection] = useState(isSelected)
  const [showOverlay, setOverlay] = useState(false)

  useEffect(() => {
    if (type === 'store') {
      if (!bookSelected) {
        addBook(id);
      } else {
        removeBook(id);
      }
    }
    
    if (type === 'order') {
      if (!bookSelected) {
        removeBook(id);
      }
    }
  }, [bookSelected]);

  return (
    <View style={bookStyles.cardContainer}>
      <Modal 
        animationType='fade'
        transparent={true}
        visible={showOverlay}
      >
        <View style={bookStyles.overlayContainer}>
          <View style={bookStyles.bookOverlayContainer}>
            <Image source={{ uri: cover }} style={bookStyles.bookOverlayImage}/>
            <Text style={[generalStyles.subheader2, bookStyles.bookOverlayLabel]}>
              title
            </Text>
            <Text style={[generalStyles.header1, bookStyles.bookOverlayText]}>
              {title}
            </Text>
            <Text style={[generalStyles.subheader2, bookStyles.bookOverlayLabel]}>
              authors
            </Text>
            <Text style={[generalStyles.subheader1, bookStyles.bookOverlayText]}>
              {author.join(', ')}
            </Text>
            <Text style={[generalStyles.subheader2, bookStyles.bookOverlayLabel]}>
              release
            </Text>
            <Text style={[generalStyles.header1, bookStyles.bookOverlayText]}>
              {release}
            </Text>
            <Text style={[generalStyles.subheader2, bookStyles.bookOverlayLabel]}>
              categories
            </Text>
            <Text style={[generalStyles.header1, bookStyles.bookOverlayText]}>
              {genres.join(', ')}
            </Text>
            <Text style={[generalStyles.subheader2, bookStyles.bookOverlayLabel]}>
              ISBN
            </Text>
            <Text style={[generalStyles.header1, bookStyles.bookOverlayText]}>
              {isbn}
            </Text>
            <TouchableOpacity 
              style={bookStyles.closeOverlayButton} 
              onPress={() => setOverlay(!showOverlay)}
             >
              <Text style={[generalStyles.header1, { color: colors.blue }]}>
                done ->
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setOverlay(!showOverlay)} style={bookStyles.descriptionContainer}>
        <Image source={{uri: cover}} style={bookStyles.bookCover} />
        <View style={bookStyles.textContainer}>
          <Text style={generalStyles.header1}>
            {title}
          </Text>
          <Text style={[generalStyles.header2, { marginTop: 4 }]}>
            {author.join(', ')}
          </Text>
          <Text style={[generalStyles.header2, { textDecorationLine: 'underline' }]}>
            {release}
          </Text>
          <Text style={[generalStyles.header3, { bottom: 0, right: 14, position: 'absolute'}]}>
            {`$${price}`}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={bookStyles.bookmarkButton} onPress={() => setSelection(!bookSelected)}>
        <Image style={bookStyles.bookmarkImage} source={bookSelected ? selected : unselected} />
      </TouchableOpacity>
    </View>
  )
}

export default BookCard;