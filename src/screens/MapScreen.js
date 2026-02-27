import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MapScreen({ navigation }) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [destinationInput, setDestinationInput] = useState('');
  const [showLocationCard, setShowLocationCard] = useState(false);
  const [showDestinationCard, setShowDestinationCard] = useState(false);
  const mapRef = React.useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setOrigin({ latitude, longitude });
  };

  const setCurrentLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    setOrigin({ latitude, longitude });
    setShowLocationCard(false);
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const searchDestination = async () => {
    if (!destinationInput.trim()) return;

    try {
      const results = await Location.geocodeAsync(destinationInput);
      if (results.length > 0) {
        const dest = { latitude: results[0].latitude, longitude: results[0].longitude };
        setDestination(dest);
        setShowDestinationCard(false);
        
        if (origin) {
          const mockRoute = [
            origin,
            { latitude: origin.latitude + (dest.latitude - origin.latitude) * 0.33, longitude: origin.longitude + (dest.longitude - origin.longitude) * 0.33 },
            { latitude: origin.latitude + (dest.latitude - origin.latitude) * 0.66, longitude: origin.longitude + (dest.longitude - origin.longitude) * 0.66 },
            dest
          ];
          setRouteCoords(mockRoute);
          
          if (mapRef.current) {
            mapRef.current.fitToCoordinates([origin, dest], {
              edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
              animated: true,
            });
          }
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  if (!origin) return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#4A4A8A" />
      <Text style={styles.loadingText}>Loading Map...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#4A4A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Route Map</Text>
        <View style={styles.placeholder} />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={origin ? {
          ...origin,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : undefined}
        showsUserLocation
        showsMyLocationButton={false}
      >
        {origin && <Marker coordinate={origin} title="Your Location" pinColor="blue" />}
        {destination && <Marker coordinate={destination} title="Destination" pinColor="red" />}
        
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={5}
            strokeColor="#4285F4"
          />
        )}
      </MapView>

      <View style={styles.floatingButtons}>
        <TouchableOpacity 
          style={styles.floatingButton} 
          onPress={() => setShowLocationCard(!showLocationCard)}
        >
          <Ionicons name="location" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.floatingButton} 
          onPress={() => setShowDestinationCard(!showDestinationCard)}
        >
          <Ionicons name="navigate" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {showLocationCard && (
        <View style={styles.actionCard}>
          <Text style={styles.cardTitle}>Set Current Location</Text>
          <Text style={styles.cardSubtitle}>
            {origin ? `${origin.latitude.toFixed(4)}, ${origin.longitude.toFixed(4)}` : 'Not set'}
          </Text>
          <TouchableOpacity style={styles.actionButton} onPress={setCurrentLocation}>
            <Ionicons name="locate" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Use Current Location</Text>
          </TouchableOpacity>
        </View>
      )}

      {showDestinationCard && (
        <View style={styles.actionCard}>
          <Text style={styles.cardTitle}>Set Destination</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="search" size={20} color="#4A4A8A" />
            <TextInput
              style={styles.input}
              placeholder="Enter destination"
              value={destinationInput}
              onChangeText={setDestinationInput}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={styles.actionButton} onPress={searchDestination}>
            <Ionicons name="navigate" size={20} color="#FFF" />
            <Text style={styles.actionButtonText}>Find Route</Text>
          </TouchableOpacity>
        </View>
      )}

      {destination && origin && (
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color="#4A4A8A" />
            <Text style={styles.infoText}>Route Ready</Text>
          </View>
          <TouchableOpacity style={styles.navigateButton}>
            <Ionicons name="navigate" size={20} color="#FFF" />
            <Text style={styles.navigateText}>Start Navigation</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6E6FF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D3D3FF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconButton: { padding: 8 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#4A4A8A', flex: 1, textAlign: 'center' },
  placeholder: { width: 40 },
  map: { flex: 1, margin: 12, borderRadius: 20, overflow: 'hidden' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E6E6FF' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#4A4A8A' },
  floatingButtons: {
    position: 'absolute',
    right: 20,
    top: 120,
    gap: 12,
  },
  floatingButton: {
    backgroundColor: '#4A4A8A',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 12,
  },
  actionCard: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 90,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#4A4A8A', marginBottom: 8 },
  cardSubtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  input: { marginLeft: 10, fontSize: 16, color: '#4A4A8A', flex: 1 },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#4A4A8A',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  infoCard: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  infoText: { marginLeft: 10, fontSize: 18, color: '#4A4A8A', fontWeight: '600' },
  navigateButton: {
    flexDirection: 'row',
    backgroundColor: '#4A4A8A',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateText: { color: '#FFF', fontSize: 17, fontWeight: 'bold', marginLeft: 10 },
});
