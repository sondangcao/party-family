import React, {FC, useState} from 'react';
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from 'react-native-ui-datepicker';
import {StyleSheet, View} from 'react-native';

type DatePickerProps = {};

const DatePicker: FC<DatePickerProps> = props => {
  console.log('props', props);
  const [selected, setSelected] = useState<DateType>();
  const defaultStyles = getDefaultStyles();

  return (
    <DateTimePicker
      mode="single"
      date={selected}
      styles={defaultStyles}
      onChange={({date}) => setSelected(date)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
});

export default DatePicker;
