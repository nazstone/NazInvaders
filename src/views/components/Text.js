import React from 'react';
import { Text } from 'react-native';

const TextCusto = ({ children, style }) => {
  return <Text style={{ ...style, fontFamily: 'monospace' }}>{children}</Text>;
};

export default TextCusto;
