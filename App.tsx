import React, { useState, useEffect } from 'react';
import Store from './components/Store/Store';
import { loadAsync } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const App = () => {
  const [fontsLoaded, fontStatus] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      await loadAsync({
        'cabin': require('./assets/fonts/CabinSketch-Regular.ttf'),
        'worksans-regular': require('./assets/fonts/WorkSans-Regular.ttf'),
        'worksans-light': require('./assets/fonts/WorkSans-Light.ttf'),
        'worksans-medium': require('./assets/fonts/WorkSans-Medium.ttf')
      });
      fontStatus(true);
    }

    if (!fontsLoaded) {
      loadFonts();
    }
  }, [])

  return (
    fontStatus && (
      <NavigationContainer>
        {/* <Store /> */}
        <Tab.Navigator tabBarOptions={{
          activeBackgroundColor: 'black',
          activeTintColor: 'white',
          inactiveBackgroundColor: 'white',
          inactiveTintColor: 'black',
          showIcon: true,
          labelStyle: {
            paddingTop: 2,
            paddingBottom: 2,
            fontFamily: ''
          },
          style: {
            backgroundColor: 'white',
          }
        }} initialRouteName="Store" backBehavior="history" >
          <Tab.Screen name="Store" component={Store} />
          <Tab.Screen name="Order" component={Store} />
          <Tab.Screen name="Profile" component={Store} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  );
}

export default App;
