import {Input} from 'react-native-elements';
import React, {FC, useState} from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

type InputComponentProps = {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  type?: boolean;
  errorStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
};

const InputField: FC<InputComponentProps> = props => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Input
      placeholder="test"
      secureTextEntry={props.type}
      leftIcon={props.leftIcon}
      inputContainerStyle={[
        styles.inputContainer,
        isFocused && styles.inputFocused,
      ]}
      containerStyle={styles.inputWrapper}
      inputStyle={styles.inputText}
      rightIcon={props.rightIcon}
      onFocus={() => setIsFocused(true)}
      errorStyle={props.errorStyle}
      errorMessage={props.errorMessage}
    />
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    paddingHorizontal: 0,
  },
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    borderBottomWidth: 0,
    borderBottomColor: 'red',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  inputFocused: {
    borderBottomColor: '#1877F2',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
  },
});

export default InputField;
