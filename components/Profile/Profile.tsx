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

const sampleUser = {
  id: 'usr-01',
  name: 'john',
  userame: 'johnny',
  password: 'luvbooks'
}

export default class Order extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }

  render() {
    const { currentUser } = this.state;

    return (
      <View style={ProfileStyles.profileContainer}>
        <View style={ProfileStyles.headerContainer}>
          <Header title="Profile" />
        </View>
        {currentUser === null ? (
          <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
            
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
            
          </View>
        )}
      </View>
    );
  }
}