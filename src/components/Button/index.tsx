import React, {FC} from 'react';

import {Button} from '@rneui/themed';
import {ActivityIndicator} from 'react-native';

type ButtonComponentProps = {
  title: string;
  size: 'sm' | 'md' | 'lg';
  type: 'solid' | 'clear' | 'outline';
  color: string;
  disabled?: boolean;
  loading?: boolean;
};

const AppButton: FC<ButtonComponentProps> = props => {
  if (props.loading) {
    return (
      <Button size={props.size || 'sm'} color={props.color} type={props.type}>
        <ActivityIndicator size="small" color="#fff" /> {props.title}
      </Button>
    );
  }
  return (
    <Button size={props.size || 'sm'} color={props.color} type={props.type}>
      {props.title}
    </Button>
  );
};

export default AppButton;
