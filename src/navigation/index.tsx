import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import Step1 from '../screens/Step1';
const HomeStack = createNativeStackNavigator();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="Step1"
        options={{headerShown: false}}
        component={Step1}
      />
    </HomeStack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <HomeScreenStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
