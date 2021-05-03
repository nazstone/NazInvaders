import React from 'react';

import { View, Text, Button, Linking } from 'react-native';
import { text } from '../utils/font';

const margin = {
  margin: 14,
};
const marginAndText = {
  ...margin,
  ...text,
};
const linkStyle = {
  ...marginAndText,
  color: 'blue',
};
const AboutView = ({ navigation }) => {
  return (
    <View style={margin}>
      <Text style={marginAndText}>
        Fan of Invader, I decide to do application that list all invaders from
        differents cities.
      </Text>
      <Text style={marginAndText}>The data come from the web site:</Text>
      <Text
        style={linkStyle}
        onPress={() => {
          Linking.openURL('http://invader.spotter.free.fr/listing.php');
        }}
      >
        Invader spotter
      </Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

export default AboutView;
