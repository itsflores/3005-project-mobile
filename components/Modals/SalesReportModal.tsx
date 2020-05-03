import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import AccountStyles from '../Account/Account.styles';

export const SalesReportModal = ({
  isVisible, 
  totalSales, 
  totalEarnings, 
  totalPublisherFees,
  totalRevenue,
  publisherSales,
  authorSales,
  categorySales,
  getSales,
  updateState
}) => (
  <Modal
    onShow={() => getSales()}
    animationType='fade'
    transparent={true}
    visible={isVisible}
  >
    {totalSales !== null && (
      <View style={generalStyles.overlayContainer}>
        <View style={generalStyles.contentOverlayContainer}>
          <Text style={[generalStyles.cardHeader]}>
            Sales report
          </Text>
          <ScrollView style={AccountStyles.orderHistoryContainer}>
            <View>
              <Text style={generalStyles.header1Bold}>
                General
              </Text>
              <Text style={[generalStyles.subheader1, { marginTop: 6 }]}>
                Books Sold
              </Text>
              <Text style={generalStyles.subheader3}>
                {totalSales}
              </Text>
              <Text style={[generalStyles.subheader1, { marginTop: 6 }]}>
                Total Earnings
              </Text>
              <Text style={generalStyles.subheader3}>
                {`$${totalEarnings}`}
              </Text>
              <Text style={[generalStyles.subheader1, { marginTop: 6 }]}>
                Total Publisher Fees Paid
              </Text>
              <Text style={generalStyles.subheader3}>
                {`$${totalPublisherFees}`}
              </Text>
              <Text style={[generalStyles.subheader1, { marginTop: 6 }]}>
                Total Revenue
              </Text>
              <Text style={generalStyles.subheader3}>
                {`$${totalRevenue}`}
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={generalStyles.header1Bold}>
                Summary
              </Text>
              <Text style={[generalStyles.header1, { marginTop: 10 }]}>
                Per Publisher
              </Text>
              {Object.keys(publisherSales).map((publisher, index) => (
                <View key={index}>
                  <Text style={[generalStyles.subheader1, { marginTop: 6 }]}>
                    {publisher}
                  </Text>
                  <Text style={generalStyles.subheader3}>
                    {publisherSales[publisher].toFixed(2)}
                  </Text>
                </View>
              ))}
              <Text style={[generalStyles.header1, { marginTop: 10 }]}>
                Per Author
              </Text>
              {Object.keys(authorSales).map((author, index) => (
                <View key={index}>
                  <Text style={[generalStyles.subheader1, { marginTop: 6 }]}>
                    {author}
                  </Text>
                  <Text style={generalStyles.subheader3}>
                    {authorSales[author]}
                  </Text>
                </View>
              ))}
              <Text style={[generalStyles.header1, { marginTop: 10 }]}>
                Per Category
              </Text>
              {Object.keys(categorySales).map((category, index) => (
                <View key={index}>
                  <Text style={[generalStyles.subheader1, { marginTop: 6 }]}>
                    {category}
                  </Text>
                  <Text style={generalStyles.subheader3}>
                    {categorySales[category]}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <TouchableOpacity 
            style={generalStyles.closeOverlayButton} 
            onPress={() => updateState({ showSales: false })}
          >
            <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
              done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </Modal>
)
