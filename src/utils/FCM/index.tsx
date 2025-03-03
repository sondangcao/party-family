import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';

//fix warning, don't mind this
declare global {
  var RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS: boolean;
}
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
//end fix warning

import notifee, {
  AndroidImportance,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';
import {Alert, Platform} from 'react-native';

const FCMWrapper = ({children}: {children: React.ReactNode}) => {
  //get token when u wanna send a test notification
  messaging()
    .getToken()
    .then(token => {
      console.log(token);
    });

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification || {};

      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      Platform.OS === 'android' &&
        notifee.displayNotification({
          title: title || 'Notification Title',
          body: body || 'Main body content of the notification',
          data: remoteMessage.data,
          android: {
            channelId: channelId,
            pressAction: {
              id: 'default',
            },
          },
        });
    });

    const checkPermission = async () => {
      const settings = await notifee.getNotificationSettings();
      if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
        Alert.alert(
          '',
          'Notification permissions has been denied, please enable permission',
          [
            {
              text: 'OK',
              onPress: async () => {
                await notifee.openNotificationSettings();
              },
            },
            {
              text: 'Cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
      }
    };
    checkPermission();

    return unsubscribe;
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('detail', detail);
          break;
      }
    });
  }, []);

  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};
export default FCMWrapper;
