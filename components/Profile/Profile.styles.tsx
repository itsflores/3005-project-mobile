import {
  StyleSheet,
  StatusBar
} from 'react-native';
import { colors } from '../../App.styles';

export default StyleSheet.create({
  profileContainer: {
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
  loginButton: { 
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.blue,
    marginTop: 30,
    width: '75%'
    // marginLeft: 40,
    // marginRight: 40,
    // marginBottom: 40,
  },
  loginBox: {
    marginTop: 20,
    width: '75%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    // borderColor: 'green',
    // borderWidth: 3,
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
    padding: 20,
    alignContent: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  closeOverlayButton: { 
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
})