import React, {FC} from 'react';

import {Button} from '@rneui/themed';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';

type ButtonComponentProps = {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  type: 'solid' | 'clear' | 'outline';
  color: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  onClick: () => void;
};

const AppButton: FC<ButtonComponentProps> = props => {
  if (props.loading) {
    return (
      <Button
        style={props.style}
        size={props.size || 'sm'}
        color={props.color}
        type={props.type}>
        <ActivityIndicator size="small" color="#fff" /> {props.title}
      </Button>
    );
  }
  return (
    <Button
      onPress={props.onClick}
      style={props.style}
      size={props.size || 'sm'}
      color={props.color}
      type={props.type}>
      {props.title}
    </Button>
  );
};

export default AppButton;
