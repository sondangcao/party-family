export default {
  notificationError: (error: {
    status: any;
    data: {errors: any[]; key: any};
  }) => {
    switch (error.status) {
      case 500:
        console.log('500');
        break;
      default:
        if (error.data?.errors) {
          error.data?.errors.forEach(({key, params}: any) => {
            console.log('error', error, key, params);
          });
        } else if (error.data?.key) {
          console.log('error other', error);
        } else {
          throw error;
        }
    }
  },
};
