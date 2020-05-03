import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import AccountStyles from '../Account/Account.styles';

export const OrderHistoryModal = ({
  isVisible,
  getOrders,
  orders,
  updateState
}) => (
  <Modal
    onShow={() => getOrders()}
    animationType='fade'
    transparent={true}
    visible={isVisible}
  >
    <View style={generalStyles.overlayContainer}>
      <View style={generalStyles.contentOverlayContainer}>
        <Text style={[generalStyles.cardHeader]}>
          Your order history
        </Text>
        <ScrollView style={AccountStyles.orderHistoryContainer}>
          {(orders.length > 0) ? (
            orders.map((order, index) => (
              <View style={AccountStyles.orderContainer} key={index}>
                <View style={AccountStyles.orderDescriptionContainer}>
                  <Text style={[generalStyles.header1Bold]}>
                    {`tracking #${order.tracking_num}`}
                  </Text>
                  <Text style={[generalStyles.header1Bold, { textAlign: 'right' }]}>
                    {`$${order.price}`}
                  </Text>
                </View>
                <View style={AccountStyles.orderDescriptionContainer}>
                  <Text style={[generalStyles.header2]}>
                    {`${order.day}/${order.month}/${order.year}`}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={generalStyles.header2}>
              You haven't placed any orders yet!
            </Text>
          )}
        </ScrollView>
        <TouchableOpacity 
          style={generalStyles.closeOverlayButton} 
          onPress={() => updateState({ showOrderHistory: false })}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            done 
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);