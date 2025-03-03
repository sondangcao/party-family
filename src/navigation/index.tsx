import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import Step1 from '../screens/Step1';

type HomeStackParams = {
  Home: undefined;
  Step1: undefined;
};

// @ts-ignore
const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeScreenStack = () => (
  <HomeStack.Navigator
    initialRouteName="Home"
    screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Step1" component={Step1} />
  </HomeStack.Navigator>
);

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <HomeScreenStack />
    </NavigationContainer>
  );
}
