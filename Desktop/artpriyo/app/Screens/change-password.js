import React, { useState } from "react";
import { TextInput } from "react-native";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import BottomNavigation from "./bottomnavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { endpoints } from "../services/api";
import { router } from "expo-router";

const { CHANGE_PASSWORD } = endpoints;

const Settings = () => {
  const getToken = async () => {
    await AsyncStorage.getItem("token");
  };
  const token = getToken();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const changePassword = async () => {
    try {
      if (oldPassword && newPassword && confirmNewPassword) {
        // Ensure new passwords match
        if (newPassword !== confirmNewPassword) {
          Toast.show({
            type: "info",
            text1: "New password and confirmation do not match.",
            position: "top",
            visibilityTime: 2000,
          });
          return;
        }
  
        // Send the password change request
        const response = await axios.post(
          CHANGE_PASSWORD,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Handle the response
        if (response.data.success) {
          // Reset password fields after success
          Toast.show({
            type: "success",
            text1: response.data.message,
            position: "top",
            visibilityTime: 2000,
          });
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else {
          Toast.show({
            type: "error",
            text1: response.data.message,
            position: "top",
            visibilityTime: 2000,
          });
        }
      } else {
        // Show error if any field is empty
        Toast.show({
          type: "info",
          text1: "Please fill all the fields.",
          position: "top",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      // Handle errors during the request
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || error.message || "An error occurred. Please try again.",
        position: "top",
        visibilityTime: 2000,
      });
    }
  };
  

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Change Password</Text>
        </View>

        <View style={styles.email}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/lock.png")} // Replace with your email icon path
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Current password"
              // Add any other props needed
              value={oldPassword}
              onChangeText={(newPass)=>setOldPassword(newPass)}
            />
          </View>
        </View>

        <View style={styles.email1}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/lock.png")} // Replace with your email icon path
            />
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              // Add any other props needed
              value={newPassword}
              onChangeText={(newPass)=>setNewPassword(newPass)}
            />
          </View>
        </View>
        <View style={styles.email1}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/lock.png")} // Replace with your email icon path
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              // Add any other props needed
              value={confirmNewPassword}
              onChangeText={(newPass)=>setConfirmNewPassword(newPass)}
            />
          </View>
        </View>
        <View style={styles.container1}>
          <TouchableOpacity style={styles.button} onPress={changePassword}>
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
              Update Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast/>
      <BottomNavigation />
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
  button: {
    backgroundColor: "#297BCE",
    padding: 15,
    borderRadius: 50,
    width: 352,
    height: 54,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  container1: {
    marginTop: 40,
  },
  header: {
    position: "absolute", // Position text at the top left
    top: 0,
    left: 20,
  },

  email: {
    marginTop: 50,
  },
  email1: {
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 352,
    height: 34,
    paddingHorizontal: 0, // Padding to align the icon and input nicely
  },
  inputContainers: {
    padding: 20,
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 312,
    height: 154,
    paddingHorizontal: 0, // Padding to align the icon and input nicely
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
