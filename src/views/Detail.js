import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Linking, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import ImageZoom from 'react-native-image-pan-zoom';
import { getComments } from '../repo/db';
import { flex1 } from '../utils/style';

const styleImage = { width: 400, height: 400 };
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
};
const styleTextOpen = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  margin: 10,
  paddingTop: 3,
  paddingBottom: 1,
  paddingRight: 5,
  paddingLeft: 10,
  borderRadius: 30,
  borderWidth: 3,
  backgroundColor: 'white',
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Detail = ({ route, navigation }) => {
  const { item } = route.params;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      const commentsTmp = await getComments(item.id);
      setComments(commentsTmp);
    })();
  }, [item.id]);

  const commentsView = [];
  for (let i = 0; i < comments.length; i += 1) {
    const comment = comments.item(i);
    commentsView.push(
      <View key={comment.id} style={styleCommentView}>
        <Text style={styleCommentText}>
          {comment.author} ({comment.date}):
        </Text>
        <Text>{comment.comment}</Text>
      </View>
    );
  }

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
      <Text
        onPress={() => {
          Linking.openURL(d.item);
        }}
        style={styleTextOpen}
      >
        Open
      </Text>
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
          <Text>{item.name}</Text>
          <Text>{item.points} points</Text>
        </View>
        <View style={styleRowBetween}>
          <Text>{item.status}</Text>
          <Text>{item.date}</Text>
        </View>
        <Text>Place: {item.city}</Text>
        <Text>Comments:</Text>
        <View>{commentsView}</View>
      </ScrollView>
    </View>
  );
};

export default Detail;
