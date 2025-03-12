import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

type SelectComponentProps = {
  data: {label: string; value: string}[];
  onChange: (value: string) => void;
  value: string;
  label: string;
};

const Select: FC<SelectComponentProps> = props => {
  return (
    <View style={styles.viewWrapper}>
      <Text style={styles.label}>{props.label}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={props.value}
        onChange={item => props.onChange(item.value)}
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
  dropdown: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 8,
    marginBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  dropdownFocused: {
    borderColor: '#1877F2',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    display: 'none',
  },
});

export default Select;
