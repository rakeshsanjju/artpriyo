import React, { useState } from "react";
import { TextInput } from "react-native";
import { View, StyleSheet, Image, Text,TouchableOpacity } from "react-native";
import BottomNavigation from "./bottomnavigation";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoints } from "../services/api";
import Toast from "react-native-toast-message";
import axios from "axios";

const { SINGLE_USER_API,UPDATE_USER_API } = endpoints;


const Settings = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState(""); 

  const router = useRouter();

  const getToken = async () => {
    await AsyncStorage.getItem("token");
  };
  const token = getToken();

  const handleUpdateUser = async () => {
    try {
      // Create an object to hold only the updated fields
      const updatedFields = {};
  
      // Add fields to the object only if they are not empty
      if (firstName) updatedFields.firstName = firstName;
      if (lastName) updatedFields.lastName = lastName;
      if (userName) updatedFields.userName = userName;
      if (description) updatedFields.description = description;
  
      // Check if any fields were updated
      if (Object.keys(updatedFields).length > 0) {
        const response = await axios.put(
          UPDATE_USER_API,
          updatedFields, // Send only the updated fields
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );
  
        console.log("Response :--->", response.data);
  
        // Handle the response after the update
        if (response.data.success) {
          // Clear the fields after a successful update
          setFirstName("");
          setLastName("");
          setUserName("");
          setDescription("");
  
          // Show success message
          Toast.show({
            type: "success",
            text1: response.data.message,
            position: "top",
            visibilityTime: 2000,
          });
  
          // Navigate to settings screen
          router.push("/Screens/settings");
        } else {
          // Show error message if update failed
          Toast.show({
            type: "info",
            text1: response.data.message,
            position: "top",
            visibilityTime: 2000,
          });
        }
      } else {
        // Show message if no fields were updated
        Toast.show({
          type: "info",
          text1: "Please update at least one field",
          position: "top",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      // Show error message if there's a server error
      Toast.show({
        type: "error",
        text1: `Server Error: ${error.message}`,
        position: "top",
        visibilityTime: 2000,
      });
    }
  };
  

  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Edit Profile</Text>
      </View>
      <View style={styles.box}>
        <Image
          style={styles.drawing}
          source={require("../../assets/small.png")} // Replace with your email icon path
        />
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/user.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Enter First Name"
            value={firstName}
            onChangeText={(newName)=>setFirstName(newName)}
            // Add any other props needed
          />
        </View>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/user.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Last Name"
            value={lastName}
            onChangeText={(newName)=>setLastName(newName)}
            // Add any other props needed
          />
         
        </View>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/at-sign.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Enter User Name"
            value={userName}
            onChangeText={(newName)=>setUserName(newName)}
            // Add any other props needed
          />
        </View>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainers}>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Description"
            value={description}
            onChangeText={(newName)=>setDescription(newName)}
            // Add any other props needed
          />
        </View>
      </View>
      <View style={styles.container1}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateUser}>
          <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
           Update Details
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
    <Toast/>
    <BottomNavigation/>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Center image horizontally
    // Center image vertically
    marginTop: 10,
  },
  header: {
    position: "absolute", // Position text at the top left
    top: 0,
    left: 20,
  },
  button: {
    backgroundColor: "#297BCE",
    padding: 15,
    borderRadius: 50,
    width: 312,
    height: 54,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  container1: {
    marginTop: 30,
  },
  email: {
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 312,
    height: 54,
    paddingHorizontal: 10, // Padding to align the icon and input nicely
  },
  inputContainers: {
    padding:20,
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 312,
    height: 154,
    paddingHorizontal: 10, // Padding to align the icon and input nicely
  },
  icon: {
    width: 20, // Set icon width
    height: 20, // Set icon height
    marginRight: 10, // Space between icon and input
    marginLeft: 10,
  },
  input: {
    flex: 1, // Takes up the remaining space
    height: "100%", // Make input fill the height
  },
  text: {
    fontSize: 20, // Adjust font size as needed
  },
  box: {
    height: 120,
    width: 120,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  drawing: {
    height: 80,
    width: 80,
  },
});

export default Settings;
