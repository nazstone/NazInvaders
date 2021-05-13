import React, { useEffect, useState } from 'react';
import { Image, FlatList, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getPref, getItemCount, getItemPaginate } from '../repo/db';
import { text } from '../utils/font';
import { flex1 } from '../utils/style';
import ItemInvader from './ItemInvader';
import { onPressSelectCity } from './utils';

const LIMIT_SEARCH = 50;

const styleTitleButton = {
  flexDirection: 'row',
  backgroundColor: 'lightgray',
  margin: 10,
  borderWidth: 2,
  borderRadius: 10,
  borderStyle: 'dashed',
};

const List = ({ navigation }) => {
  const dispatch = useDispatch();
  const prefConf = useSelector((state) => state.pref);

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(LIMIT_SEARCH);
  const [offset, setOffset] = useState(0);
  const [cityName, setCityName] = useState('');
  const [items, setItems] = useState([]);

  const resetData = async () => {
    setCount(0);
    setItems([]);
    setOffset(0);
    setLimit(LIMIT_SEARCH);

    const pref = await getPref();
    let city = null;
    if (pref && pref.length) {
      setCityName(pref.item(0).city);
      city = pref.item(0).city;
    }
    getItemCount({ city }, setCount);
  };

  const paginate = () => {
    getItemPaginate({ city: cityName }, { limit, offset }, (res) => {
      const arr = offset ? items : [];
      for (let i = 0; i < res.length; i += 1) {
        arr.push(res.item(i));
      }
      setItems(arr);
    });
  };

  useEffect(() => {
    resetData();
  }, [prefConf]);

  useEffect(() => {
    paginate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, cityName]);

  const renderItem = ({ item }) => {
    return <ItemInvader key={item.id} item={item} navigation={navigation} />;
  };

  const safeAreaViewStyle = {
    ...flex1,
  };

  const whereTextStyle = {
    ...text,
    padding: 15,
    flex: 1,
  };

  const loadNext = () => {
    // avoid fetch data over the count
    if (count > offset + limit) {
      setOffset(offset + limit);
    }
  };

  return (
    <SafeAreaView style={safeAreaViewStyle}>
      {!!cityName && (
        <View style={styleTitleButton}>
          <Text style={whereTextStyle}>
            {cityName || 'Around the world'} ({count})
          </Text>

          <Image
            resizeMode="center"
            onTouchEnd={onPressSelectCity(null, {}, dispatch)}
            source={require('../../assets/img/close.png')}
          />
        </View>
      )}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={loadNext}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default List;
