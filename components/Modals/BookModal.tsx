import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import BookStyles from '../BookCard/BookCard.styles';

export const BookModal = ({
  isVisible,
  cover,
  title,
  author,
  release,
  genres,
  isbn,
  publisher,
  price,
  setOverlay,
}) => (
  <Modal 
    animationType='fade'
    transparent={true}
    visible={isVisible}
  >
    <View style={generalStyles.overlayContainer}>
      <View style={generalStyles.contentOverlayContainer}>
        <Image source={{ uri: cover }} style={BookStyles.bookOverlayImage}/>
        <Text style={[generalStyles.subheader2, BookStyles.bookOverlayLabel]}>
          title
        </Text>
        <Text style={[generalStyles.header1, BookStyles.bookOverlayText]}>
          {title}
        </Text>
        <Text style={[generalStyles.subheader2, BookStyles.bookOverlayLabel]}>
          authors
        </Text>
        <Text style={[generalStyles.subheader1, BookStyles.bookOverlayText]}>
          {author.join(', ')}
        </Text>
        <Text style={[generalStyles.subheader2, BookStyles.bookOverlayLabel]}>
          release
        </Text>
        <Text style={[generalStyles.header1, BookStyles.bookOverlayText]}>
          {release}
        </Text>
        <Text style={[generalStyles.subheader2, BookStyles.bookOverlayLabel]}>
          categories
        </Text>
        <Text style={[generalStyles.header1, BookStyles.bookOverlayText]}>
          {genres.join(', ')}
        </Text>
        <Text style={[generalStyles.subheader2, BookStyles.bookOverlayLabel]}>
          ISBN
        </Text>
        <Text style={[generalStyles.header1, BookStyles.bookOverlayText]}>
          {isbn}
        </Text>
        <Text style={[generalStyles.subheader2, BookStyles.bookOverlayLabel]}>
          publisher
        </Text>
        <Text style={[generalStyles.header1, BookStyles.bookOverlayText]}>
          {publisher}
        </Text>
        <Text style={[generalStyles.subheader2, BookStyles.bookOverlayLabel]}>
          price
        </Text>
        <Text style={[generalStyles.header1, BookStyles.bookOverlayText]}>
          {`$${price}`}
        </Text>
        <TouchableOpacity 
          style={generalStyles.closeOverlayButton} 
          onPress={() => setOverlay(!isVisible)}
          >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            done 
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);