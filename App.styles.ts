import {
  StyleSheet,
} from 'react-native';

export const colors = {
  blue: '#1A91FF',
  red: '#FF2E00'
}

export const generalStyles = StyleSheet.create({
  appHeader: {
    fontFamily: 'cabin',
    fontSize: 40,
  },
  cardHeader: {
    fontFamily: 'worksans-regular',
    fontSize: 20
  },
  header1: {
    fontFamily: 'worksans-regular',
    fontSize: 18
  },
  header1Bold: {
    fontFamily: 'worksans-medium',
    fontSize: 18,
  },
  header2: {
    fontFamily: 'worksans-light',
    fontSize: 16
  },
  header3: {
    fontFamily: 'worksans-medium',
    fontSize: 18,
  },
  subheader1: {
    fontFamily: 'worksans-regular',
    fontSize: 15
  },
  subheader2: {
    fontFamily: 'worksans-light',
    fontSize: 14
  },
  subheader3: {
    fontFamily: 'worksans-medium',
    fontSize: 12
  },
  actionButton: {
    fontFamily: 'worksans-medium',
    fontSize: 20,
    color: 'white'
  },
  actionExit: {
    fontFamily: 'worksans-medium',
    fontSize: 20,
    color: colors.blue
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
  contentOverlayContainer: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 30,
    alignContent: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // position: 'absolute'
  },
  closeOverlayButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  exitOverlayButton: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  }
})