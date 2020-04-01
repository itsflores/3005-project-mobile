import React from 'react';
import { View, Text, Image } from 'react-native';
import { generalStyles } from '../../App.styles';
import logo from '../../assets/img/main-logo.png';

export const Header = ({title} ) => (
  <View style={{ flexDirection: 'row', height: 60, alignContent: 'center', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Image source={logo} style={{ height: '100%', width: '20%', resizeMode: 'contain' }} />
    <Text style={[generalStyles.appHeader, { marginLeft: 20 }]}>
      {title}
    </Text>
  </View>
);
