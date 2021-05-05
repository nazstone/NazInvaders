const flex1 = {
  flex: 1,
};

const colorFromStatus = (status) => {
  if (status === 'ok') {
    return 'green';
  } else if (status.startsWith('un peu')) {
    return 'orange';
  }
  return 'red';
};

const styleStatus = (st) => {
  const status = st.toLowerCase();
  return {
    color: colorFromStatus(status),
    fontWeight: status === 'ok' ? 'normal' : 'bold',
  };
};

export { flex1, styleStatus };
