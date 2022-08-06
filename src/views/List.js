import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getPref, getItemCount, getItemPaginate } from '../repo/db';
import { text } from '../utils/font';
import { borderColor, flex1 } from '../utils/style';
import ItemInvader from './ItemInvader';
import { onPressSelectCity } from './utils';

import Text from './components/Text';

const LIMIT_SEARCH = 50;

const styleAboutView = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 40,
  height: 40,
};

const styleAboutText = {
  width: 40,
  height: 40,
  fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center',
  textAlignVertical: 'center',
  color: 'white',
};

const styleTitleButton = {
  flexDirection: 'row',
  backgroundColor: 'gray',
  margin: 10,
  borderWidth: 2,
  borderRadius: 10,
  borderStyle: 'dashed',
  borderColor,
};

const safeAreaViewStyle = {
  ...flex1,
};

const whereTextStyle = {
  ...text,
  padding: 15,
  flex: 1,
};

const List = ({ navigation }) => {
  const dispatch = useDispatch();
  const prefConf = useSelector((state) => state.pref);

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(LIMIT_SEARCH);
  const [offset, setOffset] = useState(0);
  const [cityName, setCityName] = useState('');
  const [items, setItems] = useState([]);
  const [lastSelected, setLastSelected] = useState(null);

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
      mapItemsWithLastSelected(arr, lastSelected);
    });
  };

  useEffect(() => {
    resetData();
  }, [prefConf]);

  useEffect(() => {
    paginate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, cityName]);

  const mapItemsWithLastSelected = (itemsTmp, lastSelectedTmp) => {
    setItems(
      itemsTmp.map((e) => {
        if (
          parseInt(e.id, 10) ===
          parseInt((lastSelectedTmp && lastSelectedTmp.id) || 0, 10)
        ) {
          return { ...e, lastSelected: true };
        }
        return { ...e, lastSelected: false };
      })
    );
  };

  const renderItem = ({ item }) => {
    return (
      <ItemInvader
        key={item.id}
        item={item}
        navigation={navigation}
        lastSelected={(itemSelected) => {
          setLastSelected(itemSelected);
          // change items with last selected
          mapItemsWithLastSelected(items, itemSelected);
        }}
      />
    );
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
      <View style={styleAboutView}>
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Text style={styleAboutText}>?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default List;
