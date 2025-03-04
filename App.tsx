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
import {ThemeProvider} from '@rneui/themed';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <FCMWrapper>
            <AppNavigation />
          </FCMWrapper>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
