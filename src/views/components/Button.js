import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

const touchStyle = (style) => ({
  ...style,
  backgroundColor: 'red',
  alignItems: 'center',
  padding: 10,
});
const textStyle = {
  fontSize: 24,
  fontFamily: 'monospace',
};

const ButtonCusto = ({ style, onPress, title }) => {
  return (
    <TouchableHighlight style={touchStyle(style)} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableHighlight>
  );
};

export default ButtonCusto;
