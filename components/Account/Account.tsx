import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from 'react-native';
import AccountStyles from './Account.styles';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
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
  orders: any [],
  inputUsername: null | string,
  inputPassword: null | string,
}

class Account extends React.Component <OrderProps, OrderState> {
  constructor(props) {
    super(props);
    this.state = {
      showOrders: false,
      showBilling: false,
      inputUsername: null,
      inputPassword: null,
      orders: [],
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
      runQuery(`
        select *
        from users
        where password = '${inputPassword}' 
        and username = '${inputUsername}';
      `).then((result: any) => {
        const results = result._array;

        if (result.length > 0) {
          const user = results[0];
          this.props.logIn(user);
        } else {
          Alert.alert(
            'LookinnaBook',
            `Those credentials didn't seem to work, please verify your username and password`,
            [{
              text: 'Done',
              style: 'default'
            }], {
              cancelable: true
            }
          );
        }
      })
    } else {
      Alert.alert(
        'LookinnaBook',
        `Please enter valid credentials!`,
        [{
          text: 'Done',
          style: 'default',
        }], {
          cancelable: true,
        }
      );
    }
  }

  updateOrders = () => {
    const { currUser } = this.props.bookAppStore;
    
    runQuery(`
      select * 
      from orders 
      where user_ID = '${currUser.userId}'
    `).then((result: any) => {
      const results = result._array;

      this.setState({ orders: results });
    })
  }

  render() {
    const { currUser } = this.props.bookAppStore;
    const { showOrders, showBilling, inputPassword, inputUsername, orders } = this.state;

    return (
      <View style={AccountStyles.accountContainer}>
        {currUser !== null && (
          <View>
            <Modal
              onShow={() => this.updateOrders()}
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
                    {orders.map((order, index) => (
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
                    <TextInput 
                      style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
                      placeholder={currUser.cardNumber.toString()} 
                    />

                    <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                      Expiry date
                    </Text>
                    <TextInput 
                      style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
                      placeholder={`${currUser.expiryMonth.toString()}/${currUser.expiryYear.toString()}`} 
                    />

                    <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                      Address
                    </Text>
                    <TextInput 
                      style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
                      placeholder={currUser.address} 
                    />

                    <Text style={[generalStyles.subheader1, { marginTop: 10 }]}>
                      Phone number
                    </Text>
                    <TextInput 
                      style={[generalStyles.header1, AccountStyles.billingInfoInputBox]} 
                      placeholder={currUser.phoneNumber} 
                    />
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
          </View>
        )}

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
            <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.registerUser()} style={[AccountStyles.loginButton, { width: '47%' }]}>
                <Text style={[generalStyles.actionButton]}>
                  register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.userLogin()} style={[AccountStyles.loginButton, { width: '47%' }]}>
                <Text style={[generalStyles.actionButton]}>
                  log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[AccountStyles.loginContainer]}>
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