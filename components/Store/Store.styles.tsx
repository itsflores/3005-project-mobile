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
    // borderColor: 'yellow',
    // borderWidth: 
  },
  headerContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 4
  }
})