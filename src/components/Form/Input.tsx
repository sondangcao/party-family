import {Input} from 'react-native-elements';
import React, {FC, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type InputComponentProps = {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  type?: boolean;
  errorStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  errorMessage: string;
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  value: string;
};

const InputField: FC<InputComponentProps> = props => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.viewWrapper}>
      <Text style={styles.label}>{props.label}</Text>
      <Input
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        secureTextEntry={props.type}
        leftIcon={props.leftIcon}
        style={props.style}
        inputContainerStyle={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
        ]}
        value={props.value}
        containerStyle={styles.inputWrapper}
        inputStyle={styles.inputText}
        rightIcon={props.rightIcon}
        onFocus={() => setIsFocused(true)}
        errorStyle={props.errorStyle}
        errorMessage={props.errorMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  label: {
    paddingBottom: 4,
    fontWeight: '800',
  },
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
