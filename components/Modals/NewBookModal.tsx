import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import StoreStyles from '../Store/Store.styles';
import BookStyles from '../BookCard/BookCard.styles';
import emptyCover from '../../assets/img/emptyCover.png';

export const NewBookModal = ({
  isVisible,
  updateState,
  newBook,
  newBookInit,
  bookInputInfo,
  uploadImage,
  updateBook,
  saveBook
}) => (
  <Modal 
    animationType='fade'
    transparent={true}
    visible={isVisible}
  >
    <View style={generalStyles.overlayContainer}>
      <View style={generalStyles.contentOverlayContainer}>
        <ScrollView style={{ width: '100%', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => uploadImage()} style={{ alignSelf: 'center' }}>
            <Image source={newBook.thumbnail_url ? {uri: newBook.thumbnail_url} : emptyCover} style={BookStyles.bookOverlayImage}/>
          </TouchableOpacity>
          <View>
            {Object.keys(bookInputInfo).map((key, index) => (
              <TextInput 
                key={index}
                value={newBook[key]}
                onChangeText={(input) => updateBook(input, key)}
                style={[generalStyles.header1, StoreStyles.bookInfoInputBox]} 
                placeholder={bookInputInfo[key]}
                keyboardType={['price', 'stock', 'publisher_fee', 'published_year', 'page_count'].includes(key)  ? 'number-pad' : 'default'}
              />
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity 
          style={generalStyles.closeOverlayButton} 
          onPress={() => saveBook()}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            add book 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={generalStyles.exitOverlayButton} 
          onPress={() => updateState({ showNewBook: false, newBook: newBookInit })}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)