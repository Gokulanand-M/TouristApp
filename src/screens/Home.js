import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({ navigation }) {
    
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

      <View style={styles.bottombar}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Booking')}
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
  icon :{
    fontSize: 33,
  },
  topBar: {
     position: 'absolute',
     backgroundColor: '#D3D3FF',
     left: 0,
     right: 0,
     height: 80,
     top: 0 ,
     justifyContent: 'space-around',
     alignItems: 'center',
     flexDirection: 'row',
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

