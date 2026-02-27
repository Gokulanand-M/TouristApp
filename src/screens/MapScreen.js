import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';

const GOOGLE_MAPS_APIKEY = 'YOUR_API_KEY_HERE';

export default function MapScreen() {
  const [origin, setOrigin] = useState(null);

  // example fixed destination
  const destination = {
    latitude: 37.7749,
    longitude: -122.4194,
  };

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setOrigin({ latitude, longitude });
    });
  }, []);

  if (!origin) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...origin,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        <Marker coordinate={origin} title="You" />
        <Marker coordinate={destination} title="Destination" />

        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="blue"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});