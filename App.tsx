import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { loadAsync } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as Db from './database';
import appBookReducer from './util/reducers';
import Store from './components/Store/Store';
import Order from './components/Order/Order';
import Account from './components/Account/Account';
import store from './assets/img/store.png';
import storeActive from './assets/img/storeActive.png';
import cart from './assets/img/cart.png';
import cartActive from './assets/img/cartActive.png';
import profile from './assets/img/profile.png';
import profileActive from './assets/img/profileActive.png';

const appStore = createStore(appBookReducer);
const Tab = createBottomTabNavigator();

Db.initializeDb();

const App = () => {
  const [fontsLoaded, fontStatus] = useState(false)

  useEffect(() => {
    if (!fontsLoaded) {
      loadAsync({
        'cabin': require('./assets/fonts/CabinSketch-Regular.ttf'),
        'worksans-regular': require('./assets/fonts/WorkSans-Regular.ttf'),
        'worksans-light': require('./assets/fonts/WorkSans-Light.ttf'),
        'worksans-medium': require('./assets/fonts/WorkSans-Medium.ttf')
      }).then(() => {
        fontStatus(true);
      })
    }
  }, [])

  return (
    fontsLoaded && (
      <NavigationContainer>
        <Provider store={appStore}>
          <Tab.Navigator tabBarOptions={{
            activeBackgroundColor: 'black',
            activeTintColor: 'white',
            inactiveBackgroundColor: 'white',
            inactiveTintColor: 'black',
            showIcon: true,
            labelStyle: {
              paddingTop: 2,
              paddingBottom: 1,
              fontFamily: 'worksans-regular',
              fontSize: 12
            },
            style: {
              backgroundColor: 'white',
            },
            keyboardHidesTabBar: true
          }} initialRouteName="Store" backBehavior="history" >
            <Tab.Screen
              options={{
                tabBarLabel: 'Store',
                tabBarIcon: ({ focused }) => (
                  <Image source={focused ? storeActive : store} style={{ height: 20, resizeMode: 'contain', marginTop: 10 }} />
                )
              }}
              name="Store"
              component={Store}
            />
            <Tab.Screen 
              options={{
                tabBarLabel: 'Order',
                tabBarIcon: ({ focused }) => (
                  <Image source={focused ? cartActive : cart} style={{ height: 20, resizeMode: 'contain', marginTop: 10 }} />
                )
              }} 
              name="Order"
              component={Order}
            />
            <Tab.Screen 
              options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ focused }) => (
                  <Image source={focused ? profileActive : profile} style={{ height: 20, resizeMode: 'contain', marginTop: 10 }} />
                )
              }}
              name="Account" 
              component={Account} 
            />
          </Tab.Navigator>
        </Provider>
      </NavigationContainer>
    )
  );
}

export default App;
