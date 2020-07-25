import 'react-native-gesture-handler';
import * as React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeView from './Views/HomeView';
import DetailsView from './Views/DetailsView';
import BerriesView from './Views/BerriesView';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeView} />
    <Stack.Screen name="Details" component={DetailsView} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let imageUrl;
            if (route.name === 'Home') {
              focused
                ? (imageUrl = require('./images/homeActive.png'))
                : (imageUrl = require('./images/homeInactive.png'));
            } else {
              focused
                ? (imageUrl = require('./images/berriesActive.png'))
                : (imageUrl = require('./images/berriesInactive.png'));
            }
            return <Image source={imageUrl} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Berries" component={BerriesView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
