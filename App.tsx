/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import FCMWrapper from './src/utils/FCM';
import AppNavigation from './src/navigation';

const App = (): JSX.Element => {
  return (
    <FCMWrapper>
      <AppNavigation />
    </FCMWrapper>
  );
};
export default App;
