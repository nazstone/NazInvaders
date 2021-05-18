import { DarkTheme } from '@react-navigation/native';

const flex1 = {
  flex: 1,
};

const colorFromStatus = (status) => {
  if (status === 'ok') {
    return 'chartreuse';
  } else if (status.startsWith('un peu')) {
    return 'orange';
  }
  return 'crimson';
};

const styleStatus = (st) => {
  const status = st.toLowerCase();
  return {
    color: colorFromStatus(status),
    fontWeight: status === 'ok' ? 'normal' : 'bold',
  };
};

const bgcolor = 'black';
const textColor = 'white';
const borderColor = 'white';
const theme = DarkTheme;

const fontFamily = { fontFamily: 'monospace' };

export {
  flex1,
  styleStatus,
  bgcolor,
  textColor,
  theme,
  borderColor,
  fontFamily,
};
