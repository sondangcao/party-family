import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import ForgotPasswordScreen from '../screens/ForgotPassword';
import ChangePasswordScreen from '../screens/ChangePassword';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import Step1 from '../screens/Step1';
import {useSelector} from 'react-redux';
import {isLoginSelector} from '../redux/selectors/authSelector';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

type HomeStackParams = {
  HomeTabs: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
};

// @ts-ignore
const HomeStack = createNativeStackNavigator<HomeStackParams>();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}: any) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}: any) => {
          let iconName;
          let type;
          if (route.name === 'Home') {
            iconName = 'home';
            type = 'ant-design';
          } else if (route.name === 'Step1') {
            iconName = 'user';
            type = 'ant-design';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }
          return (
            <Icon name={iconName || ''} type={type} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Step1" component={Step1} />
    </Tab.Navigator>
  );
};

const HomeScreenStack = () => {
  const loginSelector = useSelector(isLoginSelector);
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      {!loginSelector ? (
        <>
          <HomeStack.Screen name="Login" component={LoginScreen} />
          <HomeStack.Screen name="Register" component={RegisterScreen} />
          <HomeStack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <HomeStack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
        </>
      ) : (
        <HomeStack.Screen name="HomeTabs" component={HomeTabs} />
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
