import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Text} from 'react-native';
import {InputField, AppButton} from '../../components';
import {Icon} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axiosClient from '../../config/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {styles} from './styles';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {isLoginAction} from '../../redux/slices/authSlice';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu ít nhất 6 ký tự')
    .required('Bắt buộc'),
});

const LoginScreen = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    AsyncStorage.removeItem('token');
  }, []);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await axiosClient.post('/auth/login', {
        email: data.email,
        password: data.password,
      });
      if (res) {
        dispatch(isLoginAction(true));
        await AsyncStorage.setItem('token', res.data?.access_token);
        navigation.navigate('Home');
      }
    } catch (error: any) {
      Toast.show({type: 'error', text1: error.response?.data.message});
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/bg.png')}
      style={styles.background}
      resizeMode="cover">
      <Toast position="top" topOffset={40} />
      <View style={styles.view}>
        <Text style={styles.text}>Party Family</Text>
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputField
              onChange={onChange}
              label="Email"
              style={styles.input}
              value={value}
              placeholder="Vui lòng nhập email"
              leftIcon={<Icon name="mail" />}
              errorMessage={errors.email?.message || ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputField
              onChange={onChange}
              label="Password"
              style={styles.input}
              value={value}
              placeholder="Vui lòng nhập mật khẩu"
              type={hidePassword ? true : false}
              leftIcon={<Icon name="lock" />}
              rightIcon={
                <Icon
                  onPress={() => setHidePassword(prevState => !prevState)}
                  name={hidePassword ? 'eye' : 'eye-with-line'}
                  type="entypo"
                />
              }
              errorMessage={errors.password?.message || ''}
            />
          )}
        />

        <AppButton
          title="Đăng nhập"
          style={styles.button}
          onClick={handleSubmit(onSubmit)}
          size="md"
          type="solid"
          color="#7ED957"
        />
        <View style={styles.view2}>
          <AppButton
            title="Sign up"
            type="clear"
            onClick={() => {
              navigation.navigate('Register');
            }}
            color="#0D522C"
            size="md"
          />
          <AppButton
            title="Forgot password"
            type="clear"
            onClick={() => {
              navigation.navigate('ForgotPassword');
            }}
            color="#0D522C"
            size="md"
          />
        </View>
      </View>
    </ImageBackground>
  );
};
export default LoginScreen;
