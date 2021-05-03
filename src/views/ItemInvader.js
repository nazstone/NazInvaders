import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const styleDirectionRow = {
  flexDirection: 'row',
};
const styleFastImage = { height: 75, width: 75 };

const styleMetadata = {
  flexGrow: 1,
  flexDirection: 'row',
  marginLeft: 20,
  justifyContent: 'space-between',
};
const styleName = { justifyContent: 'center' };
const styleNameMore = {
  fontSize: 16,
  fontWeight: 'bold',
};
const styleDatePoints = {
  marginRight: 10,
  justifyContent: 'center',
  alignItems: 'flex-end',
};

const ItemInvader = ({ item, navigation }) => {
  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={() => {
        navigation.navigate('Home', { screen: 'Detail', params: { item } });
      }}
    >
      <View style={styleDirectionRow}>
        <FastImage source={{ uri: item.image_main }} style={styleFastImage} />
        <View style={styleMetadata}>
          <View style={styleName}>
            <Text style={styleNameMore}>{item.name}</Text>
            <Text>{item.status}</Text>
          </View>
          <View style={styleDatePoints}>
            <Text>{item.points} points</Text>
            <Text>{item.date}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ItemInvader;
