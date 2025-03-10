// import {ToastAndroid} from 'react-native';
import Toast from 'react-native-toast-message';

export default {
  notificationError: (error: any) => {
    switch (error.status) {
      case 500:
        Toast.show(error.response?.data.message);
        // ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
        break;
      default:
        if (error.response?.data) {
          Toast.show(error.response?.data?.message);
          // error.response?.data?.message?.forEach(({field, message}: any) => {
          //   console.log(field);
          //   Toast.show(message);
          // });
        } else {
          throw Error(error);
        }
    }
  },
};
