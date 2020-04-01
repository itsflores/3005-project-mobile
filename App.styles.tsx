import {
  StyleSheet,
} from 'react-native';

export const colors = {
  blue: '#1A91FF'
}

export const generalStyles = StyleSheet.create({
  appHeader: {
    fontFamily: 'cabin',
    fontSize: 40,
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
    fontSize: 16
  },
  subheader2: {
    fontFamily: 'worksans-light',
    fontSize: 14
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
  }
})