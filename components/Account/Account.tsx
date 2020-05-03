import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView, Alert, Picker } from 'react-native';
import AccountStyles from './Account.styles';
import { AccountState, AccountProps } from './Account.interfaces';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { runQuery } from '../../database';
import { logIn, logOut, updateUser } from '../../util/actions';
import { generalStyles, colors } from '../../App.styles';
import { Header } from '../Shared/SharedComponents';
import { salesPerGenre, salesPerAuthor, salesPerPublisher } from '../../SQL/queries.sql';
import { SalesReportModal } from '../Modals/SalesReportModal';
import { OrderHistoryModal } from '../Modals/OrderHistoryModal';
import { NewPublisherModal } from '../Modals/NewPublisherModal';
import { TrackOrderModal } from '../Modals/TrackOrderModal';
import { NewAdminModal } from '../Modals/NewAdminModal';
import { DeleteUserModal } from '../Modals/DeleteUserModal';
import { UpdateBillingModal } from '../Modals/UpdateBillingModal';

class Account extends React.Component <AccountProps, AccountState> {
  constructor(props) {
    super(props);
    this.state = {
      showOrderHistory: false,
      showBilling: false,
      showNewAdmin: false,
      showNewPublisher: false,
      showDeleteUser: false,
      showTracking: false,
      showSales: false,
      inputPassword: null,
      inputUsername: null,
      inputPublisherId: null,
      inputPublisherName: null,
      inputPublisherAddress: null,
      inputPublisherBankNumber: null,
      inputPublisherPhone: null,
      inputTrackOrder: null,
      updateExpiryMonth: null,
      updateExpiryYear: null,
      updateCardNumber: null,
      updateAddress: null,
      updatePhoneNumber: null,
      newAdminSelection: null,
      deleteUserSelection: null,
      orderStatus: null,
      totalSales: null,
      categorySales: null,
      authorSales: null,
      publisherSales: null,
      totalPublisherFees: null,
      totalEarnings: null,
      totalRevenue: null,
      orders: [],
      availableUsers: []
    }
  }

  registerUser = async () => {
    const { inputUsername, inputPassword } = this.state;

    const currUsersAmount = 1 + await runQuery(
      `select * from users;`
    ).then((result: any) => {
      return Promise.resolve(result._array.length);
    });

    const usernameValid = await runQuery(`
      select username 
      from users
      where username = '${inputUsername}';
    `).then((result: any) => {
      if (result._array.length === 0) {
        return Promise.resolve(true);
      } else if (result._array.length === 1) {
        return Promise.resolve(false);
      }
    })

    if (inputUsername && inputPassword) {
      if (usernameValid) {
        runQuery(`
          insert into users (
            user_ID, role_ID, username, password
          )
          values (
            'u-${(currUsersAmount > 10 ? currUsersAmount : ('0' + currUsersAmount))}', 'r-01', '${inputUsername}', '${inputPassword}'
          );
        `).then(() => {
          runQuery(`
            select * from users;
          `).then((result: any) => {
            // console.log('updated users:');
            // console.log(result._array);

            Alert.alert(
              'LookinnaBook',
              `New user has been created!`,
              [{
                text: 'Done',
                style: 'default'
              }], {
                cancelable: true
              }
            );
          })
        })
      } else {
        Alert.alert(
          'LookinnaBook',
          `That username is already taken!`,
          [{
            text: 'Done',
            style: 'default'
          }], {
            cancelable: true
          }
        );
      }
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

  deleteAccount = (target?: string) => {
    const { deleteUserSelection } = this.state;
    const targetUser = target || deleteUserSelection;

    runQuery(`
      delete from users
      where username = '${targetUser}'
    `).then((result: any) => {
      Alert.alert(
        'LookinnaBook',
        `The user ${targetUser} has been deleted!`,
        [{
          text: 'Done',
          style: 'default'
        }], {
          cancelable: true
        }
      );

      if (target) {
        this.props.logOut();
      }

      this.setState({ showDeleteUser: false })
    })
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

  verifyUniquePublisher = async (targetID) => {
    return await runQuery(`
      select publisher_ID from publisher where publisher_ID = '${targetID}'
    `).then((res: any) => {
      if (res._array.length === 0) {
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    })
  }

  createNewPublisher = async () => {
    const {
      inputPublisherId, 
      inputPublisherName,
      inputPublisherAddress,
      inputPublisherBankNumber,
      inputPublisherPhone 
    } = this.state;

    if (inputPublisherId &&
      inputPublisherName &&
      inputPublisherAddress &&
      inputPublisherBankNumber &&
      inputPublisherPhone && 
      inputPublisherPhone &&
      await this.verifyUniquePublisher(inputPublisherId)
    ) {
      runQuery(`
        insert into publisher (
          publisher_ID, name, bank_number, address, phone_num
        )
        values (
            '${inputPublisherId}', '${inputPublisherName}', ${inputPublisherBankNumber}, '${inputPublisherAddress}', '${inputPublisherPhone}'
        );
      `)
      this.setState({ showNewPublisher: false });
    } else {
      Alert.alert(
        'LookinnaBook',
        `Please verify your information and try again!`,
        [{
          text: 'Done',
          style: 'default',
        }], {
          cancelable: true,
        }
      );
    }
  }

  createNewAdmin = () => {
    const { newAdminSelection } = this.state;

    runQuery(`
      update users
      set role_ID = 'r-00'
      where username = '${newAdminSelection}';
    `).then((result: any) => {
      Alert.alert(
        'LookinnaBook',
        `${newAdminSelection} is now an admin!`,
        [{
          text: 'Done',
          style: 'default'
        }], {
          cancelable: true
        }
      );

      this.setState({ showNewAdmin: false, newAdminSelection: null });
    });
  }

  updateBillingInfo = () => {
    const { updateAddress, updateCardNumber, updateExpiryMonth, updateExpiryYear, updatePhoneNumber } = this.state;
    const { currUser } = this.props.bookAppStore;

    if (!(updateAddress && updateCardNumber && updateExpiryMonth && updateExpiryYear && updatePhoneNumber)) {
      Alert.alert(
        'LookinnaBook',
        `Please enter valid information!`,
        [{
          text: 'Done',
          style: 'default'
        }], {
          cancelable: true
        }
      );

      return; 
    }

    runQuery(`
      update users
      set address = '${updateAddress}', card_number = ${updateCardNumber}, phone_number = '${updatePhoneNumber}', month = ${updateExpiryMonth}, year = ${updateExpiryYear}
      where user_ID = '${currUser.userId}';
    `).then((result: any) => {
      this.props.updateUser({ updateAddress, updateCardNumber, updateExpiryMonth, updateExpiryYear, updatePhoneNumber })
    })
    this.setState({ showBilling: false })
  }

  trackOrder = () => {
    const { inputTrackOrder } = this.state;
  
    if (!inputTrackOrder) {
      Alert.alert(
        'LookinnaBook',
        `Please enter a valid tracking number!`,
        [{
          text: 'Done',
          style: 'default'
        }], {
          cancelable: true
        }
      );

      return;
    }

    runQuery(`
      select * 
      from orders
      where tracking_num = '${inputTrackOrder}';
    `).then((result: any) => {
      if (result._array.length > 0) {
        this.setState({ orderStatus: 'Your order will be delivered in 3 business days' })
      } else {
        Alert.alert(
          'LookinnaBook',
          `That order doesn't seem to exist!`,
          [{
            text: 'Done',
            style: 'default'
          }], {
            cancelable: true
          }
        );
      }
    })
  }

  getSales = async () => {
    const totalSales = await runQuery('select * from item')
      .then((result: any) => {
        const total = result._array.reduce((acc, item) => (acc += item.quantity), 0);
        return Promise.resolve(total);
      })

    const totalEarnings = await runQuery('select * from orders')
      .then((result: any) => {
        const total = result._array.reduce((acc, item) => (acc += parseFloat(item.price)), 0);
        return Promise.resolve(total);
      })

    const categorySales = await runQuery(salesPerGenre)
      .then((result: any) => {
        const sales = result._array.reduce((acc, item) => {

          if (acc[item.category_name]) {
            acc[item.category_name] += item.quantity;
          } else {
            acc[item.category_name] = item.quantity;
          }

          return acc;
        }, {});
        return Promise.resolve(sales);
      });

    const authorSales = await runQuery(salesPerAuthor)
      .then((result: any) => {
        const sales = result._array.reduce((acc, item) => {

          if (acc[item.author]) {
            acc[item.author] += item.quantity;
          } else {
            acc[item.author] = item.quantity;
          }

          return acc;
        }, {});
        return Promise.resolve(sales);
      });

    const publisherSales = await runQuery(salesPerPublisher)
      .then((result: any) => {
        const sales = result._array.reduce((acc, item) => {
          const amount = parseFloat((item.price * (item.publisher_fee / 100) * item.quantity).toFixed(2))

          if (acc[item.publisher]) {
            acc[item.publisher] += amount;
          } else {
            acc[item.publisher] = amount;
          }

          return acc;
        }, {});
        return Promise.resolve(sales);
      });
    
    const totalPublisherFees: any = Object.values(publisherSales).reduce((acc: any, curr: any) => acc += curr, 0);
    const totalRevenue = totalEarnings - totalPublisherFees;

    this.setState({
      totalSales, 
      categorySales,
      authorSales,
      publisherSales,
      totalPublisherFees: totalPublisherFees.toString(),
      totalEarnings: totalEarnings.toString(),
      totalRevenue: totalRevenue.toString()
    })
  }

  updateState = (update) => {
    this.setState(update);
  }

  render() {
    const { currUser } = this.props.bookAppStore;
    const { showOrderHistory, 
      showBilling, 
      inputPassword, 
      inputUsername, 
      orders, 
      showNewPublisher, 
      inputPublisherId, 
      inputPublisherName,
      inputPublisherAddress,
      inputPublisherBankNumber,
      inputPublisherPhone,
      inputTrackOrder,
      showNewAdmin,
      availableUsers,
      newAdminSelection,
      updateExpiryMonth,
      updateExpiryYear,
      updateCardNumber,
      updateAddress,
      updatePhoneNumber,
      showDeleteUser,
      showTracking,
      showSales,
      deleteUserSelection,
      orderStatus,
      totalSales,
      categorySales,
      authorSales,
      publisherSales,
      totalPublisherFees,
      totalEarnings,
      totalRevenue,
    } = this.state;

    return (
      <View style={AccountStyles.accountContainer}>
        {currUser !== null && (
          <View>
            <SalesReportModal 
              isVisible={showSales} 
              totalSales={totalSales} 
              totalEarnings={totalEarnings}
              totalPublisherFees={totalPublisherFees}
              totalRevenue={totalRevenue}
              publisherSales={publisherSales}
              authorSales={authorSales}
              categorySales={categorySales}
              getSales={this.getSales}
              updateState={this.updateState}
            />

            <OrderHistoryModal 
              isVisible={showOrderHistory}
              updateState={this.updateState}
              getOrders={this.updateOrders}
              orders={orders}
            />

            <NewPublisherModal 
              isVisible={showNewPublisher}
              updateState={this.updateState}
              addPublisher={this.createNewPublisher}
              inputPublisherAddress={inputPublisherAddress}
              inputPublisherBankNumber={inputPublisherBankNumber}
              inputPublisherId={inputPublisherId}
              inputPublisherName={inputPublisherName}
              inputPublisherPhone={inputPublisherPhone}
            />

            <TrackOrderModal 
              isVisible={showTracking}
              updateState={this.updateState}
              trackOrder={this.trackOrder}
              orderStatus={orderStatus}
              inputTrackOrder={inputTrackOrder}
            />

            <NewAdminModal 
              isVisible={showNewAdmin}
              updateState={this.updateState}
              addAmin={this.createNewAdmin}
              availableUsers={availableUsers}
              newAdminSelection={newAdminSelection}
            />

            <DeleteUserModal 
              isVisible={showDeleteUser}
              updateState={this.updateState}
              deleteAccount={this.deleteAccount}
              availableUsers={availableUsers}
              deleteUserSelection={deleteUserSelection}
            />

            <UpdateBillingModal 
              isVisible={showBilling}
              updateState={this.updateState}
              currUser={currUser}
              updateExpiryMonth={updateExpiryMonth}
              updateExpiryYear={updateExpiryYear}
              updateCardNumber={updateCardNumber}
              updateAddress={updateAddress}
              updatePhoneNumber={updatePhoneNumber}
              updateBilling={this.updateBillingInfo}
            />
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
              <TouchableOpacity onPress={() => this.registerUser()} style={[AccountStyles.loginButton, { width: '47%', backgroundColor: 'white', borderColor: colors.blue, borderWidth: 2 }]}>
                <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
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
            <TouchableOpacity onPress={() => this.setState({ showOrderHistory: true })} style={{ marginTop: 30 }}>
              <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                order history
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showBilling: true })} style={{ marginTop: 10 }}>
              <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                billing information 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ showTracking: true })} style={{ marginTop: 10 }}>
              <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                track an order
              </Text>
            </TouchableOpacity>
            {currUser.admin && (
              <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ showNewPublisher: true })} style={{ marginTop: 10 }}>
                  <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                    add a publisher
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ showNewAdmin: true })} style={{ marginTop: 10 }}>
                  <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                    new admin
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ showSales: true })} style={{ marginTop: 10 }}>
                  <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                    sales reports 
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ showDeleteUser: true })} style={{ marginTop: 10 }}>
                  <Text style={[generalStyles.actionButton, { color: colors.blue }]}>
                    delete a user
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={() => {
              this.setState({ inputUsername: '', inputPassword: '' })
              this.props.logOut()
            }} style={AccountStyles.loginButton}>
              <Text style={[generalStyles.actionButton]}>
                log out 
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteAccount(currUser.username)} style={{ marginTop: 10 }}>
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
    updateUser
  }, dispatch)
);

const mapStateToProps = (state) => {
  const { bookAppStore } = state
  return { bookAppStore }
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);