import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {fetchPokemonDetails} from '../apiService';
import {firstLetterUpperCase} from '../upperCaseFirstLetter';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
const AbortController = window.AbortController;

export const ListItem = ({item, index, isRefreshing, navigation}) => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${item.name}`,
  );

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      setIsLoading(true);
      const pokeDetails = await AsyncStorage.getItem(
        `@pokeDex_details_${item.name}`,
      );
      if (pokeDetails == null) {
        const response = await fetchPokemonDetails(item.url, signal);
        setDetailsSource(response);
      }
      setDetails(detailsSource);
      setIsLoading(false);

      return () => controller.abort();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsSource]);

  const isActive = !isLoading && details != null;

  const renderDetails = () => {
    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }
    return (
      <>
        <Image
          source={{uri: details.sprites.front_default}}
          style={styles.imageSize}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textName}>{firstLetterUpperCase(item.name)}</Text>
          <Text style={styles.textIndex}>#{details.id}</Text>
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {name: item.name})}
      key={index}
      disabled={!isActive}
      style={[
        styles.itemContainer,
        isRefreshing && styles.disableItemContainer,
      ]}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textName: {
    fontSize: 20,
    fontWeight: '100',
    color: '#4F4F4F',
  },
  textIndex: {
    fontSize: 15,
    fontWeight: '100',
    color: '#A4A4A4',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  itemContainer: {
    padding: 8,
    flexDirection: 'row',
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
  },
  imageSize: {
    width: 100,
    height: 100,
  },
});
