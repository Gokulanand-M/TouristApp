import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation, route }) {
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    if (route.params?.tourData) {
      setTourDetails(route.params.tourData);
    }
  }, [route.params?.tourData]);
    
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Ionicons
            style={styles.icon}
            name="reorder-three"
            size={26}
            color="#4A4A8A"
            
        >

        </Ionicons>
        <Text style={styles.texts}>GoBuddy</Text>
        <Ionicons
            style={styles.icon}
            name="person-circle"
            size={26}
            color="#4A4A8A"
          />
        
        
      </View>

      {tourDetails && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.tourCard}>
            <View style={styles.tourHeader}>
              <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
              <Text style={styles.tourHeaderText}>Tour Booked!</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="people" size={20} color="#4A4A8A" />
              <Text style={styles.detailLabel}>Members:</Text>
              <Text style={styles.detailValue}>{tourDetails.numMembers}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="location" size={20} color="#4A4A8A" />
              <Text style={styles.detailLabel}>Place:</Text>
              <Text style={styles.detailValue}>{tourDetails.place}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={20} color="#4A4A8A" />
              <Text style={styles.detailLabel}>Days:</Text>
              <Text style={styles.detailValue}>{tourDetails.days}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="car" size={20} color="#4A4A8A" />
              <Text style={styles.detailLabel}>Transport:</Text>
              <Text style={styles.detailValue}>{tourDetails.transport}</Text>
            </View>

            {tourDetails.vehicleNumber && (
              <View style={styles.detailRow}>
                <Ionicons name="car-sport" size={20} color="#4A4A8A" />
                <Text style={styles.detailLabel}>Vehicle:</Text>
                <Text style={styles.detailValue}>{tourDetails.vehicleNumber}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      <View style={styles.bottombar}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TourHelp')}
          activeOpacity={0.7}
        >
          <Ionicons
            name="book"
            size={26}
            color="#4A4A8A"
          />
          <Text style={styles.text}>Book</Text>
        </TouchableOpacity>
          <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Map')}
          activeOpacity={0.7}
        >
          <Ionicons
            name="compass"
            size={26}
            color="#4A4A8A"
          />
          <Text style={styles.text}>Map</Text>
        </TouchableOpacity>


        
        <TouchableOpacity
          style={styles.button}   
          activeOpacity={0.7}
        >
          <Image
            source={require('../../assets/sos.png')}
            style={styles.iconImage}
            
          />
          
        </TouchableOpacity>
         <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Emergency')}
          activeOpacity={0.7}
        >
          <Ionicons
            name="browsers"
            size={26}
            color="#4A4A8A"
          />
          <Text style={styles.text}>Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
         style={styles.button}
         activeOpacity={0.7}
        >
        <Ionicons
          name="location"
          size={26}
          color="#4A4A8A"
        />
        <Text style={styles.text}>Track</Text>
        </TouchableOpacity> 
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FF',
  },
  icon: {
    fontSize: 33,
  },
  topBar: {
    position: 'absolute',
    backgroundColor: '#D3D3FF',
    left: 0,
    right: 0,
    height: 80,
    top: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 10,
  },
  content: {
    flex: 1,
    marginTop: 90,
    marginBottom: 90,
    paddingHorizontal: 16,
  },
  tourCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tourHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#E6E6FF',
  },
  tourHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A4A8A',
    marginLeft: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A8A',
  },
  bottombar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#D3D3FF',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    elevation: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }, // ✅ CLOSE HERE


  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  iconImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    backgroundColor: '#4A4A8A',
    borderRadius: 50,
    bottom:30
  },

  text: {
    color: '#4A4A8A',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  texts: {
    color: '#4A4A8A',
    fontSize: 30,
    fontWeight: 'bold',
  }
});

