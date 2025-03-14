import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

const ImageBg = ({children}: {children: React.ReactNode}) => {
  return (
    <ImageBackground
      source={require('../../assets/img/bg.png')}
      style={styles.background}
      resizeMode="cover">
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ImageBg;
