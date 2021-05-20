import React from 'react';
import { Text } from 'react-native';
import { fontFamily, textColor } from '../../utils/style';

const styleText = (style) => {
  return { color: textColor, ...style, ...fontFamily };
};

const TextCusto = ({ children, style }) => {
  return <Text style={styleText(style)}>{children}</Text>;
};

export default TextCusto;
