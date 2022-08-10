import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from './components/Text';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import ImageZoom from 'react-native-image-pan-zoom';
import { DateTime } from 'luxon';

import { getComments, getItem, setItemFounded } from '../repo/db';
import {
  bgcolor,
  borderColor,
  flex1,
  styleStatus,
  textColor,
} from '../utils/style';
import { boolToInt, intToBool } from './utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DATE_FORMAT_FROM_DB = 'dd/MM/yyyy';

const styleScroll = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  flex: 1,
};

const styleRowBetween = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const styleCommentView = {
  padding: 5,
  paddingLeft: 10,
};

const styleCommentText = {
  borderLeftWidth: 2,
  paddingLeft: 5,
  fontWeight: 'bold',
};

const styleTextOpen = {
  width: '100%',
  height: '100%',
  paddingTop: 5,
  paddingBottom: 5,
  paddingRight: 10,
  paddingLeft: 10,
};

const styleViewTextOpen = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  margin: 10,
  borderRadius: 30,
  borderWidth: 3,
  borderColor: borderColor,
  backgroundColor: bgcolor,
  color: textColor,
};

const styleCommentTitle = { fontWeight: 'bold', fontSize: 17 };

const styleLocationInfo = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
};

const extract = (route) => route.params.item;

const Detail = ({ route }) => {
  const [item, setItem] = useState(extract(route));
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const commentsTmp = await getComments(item.id);
      setComments(commentsTmp);
      const res = await getItem(item.id);
      res.length > 0 && setItem(res.item(0));
    })();
  }, [item.id]);

  const commentsUnsort = [];
  for (let i = 0; i < comments.length; i += 1) {
    commentsUnsort.push(comments.item(i));
  }
  const commentsView = commentsUnsort
    .sort((a, b) => {
      return (
        DateTime.fromFormat(b.date, DATE_FORMAT_FROM_DB) -
        DateTime.fromFormat(a.date, 'dd/MM/yyyy')
      );
    })
    .map((comment) => (
      <View key={comment.id} style={styleCommentView}>
        <Text style={styleCommentText}>
          {comment.author} ({comment.date}):
        </Text>
        <Text>{comment.comment}</Text>
      </View>
    ));

  const images = [item.image_main];
  if (item.image_street) {
    images.push(item.image_street);
  }
  if (item.image_street_updated) {
    images.push(item.image_street_updated);
  }
  const scaleValue = useRef(1);
  const renderItem = (d) => (
    <View style={flex1}>
      <ImageZoom
        style={flex1}
        cropWidth={windowWidth}
        cropHeight={windowHeight / 2}
        imageWidth={windowWidth}
        imageHeight={windowHeight}
        minScale={1}
        onStartShouldSetPanResponder={(e) => {
          return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
        }}
        onMove={({ scale }) => {
          scaleValue.current = scale;
        }}
      >
        <FastImage
          source={{ uri: d.item }}
          style={flex1}
          resizeMode="contain"
        />
      </ImageZoom>
      <View style={styleViewTextOpen}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(d.item);
          }}
        >
          <Text style={styleTextOpen}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={flex1}>
      <FlatList
        style={flex1}
        data={images}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(i) => i}
      />
      <ScrollView style={styleScroll}>
        <View style={styleRowBetween}>
          <Text style={styleCommentTitle}>{item.name}</Text>
          <Text>{item.points} points</Text>
        </View>
        <View style={styleRowBetween}>
          <Text style={styleStatus(item.status)}>Status: {item.status}</Text>
          <Text>{item.date}</Text>
        </View>
        <View style={styleLocationInfo}>
          <Text>Place: {item.city}</Text>
          <Switch
            value={intToBool(item.founded)}
            onValueChange={async () => {
              const itemFounded = {
                ...item,
                founded: boolToInt(!intToBool(item.founded)),
              };
              setItem(itemFounded);
              await setItemFounded(itemFounded);
            }}
          />
        </View>
        <Text style={styleCommentTitle}>Comments:</Text>
        <View>{commentsView}</View>
      </ScrollView>
    </View>
  );
};

export default Detail;
