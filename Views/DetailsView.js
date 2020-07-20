import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import AnimatedBar from '../components/AnimatedBar';
import {setBackground} from '../setBackground';
import {firstLetterUpperCase} from '../upperCaseFirstLetter';

const DetailsView = ({route}) => {
  const {name} = route.params;
  const [detailsSource, setDetailsSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,
  );

  if (!detailsSource) return <ActivityIndicator />;
  const backGround = setBackground(detailsSource.types[0].type.name);

  return (
    <View style={[styles.container, {backgroundColor: backGround}]}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          paddingBottom: 10,
        }}>
        {firstLetterUpperCase(name)}
      </Text>
      <Image
        source={{
          uri: detailsSource.sprites.front_default,
        }}
        style={styles.imageSize}
      />

      {detailsSource.stats.map((item, index) => {
        return (
          <View key={index} style={styles.statsContainer}>
            <Text style={styles.statsText}>{`${firstLetterUpperCase(
              item.stat.name,
            )}: ${item.base_stat}`}</Text>
            <View style={styles.barsContainer}>
              <AnimatedBar value={item.base_stat} index={index} />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSize: {
    width: 200,
    height: 200,
  },
  statsContainer: {
    alignItems: 'center',
    width: 300,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 6,
    paddingBottom: 5,
    marginTop: 10,
  },
  statsText: {
    fontSize: 15,
  },
  barsContainer: {
    position: 'absolute',
    left: 190,
  },
});

export default DetailsView;
