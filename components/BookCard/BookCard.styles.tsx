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
  overlayContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    position: 'absolute',
    padding: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookOverlayContainer: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookOverlayImage: {
    height: 120,
    width: 140, 
    resizeMode: 'contain'
  },
  bookOverlayLabel: { marginTop: 6, marginBottom: -6, textAlign: 'center' },
  bookOverlayText: { textAlign: 'center' },
  closeOverlayButton: { 
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
})