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
  },
  view2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 16,
  },
  input: {
    height: 48,
  },
});
