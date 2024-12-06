import React from "react";
import { TextInput } from "react-native";
import { View, StyleSheet, Image, Text,TouchableOpacity } from "react-native";
import BottomNavigation from "./bottomnavigation";

const Mail = () => {
  return (
    <View style={{ flex: 1 }}>
       <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Change Email</Text>
      </View>
     
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/mail.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Current Email"
            // Add any other props needed
          />
        </View>
      </View>
      <View style={styles.email1}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/mail.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Enter new Email"
            // Add any other props needed
          />
         
        </View>
      </View>
      <View style={styles.email1}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/mail.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Email"
            // Add any other props needed
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
            placeholder="Enter Password"
            // Add any other props needed
          />
        </View>
      </View>
      <View style={styles.container1}>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
     
      
    </View>
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
  email1:{
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
    padding:20,
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

export default Mail;
