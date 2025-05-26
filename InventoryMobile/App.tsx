/**
 * Inventory Manager Mobile App
 * React Native CRUD Application
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2c5282"
      />
      <AppNavigator />
    </>
  );
}

export default App;
