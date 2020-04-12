import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from 'react-native';
import AccountStyles from './Account.styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { runQuery } from '../../database';
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

class Account extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      showOrders: false,
      showBilling: false,
      inputUsername: null,
      inputPassword: null,
    }
  }

  registerUser = () => {
    const { inputUsername, inputPassword } = this.state;

    if (inputUsername && inputPassword) {
      this.props.newUser({ inputUsername, inputPassword })
    } else {
      Alert.alert(
        'LookinnaBook',
        `Please enter a valid username and password`,
        [{
          text: 'Done',
          style: 'default'
        }], {
          cancelable: true
        }
      );
    }
  }

  deleteAccount = () => {
    
  }

  userLogin = () => {
    const { inputPassword, inputUsername } = this.state;

    if (inputPassword && inputUsername) {
      runQuery('select * from users')
      // console.log(runQuery('select * from users'));
    }
  }

  render() {
    const { currUser } = this.props.bookAppStore;
    const { showOrders, showBilling, inputPassword, inputUsername } = this.state;

    return (
      <View style={AccountStyles.accountContainer}>
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
              <ScrollView style={AccountStyles.orderHistoryContainer}>
                {sampleOrders.map((order, index) => (
                  <View style={AccountStyles.orderContainer} key={index}>
                    <View style={AccountStyles.orderDescriptionContainer}>
                      <Text style={[generalStyles.header1, { textAlign: 'left' }]}>
                        {`#${order.id}`}
                      </Text>
                      <Text style={[generalStyles.header1Bold, { textAlign: 'right' }]}>
                        {`$${order.price.toFixed(2)}`}
                      </Text>
                    </View>
                    <View style={AccountStyles.orderDescriptionContainer}>
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
              <View style={AccountStyles.billingInfoContainer}>
                <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                  Card number
                </Text>
                <TextInput style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} placeholder={sampleUser.billingInfo.cardNumber.toString()} />

                <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                  Expiry date
                </Text>
                <TextInput style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} placeholder={`${sampleUser.billingInfo.expiryDate.getDate()}/${sampleUser.billingInfo.expiryDate.getMonth()}/${sampleUser.billingInfo.expiryDate.getFullYear()}`} />

                <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                  Address
                </Text>
                <TextInput style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} placeholder={sampleUser.billingInfo.address} />

                <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                  Phone number
                </Text>
                <TextInput style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} placeholder={sampleUser.billingInfo.phoneNumber} />
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

        <View style={AccountStyles.headerContainer}>
          <Header title="Account" />
        </View>
        {currUser === null ? (
          <View style={[AccountStyles.loginContainer]}>
            <TextInput 
              style={[generalStyles.header1, AccountStyles.loginInputBox]} 
              placeholder="username"
              value={inputUsername}
              onChangeText={(input) => this.setState({ inputUsername: input })}
              autoCapitalize="none"
            />
            <TextInput 
              secureTextEntry={true} 
              style={[generalStyles.header1, AccountStyles.loginInputBox]} 
              placeholder="password"
              value={inputPassword}
              onChangeText={(input) => this.setState({ inputPassword: input })}
            />
            <TouchableOpacity onPress={() => this.userLogin()} style={AccountStyles.loginButton}>
              <Text style={[generalStyles.actionButton]}>
                log in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.registerUser()} style={AccountStyles.loginButton}>
              <Text style={[generalStyles.actionButton]}>
                register
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[AccountStyles.loginContainer]}>
            {/* <ScrollView style={{ flex: 1 }}> */}
              <Text style={[generalStyles.header2, { fontSize: 36, textAlign: 'center' }]}>
                {`Hello, ${currUser.username}\n`}
                <Text style={[generalStyles.subheader1]}>
                  good to see you again
                </Text>
              </Text>
              <TouchableOpacity onPress={() => this.setState({ showOrders: true })} style={{ marginTop: 30 }}>
                <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                  order history
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ showBilling: true })} style={{ marginTop: 10 }}>
                <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                  billing information 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ showBilling: true })} style={{ marginTop: 10 }}>
                <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                  new author
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ showBilling: true })} style={{ marginTop: 10 }}>
                <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                  new admin 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ showBilling: true })} style={{ marginTop: 10 }}>
                <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                  sales reports 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.logOut()} style={AccountStyles.loginButton}>
                <Text style={[generalStyles.actionButton]}>
                  log out 
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.deleteAccount()} style={{ marginTop: 10 }}>
                <Text style={[generalStyles.subheader1, { color: colors.red }]}>
                  delete account 
                </Text>
              </TouchableOpacity>
            {/* </ScrollView> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);