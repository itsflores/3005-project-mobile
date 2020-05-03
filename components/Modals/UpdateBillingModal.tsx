import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput, Picker } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import AccountStyles from '../Account/Account.styles';

export const UpdateBillingModal = ({
  isVisible,
  updateState,
  currUser,
  updateExpiryMonth,
  updateExpiryYear,
  updateCardNumber,
  updateAddress,
  updatePhoneNumber,
  updateBilling
}) => (
  <Modal
    animationType='fade'
    transparent={true}
    visible={isVisible}
    onShow={() => updateState({ 
      updateExpiryYear: currUser.expiryYear, 
      updateExpiryMonth: currUser.expiryMonth,
      updatePhoneNumber: currUser.phoneNumber,
      updateAddress: currUser.address,
      updateCardNumber: (currUser.cardNumber ? currUser.cardNumber.toString() : '')
    })}
  >
    <View style={generalStyles.overlayContainer}>
      <View style={generalStyles.contentOverlayContainer}>
        <ScrollView style={AccountStyles.orderHistoryContainer}>
          <Text style={[generalStyles.cardHeader]}>
            Your billing information
          </Text>
          <View style={AccountStyles.billingInfoContainer}>
            <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
              Card number
            </Text>
            <TextInput 
              style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
              placeholder={(currUser.cardNumber) ? currUser.cardNumber.toString() : ''}
              onChangeText={(input) => updateState({ updateCardNumber: input })}
              value={updateCardNumber}
            />

            <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
              Expiry date
            </Text>
            <Text style={[generalStyles.subheader1, { marginTop: 4 }]}>
              Year
            </Text>
            <Picker
              onValueChange={(value) => updateState({ updateExpiryYear: value })}
              selectedValue={updateExpiryYear}
              style={{ width: '100%', alignItems: 'center' }}>
              {['2020', '2021', '2022', '2023', '2024'].map((year, index) => (
                <Picker.Item key={index} label={year} value={year} />
              ))}
            </Picker>
            <Text style={[generalStyles.subheader1]}>
              Month
            </Text>
            <Picker
              onValueChange={(value) => updateState({ updateExpiryMonth: value })}
              selectedValue={updateExpiryMonth}
              style={{ width: '100%', alignItems: 'center' }}>
              {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((year, index) => (
                <Picker.Item key={index}label={year} value={year} />
              ))}
            </Picker>

            <Text style={[generalStyles.subheader1, { marginTop: 0 }]}>
              Address
            </Text>
            <TextInput 
              style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
              placeholder={(currUser.address ? currUser.address : '')} 
              onChangeText={(input) => updateState({ updateAddress: input })}
              value={updateAddress}
            />

            <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
              Phone number
            </Text>
            <TextInput 
              style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
              placeholder={(currUser.phoneNumber ? currUser.phoneNumber : '')} 
              onChangeText={(input) => updateState({ updatePhoneNumber: input })}
              value={updatePhoneNumber}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={generalStyles.closeOverlayButton} 
          onPress={() => updateBilling()}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            close & save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={generalStyles.exitOverlayButton} 
          onPress={() => updateState({ showBilling: false })}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);