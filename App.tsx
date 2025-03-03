/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import FCMWrapper from './src/utils/FCM';
import AppNavigation from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FCMWrapper>
            <AppNavigation />
        </FCMWrapper>
      </PersistGate>
    </Provider>
  );
};
export default App;
