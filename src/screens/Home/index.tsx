import React from 'react';
import {View} from 'react-native';
import style from './styles';
import {Card, Text, Button} from '@rneui/base';

const HomeScreen = () => {
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
