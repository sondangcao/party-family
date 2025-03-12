import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import Step1 from '../screens/Step1';
import {useSelector} from 'react-redux';
import {isLoginSelector} from '../redux/selectors/authSelector';

type HomeStackParams = {
  Home: undefined;
  Step1: undefined;
  Login: undefined;
  Register: undefined;
};

// @ts-ignore
const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeScreenStack = () => {
  const loginSelector = useSelector(isLoginSelector);
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      {!loginSelector ? (
        <>
          <HomeStack.Screen name="Login" component={LoginScreen} />
          <HomeStack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <HomeStack.Screen name="Home" component={HomeScreen} />
          <HomeStack.Screen name="Step1" component={Step1} />
        </>
      )}
    </HomeStack.Navigator>
  );
};

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <HomeScreenStack />
    </NavigationContainer>
  );
}
