import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export const ListHeader = ({onChange}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="search"
        onChangeText={onChange}
        style={styles.searchBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    flex: 1,
    width: 500,
    height: 100,
  },
  image: {
    flex: 1,
    width: 10,
    height: 10,
  },
  searchBar: {
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 6,
    flex: 1,
    marginTop: 10,
    height: 50,
  },
});
