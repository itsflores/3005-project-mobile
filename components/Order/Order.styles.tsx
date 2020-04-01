import {
  StyleSheet,
  StatusBar
} from 'react-native';

export default StyleSheet.create({
  orderContainer: {
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
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 3
  },
  newBookButton: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
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
    marginBottom: 20,
    // borderColor: 'green',
    // borderWidth: 3
  },
})