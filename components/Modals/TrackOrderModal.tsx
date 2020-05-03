import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import AccountStyles from '../Account/Account.styles';

export const TrackOrderModal = ({
  isVisible,
  updateState,
  inputTrackOrder,
  orderStatus,
  trackOrder
}) => (
  <Modal 
    animationType='fade'
    transparent={true}
    visible={isVisible}
  >
    <View style={generalStyles.overlayContainer}>
      <View style={generalStyles.contentOverlayContainer}>
        <Text style={[generalStyles.cardHeader]}>
          Track an order
        </Text>
        <View style={AccountStyles.billingInfoContainer}>
          <Text style={[generalStyles.subheader1, { marginTop: 10, marginBottom: 4 }]}>
            Enter your tracking number here
          </Text>
          <TextInput
            style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
            onChangeText={(input) => updateState({ inputTrackOrder: input })}
            placeholder="i.e. o-12345"
            value={inputTrackOrder}
          />
        <Text style={[generalStyles.header1Bold, { marginTop: 20 }]}>
          {orderStatus}
        </Text>
        </View>
        <TouchableOpacity
          style={generalStyles.closeOverlayButton} 
          onPress={() => trackOrder()}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            track order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={generalStyles.exitOverlayButton} 
          onPress={() => updateState({ showTracking: false })}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);