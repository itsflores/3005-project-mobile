import {
  StyleSheet,
  StatusBar
} from 'react-native';
import {
  colors
} from '../../App.styles';

export default StyleSheet.create({
  accountContainer: {
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
    width: '100%'
    // marginLeft: 40,
    // marginRight: 40,
    // marginBottom: 40,
  },
  loginContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60
  },
  loginInputBox: {
    marginTop: 20,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    // borderColor: 'green',
    // borderWidth: 3,
  },
  orderHistoryContainer: {
    marginTop: 10,
    marginBottom: 30,
    // height: 300,
    width: '100%',
  },
  orderContainer: {
    marginTop: 10,
    flexDirection: 'column'
  },
  orderDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'red', 
    // borderWidth: 3 
  },
  billingInfoContainer: {
    marginBottom: 30,
    width: '100%',
  },
  billingInfoInputBox: {
    width: '100%',
    textAlign: 'left',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  }
})