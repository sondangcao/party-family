import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import style from './styles';
import axiosClient from '../../config/axiosConfig';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useSelector} from 'react-redux';
import {authSelector} from '../../redux/selectors/userSelector';
import {setUser} from '../../redux/slices/userSlice';

const HomeScreen = () => {
  // const linkTo = useLinkTo();
  // const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const dispatch = useAppDispatch();
  const email = useSelector(authSelector);
  console.log('data', email);

  useEffect(() => {
    (async () => {
      const res = await axiosClient.post('/auth/login', {
        email: 'dangcaoson.it@gmail.com',
        password: 'dangcaoson98',
      });
      console.log('res', res.data?.access_token);
      dispatch(setUser(res.data?.access_token));
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [dispatch]);

  return (
    <View style={style.view}>
      <Text>Home!</Text>
      <Button title="Link to step 1" />
    </View>
  );
};

export default HomeScreen;
