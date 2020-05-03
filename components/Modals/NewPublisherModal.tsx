import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import AccountStyles from '../Account/Account.styles';

export const NewPublisherModal = ({
  isVisible,
  updateState,
  addPublisher,
  inputPublisherName,
  inputPublisherAddress,
  inputPublisherPhone,
  inputPublisherBankNumber,
  inputPublisherId
}) => (
  <Modal
    animationType='fade'
    transparent={true}
    visible={isVisible}
  >
    <View style={generalStyles.overlayContainer}>
      <View style={generalStyles.contentOverlayContainer}>
        <ScrollView style={AccountStyles.orderHistoryContainer}>
          <Text style={[generalStyles.cardHeader]}>
            Add a new publisher
          </Text>
          <View style={AccountStyles.billingInfoContainer}>
            <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
              Name
            </Text>
            <TextInput
              style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
              onChangeText={(input) => updateState({ inputPublisherName: input })}
              value={inputPublisherName}
            />

            <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
              id
            </Text>
            <TextInput 
              style={[generalStyles.header1, AccountStyles.billingInfoInputBox]}
              onChangeText={(input) => updateState({ inputPublisherId: input })}
              value={inputPublisherId}
            />

            <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
              Bank account
            </Text>
            <TextInput 
              style={[generalStyles.header1, AccountStyles.billingInfoInputBox]}
              onChangeText={(input) => updateState({ inputPublisherBankNumber: input })}
              value={inputPublisherBankNumber}
              keyboardType='number-pad'
            />

            <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
              Address
            </Text>
            <TextInput 
              style={[generalStyles.header1, AccountStyles.billingInfoInputBox]}
              onChangeText={(input) => updateState({ inputPublisherAddress: input })}
              value={inputPublisherAddress}
            />

            <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
              Phone number
            </Text>
            <TextInput 
              style={[generalStyles.header1, AccountStyles.billingInfoInputBox]}
              onChangeText={(input) => updateState({ inputPublisherPhone: input })}
              value={inputPublisherPhone}
              keyboardType='phone-pad'
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={generalStyles.closeOverlayButton} 
          onPress={() => addPublisher()}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={generalStyles.exitOverlayButton} 
          onPress={() => updateState({ showNewPublisher: false })}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);