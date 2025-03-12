import React, {useRef, useState} from 'react';
import {styles} from './styles';
import {ImageBackground, Text, View, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import {AppButton, DatePicker, InputField, Select} from '../../components';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import axiosClient from '../../config/axiosConfig';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Icon} from 'react-native-elements';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  firstName: Yup.string(),
  lastName: Yup.string(),
  phone: Yup.string().min(10, 'Số điện thoại ít nhất 10 ký tự'),
  role: Yup.string(),
  gender: Yup.string(),
  dob: Yup.string(),
});

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const scrollViewRef = useRef<ScrollView>(null);
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
      const res = await axiosClient.post('/auth/register', {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        dob: data.dob,
        gender: data.gender,
        phone: data.phone,
      });
      if (res) {
        scrollViewRef.current?.scrollTo({y: 0, animated: true});
        Toast.show({type: 'success', text1: 'Đăng ký tài khoản thành công'});
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response?.data.message.map((mes: any) => mes.message),
      });
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/bg.png')}
      style={styles.background}
      resizeMode="cover">
      <Toast position="top" topOffset={60} />
      <ScrollView ref={scrollViewRef}>
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
                value={value || ''}
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

          <Controller
            name="firstName"
            control={control}
            render={({field: {onChange, value}}) => (
              <InputField
                onChange={onChange}
                label="First Name"
                style={styles.input}
                value={value || ''}
                placeholder="Vui lòng nhập họ"
                errorMessage={errors.firstName?.message || ''}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({field: {onChange, value}}) => (
              <InputField
                onChange={onChange}
                label="Last Name"
                style={styles.input}
                value={value || ''}
                placeholder="Vui lòng nhập tên"
                errorMessage={errors.lastName?.message || ''}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({field: {onChange, value}}) => (
              <InputField
                onChange={onChange}
                label="Phone"
                style={styles.input}
                value={value || ''}
                placeholder="Vui lòng nhập số điện thoại"
                errorMessage={errors.phone?.message || ''}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({field: {onChange, value}}) => (
              <Select
                label="Role"
                onChange={onChange}
                value={value || ''}
                data={[
                  {label: 'admin', value: 'admin'},
                  {label: 'member', value: 'member'},
                  {label: 'chef', value: 'chef'},
                ]}
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({field: {onChange, value}}) => (
              <Select
                label="Gender"
                onChange={onChange}
                value={value || ''}
                data={[
                  {label: 'male', value: 'male'},
                  {label: 'female', value: 'female'},
                ]}
              />
            )}
          />
          <Controller
            name="dob"
            control={control}
            render={({field: {onChange, value}}) => {
              return (
                <DatePicker
                  label="Birthday"
                  placeholder="DD/MM/YYYY"
                  value={value || ''}
                  onChange={onChange}
                />
              );
            }}
          />
          <AppButton
            title="Đăng ký tài khoản"
            style={styles.button}
            onClick={handleSubmit(onSubmit)}
            size="md"
            type="solid"
            color="#7ED957"
          />
          <View style={styles.view2}>
            <Text>Nếu đã có tài khoản, chuyển qua màn đăng nhập tại:</Text>
            <AppButton
              title="Login"
              type="clear"
              onClick={() => {
                navigation.navigate('Login');
              }}
              color="#0D522C"
              size="md"
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default RegisterScreen;
