import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import ProfileStyles from './Profile.styles';
import { generalStyles } from '../../App.styles';
import { Header } from '../Shared/SharedComponents';

interface OrderProps {

}

interface OrderState {
  currentUser: any | null,
}

export default class Order extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }

  render() {
    return (
      <View style={ProfileStyles.profileContainer}>
        <View style={ProfileStyles.headerContainer}>
          <Header title="Profile" />
        </View>
        <View>

        </View>
      </View>
    );
  }
}