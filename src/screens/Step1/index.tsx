import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import style from './styles';

const Step1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={style.view}>
      <Text>Step1</Text>
      <Button onPress={() => navigation.goBack()} title="Back to Home" />
    </View>
  );
};
export default Step1;
