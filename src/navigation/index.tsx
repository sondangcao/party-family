import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import Step1 from '../screens/Step1';
import {useSelector} from 'react-redux';
import {isLoginSelector} from '../redux/selectors/authSelector';

type HomeStackParams = {
  Home: undefined;
  Step1: undefined;
};

type AuthStackParams = {
  Login: undefined;
};

// @ts-ignore
const HomeStack = createNativeStackNavigator<HomeStackParams>();
const AuthStack = createNativeStackNavigator<AuthStackParams>();

const HomeScreenStack = () => (
  <HomeStack.Navigator
    initialRouteName="Home"
    screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Step1" component={Step1} />
  </HomeStack.Navigator>
);

const AuthScreenStack = () => (
  <AuthStack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

export default function AppNavigation() {
  const loginSelector = useSelector(isLoginSelector);

  return (
    <NavigationContainer>
      {loginSelector ? <HomeScreenStack /> : <AuthScreenStack />}
    </NavigationContainer>
  );
}
