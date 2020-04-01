import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Button, Modal } from 'react-native';
import selected from '../../assets/img/selected.png';
import unselected from '../../assets/img/unselected.png';
import { generalStyles, colors } from '../../App.styles';
import bookStyles from './BookCard.styles';

const BookCard = ({ title, author, price, cover, release, id, isbn, genres, addBook, removeBook }) => {
  const [bookSelected, setSelection] = useState(false)
  const [showOverlay, setOverlay] = useState(false)

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
      <Modal 
        animationType='fade'
        transparent={true}
        visible={showOverlay}
      >
        <View style={{
          width: '100%', 
          height: '100%', 
          flexDirection: 'column',
          position: 'absolute', 
          padding: 20, 
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View style={{
            width: '100%',
            borderRadius: 20,
            backgroundColor: 'white',
            padding: 60,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image source={{ uri: cover }} style={{
              height: 120,
              width: 140, 
              resizeMode: 'contain'
            }}/>
            <Text style={[generalStyles.subheader2, { marginTop: 6, marginBottom: -6, textAlign: 'center' }]}>
              title
            </Text>
            <Text style={[generalStyles.header1, { textAlign: 'center' }]}>
              {title}
            </Text>

            <Text style={[generalStyles.subheader2, { marginTop: 6, marginBottom: -6, textAlign: 'center' }]}>
              authors
            </Text>
            <Text style={[generalStyles.subheader1, { textAlign: 'center' }]}>
              {author.join(', ')}
            </Text>

            <Text style={[generalStyles.subheader2, { marginTop: 6, marginBottom: -6, textAlign: 'center' }]}>
              release
            </Text>
            <Text style={[generalStyles.header1, { textAlign: 'center' }]}>
              {release}
            </Text>

            <Text style={[generalStyles.subheader2, { marginTop: 6, marginBottom: -6, textAlign: 'center' }]}>
              categories
            </Text>
            <Text style={[generalStyles.header1, { textAlign: 'center' }]}>
              {genres.join(', ')}
            </Text>

            <Text style={[generalStyles.subheader2, { marginTop: 6, marginBottom: -6, textAlign: 'center' }]}>
              ISBN
            </Text>
            <Text style={[generalStyles.header1, { textAlign: 'center' }]}>
              {isbn}
            </Text>
            <TouchableOpacity 
              style={{ 
                position: 'absolute',
                bottom: 10,
                right: 14,
              }} 
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
      <TouchableOpacity style={bookStyles.bookmarkButton} onPress={() => updateCart()}>
        <Image style={bookStyles.bookmarkImage} source={bookSelected ? selected : unselected} />
      </TouchableOpacity>
    </View>
  )
}

export default BookCard;