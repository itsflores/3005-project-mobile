import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Button, Modal } from 'react-native';
import selected from '../../assets/img/selected.png';
import unselected from '../../assets/img/unselected.png';
import { generalStyles } from '../../App.styles';
import BookStyles from './BookCard.styles';
import { BookModal } from '../Modals/BookModal';

const BookCard = ({ title, author, price, cover, release, id, isbn, genres, publisher, addBook = null, removeBook = null, numPages, type, signal }) => {
  const [bookSelected, setSelection] = useState(false);
  const [showOverlay, setOverlay] = useState(false);
  const [resetSignal, setSignal] = useState(signal);
  const componentDidMount = useRef(false);

  useEffect(() => {
    if (signal !== resetSignal) {
      setSignal(signal);
      setSelection(false);
    } 
  }, [signal])

  useEffect(() => {
    if (componentDidMount.current) {
      if (bookSelected) {
        addBook(id);
      } else {
        removeBook(id);
      }
    } else {
      componentDidMount.current = true;
    }
  }, [componentDidMount, bookSelected]);

  return (
    <View style={BookStyles.cardContainer}>
      <BookModal 
        isVisible={showOverlay}
        cover={cover}
        title={title}
        author={author}
        release={release}
        genres={genres}
        isbn={isbn}
        publisher={publisher}
        price={price}
        setOverlay={setOverlay}
      />

      <TouchableOpacity onPress={() => setOverlay(!showOverlay)} style={[BookStyles.descriptionContainer, (type === 'order' && { width: '100%' })]}>
        <Image source={{uri: cover}} style={BookStyles.bookCover} />
        <View style={BookStyles.textContainer}>
          <Text style={generalStyles.header1}>
            {title}
          </Text>
          <Text style={[generalStyles.header2, { marginTop: 4 }]}>
            {author.join(', ')}
          </Text>
          <Text style={[generalStyles.subheader2, { marginBottom: 4 }]}>
            {release}
          </Text>
          <Text style={[generalStyles.subheader3, { marginBottom: 4 }]}>
            {`${numPages} pages`}
          </Text>
          <Text style={[generalStyles.header3, { bottom: 0, right: 14, position: 'absolute'}]}>
            {`$${price}`}
          </Text>
        </View>
      </TouchableOpacity>
      {type !== 'order' && (
        <TouchableOpacity style={BookStyles.bookmarkButton} onPress={() => setSelection(!bookSelected)}>
          <Image style={BookStyles.bookmarkImage} source={bookSelected ? selected : unselected} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default BookCard;