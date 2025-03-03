import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import style from './styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axiosClient from '../../config/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  // const linkTo = useLinkTo();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    (async () => {
      const tokenDevices = await AsyncStorage.getItem('token-device');
      await axiosClient.post('/auth/login', {
        email: 'dangcaoson.it@gmail.com',
        password: 'dangcaoson98',
      });
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await axiosClient.post('/user-token/save', {
          userId: 1,
          tokens: tokenDevices ? tokenDevices : '',
        });
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  return (
    <View style={style.view}>
      <Text>Home!</Text>
      <Button
        onPress={() => navigation.navigate('Step1')}
        title="Link to step 1"
      />
    </View>
  );
};

export default HomeScreen;
