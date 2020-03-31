import React from 'react';
import { View } from 'react-native';
import Store from './components/Store/Store';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Store initial={12} />
    </View>
  );
}
