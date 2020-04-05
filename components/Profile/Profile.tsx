import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import ProfileStyles from './Profile.styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logIn, logOut, newUser } from '../../util/actions';
import { generalStyles, colors } from '../../App.styles';
import { Header } from '../Shared/SharedComponents';

interface OrderProps {
  bookAppStore: any,
	logIn: Function,
	logOut: Function,
	newUser: Function,
}

interface OrderState {
  showOrders: boolean,
  showBilling: boolean,
  inputUsername: null | string,
  inputPassword: null | string,
}

const sampleUser = {
  id: 'usr-01',
  name: 'john',
  username: 'johnny',
  password: 'luvbooks',
  billingInfo: {
    cardNumber: 123456789,
    expiryDate: new Date(),
    address: '246 Maple Street, Ottawa, ON',
    phoneNumber: '613 XXX XXXX'
  }
}

const sampleOrders = [
  {
    id: 'A23B35S',
    price: 24,
    date: new Date(),
    tracking: 123456
  },
  {
    id: 'A23B45S',
    price: 22,
    date: new Date(),
    tracking: 123457
  },
  {
    id: 'A33B45S',
    price: 21,
    date: new Date(),
    tracking: 123357
  },
  {
    id: 'A23B45S',
    price: 27,
    date: new Date(),
    tracking: 173457
  },
  {
    id: 'A23B47S',
    price: 32,
    date: new Date(),
    tracking: 273457
  },
  {
    id: 'A23B45S',
    price: 25,
    date: new Date(),
    tracking: 173487
  }
]

class Profile extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      showOrders: false,
      showBilling: false,
      inputUsername: null,
      inputPassword: null,
    }
  }

  render() {
    const { currUser } = this.props.bookAppStore;
    const { showOrders, showBilling, inputPassword, inputUsername } = this.state;

    return (
      <View style={ProfileStyles.profileContainer}>
        <Modal 
          animationType='fade'
          transparent={true}
          visible={showOrders}
        >
          <View style={generalStyles.overlayContainer}>
            <View style={generalStyles.contentOverlayContainer}>
              <Text style={[generalStyles.cardHeader]}>
                Your order history
              </Text>
              <ScrollView style={ProfileStyles.orderHistoryContainer}>
                {sampleOrders.map((order, index) => (
                  <View style={ProfileStyles.orderContainer} key={index}>
                    <View style={ProfileStyles.orderDescriptionContainer}>
                      <Text style={[generalStyles.header1, { textAlign: 'left' }]}>
                        {`#${order.id}`}
                      </Text>
                      <Text style={[generalStyles.header1Bold, { textAlign: 'right' }]}>
                        {`$${order.price.toFixed(2)}`}
                      </Text>
                    </View>
                    <View style={ProfileStyles.orderDescriptionContainer}>
                      <Text style={[generalStyles.header2]}>
                        {`${order.date.getDate()}/${order.date.getMonth()}/${order.date.getFullYear()}`}
                      </Text>
                      <Text style={[generalStyles.header2]}>
                        {`tracking #${order.tracking}`}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity 
                style={generalStyles.closeOverlayButton} 
                onPress={() => this.setState({ showOrders: false })}
              >
                <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
                  done 
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal 
          animationType='fade'
          transparent={true}
          visible={showBilling}
        >
          <View style={generalStyles.overlayContainer}>
            <View style={generalStyles.contentOverlayContainer}>
              <Text style={[generalStyles.cardHeader]}>
                Your billing information
              </Text>
              <View style={ProfileStyles.billingInfoContainer}>
                <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                  Card number
                </Text>
                <TextInput style={[generalStyles.header1, ProfileStyles.billingInfoInputBox]} placeholder={sampleUser.billingInfo.cardNumber.toString()} />

                <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                  Expiry date
                </Text>
                <TextInput style={[generalStyles.header1, ProfileStyles.billingInfoInputBox]} placeholder={`${sampleUser.billingInfo.expiryDate.getDate()}/${sampleUser.billingInfo.expiryDate.getMonth()}/${sampleUser.billingInfo.expiryDate.getFullYear()}`} />

                <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                  Address
                </Text>
                <TextInput style={[generalStyles.header1, ProfileStyles.billingInfoInputBox]} placeholder={sampleUser.billingInfo.address} />

                <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                  Phone number
                </Text>
                <TextInput style={[generalStyles.header1, ProfileStyles.billingInfoInputBox]} placeholder={sampleUser.billingInfo.phoneNumber} />
              </View>
              <TouchableOpacity
                style={generalStyles.closeOverlayButton} 
                onPress={() => this.setState({ showBilling: false })}
              >
                <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
                  close & save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={generalStyles.exitOverlayButton} 
                onPress={() => this.setState({ showBilling: false })}
              >
                <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
                  close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={ProfileStyles.headerContainer}>
          <Header title="Profile" />
        </View>
        {currUser === null ? (
          <View style={[ProfileStyles.loginContainer]}>
            <TextInput 
              style={[generalStyles.header1, ProfileStyles.loginInputBox]} 
              placeholder="username"
              value={inputUsername}
              onChangeText={(input) => this.setState({ inputUsername: input })}
              autoCapitalize="none"
            />
            <TextInput 
              secureTextEntry={true} 
              style={[generalStyles.header1, ProfileStyles.loginInputBox]} 
              placeholder="password"
              value={inputPassword}
              onChangeText={(input) => this.setState({ inputPassword: input })}
            />
            <TouchableOpacity onPress={() => this.props.logIn({ inputUsername, inputPassword })} style={ProfileStyles.loginButton}>
              <Text style={[generalStyles.actionButton]}>
                log in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={ProfileStyles.loginButton}>
              <Text style={[generalStyles.actionButton]}>
                register
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[ProfileStyles.loginContainer]}>
            <Text style={[generalStyles.header2, { fontSize: 40, textAlign: 'center' }]}>
              {`Hello, ${currUser.username}\n`}
              <Text style={[generalStyles.subheader1]}>
                good to see you again
              </Text>
            </Text>
            <TouchableOpacity onPress={() => this.setState({ showOrders: true })} style={{ marginTop: 60 }}>
              <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                orders 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showBilling: true })} style={{ marginTop: 20 }}>
              <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                billing information 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.logOut()} style={ProfileStyles.loginButton}>
              <Text style={[generalStyles.actionButton]}>
                log out 
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logIn,
    logOut,
    newUser
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { bookAppStore } = state
  return { bookAppStore }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);