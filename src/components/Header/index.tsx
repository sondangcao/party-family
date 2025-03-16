import React, {FC} from 'react';
import {Header as HeaderRNE} from 'react-native-elements';
import {StyleSheet, TouchableOpacity} from 'react-native';

type HeaderComponentProps = {
  title: string;
  leftHeader?: React.ReactNode;
  rightHeader?: React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  bgColor?: string;
};

const AppHeader: FC<HeaderComponentProps> = props => {
  return (
    <HeaderRNE
      style={styles.container}
      backgroundColor={props.bgColor}
      leftComponent={
        <TouchableOpacity onPress={props.onPressLeft}>
          {props.leftHeader}
        </TouchableOpacity>
      }
      centerComponent={{text: props.title, style: styles.titleHeader}}
      rightComponent={
        <TouchableOpacity onPress={props.onPressRight}>
          {props.rightHeader}
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
    color: '#fff',
  },
});

export default AppHeader;
