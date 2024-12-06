import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import BottomNavigation from "./bottomnavigation";
import { useRouter } from "expo-router";

const Internal = () => {
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.texts}>Settings</Text>
        </View>

        {/* Change Email - Touchable */}
        <TouchableOpacity style={styles.profile} onPress={() => handleNavigation("/Screens/change-email")}>
          <Image
            style={styles.icon}
            source={require("../../assets/mail.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Change Email</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        {/* Change Password - Touchable */}
        <TouchableOpacity style={styles.profile} onPress={() => handleNavigation("/Screens/change-password")}>
          <Image
            style={styles.icon}
            source={require("../../assets/lock.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Change Password</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Center horizontally
    marginTop: 10,
  },
  header: {
    position: "absolute", // Position text at the top left
    top: 0,
    left: 20,
    marginBottom: 50,
  },
  texts: {
    fontSize: 20,
    marginBottom: 30,
  },
  profile: {
    marginTop: 30,
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center", // Center items vertically
    justifyContent: "space-between", // Apply space between
  },
  text: {
    flex: 1, // Allow the text to take available space
    marginLeft: 20, // Optional: space between icon and text
  },
  icon: {
    width: 24, // Adjust size as needed
    height: 24, // Adjust size as needed
  },
});

export default Internal;
