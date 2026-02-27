import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Home from './screens/Home';
import Panic from './screens/Panic';
import Booking from './screens/Booking';
import MapScreen from './screens/MapScreen';

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
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Map" component={MapScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
