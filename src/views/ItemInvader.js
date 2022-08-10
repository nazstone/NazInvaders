import React from 'react';
import { Image, TouchableHighlight, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styleStatus } from '../utils/style';
import Text from './components/Text';
import { intToBool } from './utils';

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
const styleViewNameFounded = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};
const styleImageFounded = { width: 20, height: 15, marginLeft: 10 };

const ItemInvader = ({ item, navigation, lastSelected }) => {
  return (
    <TouchableHighlight
      underlayColor="gray"
      onPress={() => {
        lastSelected && lastSelected(item);
        navigation.navigate('Detail', { item });
      }}
    >
      <View
        style={{
          ...styleDirectionRow,
          backgroundColor: (!!item.lastSelected && '#333333') || 'black',
        }}
      >
        <FastImage source={{ uri: item.image_main }} style={styleFastImage} />
        <View style={styleMetadata}>
          <View style={styleName}>
            <View style={styleViewNameFounded}>
              <Text style={styleNameMore}>{item.name}</Text>
              {intToBool(item.founded) && (
                <Image
                  source={require('../../assets/img/founded.png')}
                  style={styleImageFounded}
                />
              )}
            </View>
            <Text style={styleStatus(item.status)}>{item.status}</Text>
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
