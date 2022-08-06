import React from 'react';

import { View, Linking, TouchableOpacity } from 'react-native';
import { text } from '../utils/font';
import Text from './components/Text';

const margin = {
  margin: 14,
};
const marginAndText = {
  ...margin,
  ...text,
};
const linkStyle = {
  ...marginAndText,
  color: 'yellow',
};
const AboutView = () => {
  return (
    <View style={margin}>
      <Text style={marginAndText}>
        Fan of Invader, I decide to do an application that list all invaders
        from differents cities.
      </Text>
      <Text style={marginAndText}>The data come from the web site:</Text>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('http://invader.spotter.free.fr/listing.php');
        }}
      >
        <Text style={linkStyle}>Invader spotter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutView;
