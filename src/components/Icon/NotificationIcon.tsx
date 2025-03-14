import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, Badge} from 'react-native-elements';

const NotificationIcon = ({count}: {count?: number}) => {
  return (
    <View style={styles.container}>
      <Icon name="notifications" type="material" size={30} />
      {count && count > 0 && (
        <Badge
          value={count}
          status="error"
          containerStyle={styles.badgeContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: -3,
    left: 15,
  },
});

export default NotificationIcon;
