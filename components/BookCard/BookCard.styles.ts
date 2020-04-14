import {
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    // borderColor: 'orange',
    // borderWidth: 3
  },
  descriptionContainer: {
    flexDirection: 'row',
    width: '88%',
    alignContent: 'center',
    // borderColor: 'brown',
    // borderWidth: 3
  },
  bookCover: {
    width: '25%',
    resizeMode: 'contain'
  },
  textContainer: {
    width: '75%',
    padding: 14,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // borderColor: 'green',
    // borderWidth: 3
  },
  bookmarkButton: {
    width: '12%',
    flexDirection: 'column',
    justifyContent: 'center',
    // borderColor: 'pink',
    // borderWidth: 3
  },
  bookmarkImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain'
  },
  bookOverlayImage: {
    height: 120,
    width: 140,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  bookOverlayLabel: {
    marginTop: 4,
    textAlign: 'left',
  },
  bookOverlayText: {
    textAlign: 'left'
  },
})