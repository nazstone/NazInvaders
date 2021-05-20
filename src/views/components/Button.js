import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { textColor, bgcolor, borderColor, fontFamily } from '../../utils/style';

const touchStyle = (style) => ({
  ...style,
  backgroundColor: bgcolor,
  alignItems: 'center',
  padding: 10,
  margin: 5,
  borderWidth: 2,
  borderRadius: 10,
  borderStyle: 'dashed',
  borderColor: borderColor,
});
const textStyle = {
  fontSize: 24,
  color: textColor,
  ...fontFamily,
};

const ButtonCusto = ({ style, onPress, title }) => {
  return (
    <TouchableHighlight style={touchStyle(style)} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableHighlight>
  );
};

export default ButtonCusto;
