import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

type DatePickerProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const DatePicker: FC<DatePickerProps> = props => {
  return (
    <View style={styles.viewWrapper}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInputMask
        style={styles.input}
        placeholder={props.placeholder}
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY',
        }}
        value={props.value}
        onChangeText={formatted => {
          props.onChange(formatted);
        }}
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
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
    backgroundColor: '#FFF',
    width: '100%',
  },
  label: {
    paddingBottom: 4,
    fontWeight: '800',
  },
});

export default DatePicker;
