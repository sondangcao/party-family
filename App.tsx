/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import FCMWrapper from './src/utils/FCM';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import HomeScreen from './src/screens/Home';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FCMWrapper>
          <SafeAreaView>
            <Text>Mobile Demo</Text>
            <HomeScreen />
          </SafeAreaView>
        </FCMWrapper>
      </PersistGate>
    </Provider>
  );
};
export default App;
