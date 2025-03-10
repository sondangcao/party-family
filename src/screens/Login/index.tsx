import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import {InputField, AppButton} from '../../components';
import {Icon} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
  password: Yup.string()
    .min(6, 'Mật khẩu ít nhất 6 ký tự')
    .required('Bắt buộc'),
});

const LoginScreen = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  console.log('errors', errors);

  const onSubmit = (data: any) => console.log(data);

  return (
    <ImageBackground
      source={require('../../assets/img/bg.png')}
      style={styles.background}
      resizeMode="cover">
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
            onClick={() => {}}
            color="#0D522C"
            size="md"
          />
          <AppButton
            title="Forgot password"
            type="clear"
            onClick={() => {}}
            color="#0D522C"
            size="md"
          />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    color: '#7ED957',
    marginBottom: 60,
  },
  view: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    padding: 16,
  },
  view2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 16,
  },
  input: {
    height: 48,
  },
});
export default LoginScreen;
