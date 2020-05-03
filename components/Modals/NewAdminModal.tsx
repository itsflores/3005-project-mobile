import React from 'react';
import { View, Text, TouchableOpacity, Modal, Picker } from 'react-native';
import { generalStyles, colors } from '../../App.styles';
import AccountStyles from '../Account/Account.styles';
import { runQuery } from '../../database';

export const NewAdminModal = ({
  isVisible,
  updateState,
  availableUsers,
  newAdminSelection,
  addAmin
}) => (
  <Modal 
    animationType='fade'
    transparent={true}
    visible={isVisible}
    onShow={() => {
      runQuery(`
        select username 
        from users
        where role_ID not in ('r-00');
      `).then((result: any) => {
        const users = result._array.reduce((acc: any [], user) => {
          acc.push(user.username);
          return acc;
        }, []);

        if (users.length === 1) {
          updateState({ availableUsers: users, newAdminSelection: users[0] });
        } else {
          updateState({ availableUsers: users });
        }
      })
    }}
  >
    <View style={generalStyles.overlayContainer}>
      <View style={generalStyles.contentOverlayContainer}>
        <View>
          <Text style={[generalStyles.cardHeader]}>
            Make a user an admin 
          </Text>
          <Text style={[generalStyles.subheader2]}>
            Select a username from the dropdown
          </Text>
        </View>
        {availableUsers.length > 0 ? (
          <Picker 
            onValueChange={(value) => updateState({ newAdminSelection: value })}
            selectedValue={newAdminSelection}
            style={{ width: '100%', marginTop: 20, marginBottom: 20, alignItems: 'center' }}>
            {availableUsers.map((username, index) => (
              <Picker.Item key={index} label={username} value={username} />
            ))}
          </Picker>
        ) : (
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={[generalStyles.subheader1]}>
              There are no available users!
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={generalStyles.closeOverlayButton} 
          onPress={() => addAmin()}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            close & save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={generalStyles.exitOverlayButton} 
          onPress={() => updateState({ showNewAdmin: false })}
        >
          <Text style={[generalStyles.actionExit, { color: colors.blue }]}>
            close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);