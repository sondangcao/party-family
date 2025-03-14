import React, {useState} from 'react';
import {styles} from './styles';
import {ImageBackground, View} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {AppButton, InputField} from '../../components';
import {Icon} from 'react-native-elements';
import axiosClient from '../../config/axiosConfig';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Mật khẩu ít nhất 6 ký tự')
    .required('Bắt buộc'),
  confirm_password: Yup.string().oneOf([
    Yup.ref('password'),
    'Passwords must match',
  ]),
});

const ChangePasswordScreen = ({route}: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {email} = route.params;
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);
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
      const res = await axiosClient.post('/auth/change-password', {
        email: email,
        password: data.confirm_password,
      });
      if (res.status === 200) {
        navigation.navigate('Login');
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
        <Controller
          name="confirm_password"
          control={control}
          render={({field: {onChange, value}}) => (
            <InputField
              onChange={onChange}
              label="Confirm Password"
              style={styles.input}
              value={value || ''}
              placeholder="Vui lòng nhập mật khẩu"
              type={hideConfirmPassword ? true : false}
              leftIcon={<Icon name="lock" />}
              rightIcon={
                <Icon
                  onPress={() =>
                    setHideConfirmPassword(prevState => !prevState)
                  }
                  name={hideConfirmPassword ? 'eye' : 'eye-with-line'}
                  type="entypo"
                />
              }
              errorMessage={errors.confirm_password?.message || ''}
            />
          )}
        />
        <AppButton
          title="Thay đổi mật khẩu"
          style={styles.button}
          onClick={handleSubmit(onSubmit)}
          size="md"
          type="solid"
          color="#7ED957"
        />
      </View>
    </ImageBackground>
  );
};

export default ChangePasswordScreen;
