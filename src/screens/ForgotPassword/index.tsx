import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {styles} from './styles';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axiosClient from '../../config/axiosConfig';
import Toast from 'react-native-toast-message';
import {useForm, Controller} from 'react-hook-form';
import {AppButton, InputField} from '../../components';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc'),
});

const ForgotPasswordScreen = () => {
  const [sent, setSent] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [otpInput, setOtpInput] = useState<string>('');
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
      if (!sent) {
        const res = await axiosClient.post('/auth/forgot-password', {
          email: data.email,
        });
        if (res.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'OTP đã được gửi đến email của bạn',
          });
          setTimeout(() => {
            setSent(true);
          }, 1500);
        }
      } else {
        const res = await axiosClient.post('/auth/verify-otp', {
          email: data.email,
          otp: otpInput,
        });
        if (res.status === 200) {
          navigation.navigate('ChangePassword', {
            email: data.email,
          });
        }
      }
    } catch (error: any) {
      Toast.show({type: 'error', text1: error.response?.data.message});
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) return; // Hết thời gian thì dừng
    const interval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <ImageBackground
      source={require('../../assets/img/bg.png')}
      style={styles.background}
      resizeMode="cover">
      <Toast position="top" topOffset={40} />
      {!sent ? (
        <View style={styles.view}>
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
          <AppButton
            title="Gửi mã OTP reset mật khẩu"
            style={styles.button}
            onClick={handleSubmit(onSubmit)}
            size="md"
            type="solid"
            color="#7ED957"
          />
          <AppButton
            title="Quay lại"
            style={styles.button2}
            onClick={() => navigation.goBack()}
            size="md"
            type="solid"
            color="#7ED957"
          />
        </View>
      ) : (
        <View style={styles.view}>
          <OtpInputs
            handleChange={code => setOtpInput(code)}
            numberOfInputs={6}
            style={styles.otpContainer}
            inputStyles={styles.otpInput}
            autofillFromClipboard={false}
          />
          <AppButton
            title="Reset mật khẩu"
            style={styles.button2}
            onClick={handleSubmit(onSubmit)}
            size="sm"
            type="solid"
            color="#7ED957"
          />
          <Text style={styles.otp}>{`Thời hạn của mã OTP: ${formatTime(
            timeLeft,
          )}`}</Text>
          <View style={styles.text2}>
            <Text style={styles.otp}>Bạn chưa nhận được mã? </Text>
            <Text onPress={() => setSent(false)} style={styles.resend}>
              Gửi lại
            </Text>
          </View>
        </View>
      )}
    </ImageBackground>
  );
};
export default ForgotPasswordScreen;
