import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    color: '#7ED957',
    marginBottom: 60,
  },
  view: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 16,
  },
  button2: {
    width: '100%',
    height: 50,
    marginTop: 24,
    borderRadius: 16,
  },
  input: {
    height: 48,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    backgroundColor: '#CCCCCC',
    marginHorizontal: 5,
  },
  otp: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  resend: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#7ED957',
  },
  text2: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
});
