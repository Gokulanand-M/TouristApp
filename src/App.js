import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Home from './screens/Home';
import Panic from './screens/Panic';
import MapScreen from './screens/MapScreen';
import TourHelp from './screens/TourHelp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Panic" component={Panic} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="TourHelp" component={TourHelp} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
