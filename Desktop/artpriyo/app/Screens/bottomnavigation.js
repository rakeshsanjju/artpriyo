import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import homeIcon from "../../assets/home.png";  
import connectIcon from "../../assets/connect.png";  
import postUpload from "../../assets/postupload.png";  
import eventIcon from "../../assets/events.png";  
import profile from "../../assets/profile.jpeg";  
import { useRouter } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";


const BottomNavigation = () => {
  const router = useRouter();

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
  };

  
  

  const handleHome = () => {
    router.push("/Screens/home-screen");
  };

  const handleConnect = () => {
    router.push("/Screens/connect");
  };

  const handleEvents = () => {
    router.push("/Screens/events");
  };

  const handleProfile = () => {
    router.push("/Screens/settings");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleHome}>
        <Image source={homeIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleConnect}>
        <Image source={connectIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.postIconBackground}>
          <Image source={postUpload} style={styles.posticon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEvents}>
        <Image source={eventIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfile}>
        <Image source={profile} style={styles.profileicon} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',  // Pin the bottom navigation at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,  // Set the height for the bottom navigation bar
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",  // Optional: Background color for the nav bar
    elevation: 10,  // Optional: Shadow effect for Android
  },
  icon: {
    width: 40,
    height: 40,
  },
  postIconBackground: {
    height: 75,
    width: 75,
    borderRadius: 37.5,
    backgroundColor: "#724EC5",
    position: "relative",
    top: -40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  posticon: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
  profileicon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
