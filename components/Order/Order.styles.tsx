import {
  StyleSheet,
  StatusBar
} from 'react-native';

import { colors } from '../../App.styles';

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
  bookListConainer: {
    width: '100%',
    marginTop: 20,
    // borderColor: 'green',
    // borderWidth: 3
  },
  emptyOrderBanner: { 
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'blue',
    // borderWidth: 3
  },
  checkoutContainer: { 
    width: '100%', 
    flexDirection: 'row', 
    alignContent: 'center', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 20,
  },
  checkoutPriceContainer: { marginLeft: 4, flexDirection: 'column', alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end' },
  checkoutButton: { 
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.blue,
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 40,
   }
})