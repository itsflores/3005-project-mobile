import {
  StyleSheet,
  StatusBar
} from 'react-native';

export default StyleSheet.create({
  storeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: StatusBar.currentHeight,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    // borderColor: 'yellow',
    // borderWidth: 3
  },
  headerContainer: {
    width: '100%',
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // borderColor: 'red',
    // borderWidth: 3
  },
  newBookButton: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    // borderColor: 'pink',
    // borderWidth: 3
  },
  newBookImage: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  },
  bookListConainer: {
    width: '100%',
    marginTop: 20,
    // borderColor: 'green',
    // borderWidth: 3
  },
  searchBox: {
    marginTop: 20,
    width: '85%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    // borderColor: 'green',
    // borderWidth: 3,
  }
})