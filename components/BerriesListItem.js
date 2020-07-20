import React, {useEffect, useState} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';

import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import {fetchPokemonDetails} from '../apiService';

const AbortController = window.AbortController;

export const BerriesListItem = ({name, url, index, isRefreshing}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      setIsLoading(true);

      const response = await fetchPokemonDetails(url, signal);
      const imageResponse = await fetchPokemonDetails(
        response.item.url,
        signal,
      );

      setImage(imageResponse);
      setIsLoading(false);

      return () => controller.abort();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive = !isLoading && image != null;

  const renderDetails = () => {
    if (!isActive) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <>
        <Image
          source={{
            uri: image.sprites.default,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => Alert.alert(`Try this ${name.toUpperCase()} berry.`)}
      disabled={!isActive}
      key={index}
      style={[
        styles.itemContainer,
        isRefreshing && styles.disableItemContainer,
      ]}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: '300',
    textTransform: 'capitalize',
  },
  itemContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  disableItemContainer: {
    backgroundColor: '#eee',
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 15,
  },
  textContainer: {
    position: 'absolute',
    left: 110,
    top: 20,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 20,
  },
});
