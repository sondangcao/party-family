import React, {useEffect} from 'react';
import {View} from 'react-native';
import style from './styles';
import axiosClient from '../../config/axiosConfig';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useSelector} from 'react-redux';
import {isLoginSelector} from '../../redux/selectors/authSelector';
import {setUser} from '../../redux/slices/authSlice';
import {Card, Text, Button} from '@rneui/base';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const email = useSelector(isLoginSelector);
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
      <Card>
        <Text>Word of the Day</Text>
        <Text h4>be-nev-o=lent</Text>
        <Text>adjective</Text>
        <Text>
          well meaning and kindly.
          {'"a benevolent smile"'}
        </Text>
        <Button size="sm" type="clear">
          Learn More
        </Button>
      </Card>
    </View>
  );
};

export default HomeScreen;
