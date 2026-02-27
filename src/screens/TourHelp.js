import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function TourHelp({ navigation }) {
  const [numMembers, setNumMembers] = useState('');
  const [memberNames, setMemberNames] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [place, setPlace] = useState('');
  const [days, setDays] = useState('');
  const [transport, setTransport] = useState(null);
  const [transportOpen, setTransportOpen] = useState(false);
  const [transportItems] = useState([
    { label: 'Bike', value: 'bike' },
    { label: 'Car', value: 'car' },
    { label: 'Bus', value: 'bus' },
    { label: 'Train', value: 'train' },
  ]);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [ticket, setTicket] = useState(null);
  const [healthCertificates, setHealthCertificates] = useState([]);

  const handleMembersChange = (value) => {
    setNumMembers(value);
    const num = parseInt(value) || 0;
    if (num > 0) {
      const newNames = Array(num).fill('').map((_, i) => memberNames[i] || '');
      setMemberNames(newNames);
      const newPhones = Array(num).fill('').map((_, i) => phoneNumbers[i] || '');
      setPhoneNumbers(newPhones);
      const newCerts = Array(num).fill(null).map((_, i) => healthCertificates[i] || null);
      setHealthCertificates(newCerts);
    } else {
      setMemberNames([]);
      setPhoneNumbers([]);
      setHealthCertificates([]);
    }
  };

  const updateMemberName = (index, value) => {
    const updated = [...memberNames];
    updated[index] = value;
    setMemberNames(updated);
  };

  const updatePhoneNumber = (index, value) => {
    const updated = [...phoneNumbers];
    updated[index] = value;
    setPhoneNumbers(updated);
  };

  const pickTicket = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        setTicket(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const pickHealthCertificate = async (index) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        const updated = [...healthCertificates];
        updated[index] = result.assets[0];
        setHealthCertificates(updated);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleSubmit = () => {
    if (!numMembers || !place || !days || !transport || !travelDate) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if ((transport === 'bus' || transport === 'train') && !ticket) {
      Alert.alert('Error', 'Please upload ticket for bus/train');
      return;
    }

    if ((transport === 'bike' || transport === 'car') && (!vehicleNumber || !licenseNumber)) {
      Alert.alert('Error', 'Please provide vehicle and license number');
      return;
    }

    const missingCerts = healthCertificates.some((cert) => !cert);
    if (missingCerts) {
      Alert.alert('Error', 'Please upload health certificates for all members');
      return;
    }

    Alert.alert(
      'Confirm Booking',
      'Are you sure you want to submit these tour details?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            const tourData = {
              numMembers,
              place,
              days,
              transport,
              vehicleNumber,
              licenseNumber,
              travelDate,
            };
            navigation.navigate('Home', { tourData });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4A4A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tour Help</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="people" size={24} color="#4A4A8A" />
              <Text style={styles.cardHeaderText}>Group Details</Text>
            </View>
            
            <Text style={styles.label}>Number of Members *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-add" size={20} color="#4A4A8A" />
              <TextInput
                style={styles.input}
                placeholder="Enter number of members"
                value={numMembers}
                onChangeText={handleMembersChange}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            {phoneNumbers.map((phone, index) => (
              <View key={index}>
                <Text style={styles.label}>Member {index + 1} Name *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person" size={20} color="#4A4A8A" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter member name"
                    value={memberNames[index]}
                    onChangeText={(value) => updateMemberName(index, value)}
                    placeholderTextColor="#999"
                  />
                </View>

                <Text style={styles.label}>Member {index + 1} Phone</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="call" size={20} color="#4A4A8A" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    value={phone}
                    onChangeText={(value) => updatePhoneNumber(index, value)}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                  />
                </View>
                
                <Text style={styles.label}>Member {index + 1} Health Certificate *</Text>
                <TouchableOpacity 
                  style={styles.uploadButton} 
                  onPress={() => pickHealthCertificate(index)}
                >
                  <Ionicons name="document-attach" size={20} color="#4A4A8A" />
                  <Text style={styles.uploadButtonText}>
                    {healthCertificates[index] ? healthCertificates[index].name : 'Upload Certificate'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="map" size={24} color="#4A4A8A" />
              <Text style={styles.cardHeaderText}>Trip Details</Text>
            </View>

            <Text style={styles.label}>Tourist Place *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="location" size={20} color="#4A4A8A" />
              <TextInput
                style={styles.input}
                placeholder="Enter destination place"
                value={place}
                onChangeText={setPlace}
                placeholderTextColor="#999"
              />
            </View>

            <Text style={styles.label}>Number of Days *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar" size={20} color="#4A4A8A" />
              <TextInput
                style={styles.input}
                placeholder="Enter number of days"
                value={days}
                onChangeText={setDays}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>

            <Text style={styles.label}>Date of Travel *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="calendar-outline" size={20} color="#4A4A8A" />
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                value={travelDate}
                onChangeText={setTravelDate}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="car" size={24} color="#4A4A8A" />
              <Text style={styles.cardHeaderText}>Transport Details</Text>
            </View>

            <Text style={styles.label}>Mode of Transport *</Text>
            <DropDownPicker
              open={transportOpen}
              value={transport}
              items={transportItems}
              setOpen={setTransportOpen}
              setValue={setTransport}
              placeholder="Select transport mode"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
            />

            {(transport === 'bus' || transport === 'train') && (
              <>
                <Text style={styles.label}>Upload Ticket *</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={pickTicket}>
                  <Ionicons name="ticket" size={20} color="#4A4A8A" />
                  <Text style={styles.uploadButtonText}>
                    {ticket ? ticket.name : 'Upload Ticket'}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {(transport === 'bike' || transport === 'car') && (
              <>
                <Text style={styles.label}>Vehicle Number *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="car-sport" size={20} color="#4A4A8A" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter vehicle number"
                    value={vehicleNumber}
                    onChangeText={setVehicleNumber}
                    autoCapitalize="characters"
                    placeholderTextColor="#999"
                  />
                </View>

                <Text style={styles.label}>License Number *</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="card" size={20} color="#4A4A8A" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter license number"
                    value={licenseNumber}
                    onChangeText={setLicenseNumber}
                    autoCapitalize="characters"
                    placeholderTextColor="#999"
                  />
                </View>
              </>
            )}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="checkmark-circle" size={24} color="#FFF" />
            <Text style={styles.submitButtonText}>Submit Tour Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FF',
  },
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
  backButton: { padding: 8 },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A8A',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: { width: 40 },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#E6E6FF',
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A8A',
    marginLeft: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A4A8A',
    marginTop: 12,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#4A4A8A',
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    borderRadius: 12,
    minHeight: 50,
  },
  dropdownContainer: {
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderRadius: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#4A4A8A',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 8,
  },
  uploadButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A8A',
    marginLeft: 10,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#4A4A8A',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
