import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import BottomNavigation from "./bottomnavigation";
import { useRouter } from "expo-router";
import { endpoints } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { SINGLE_USER_API } = endpoints;

const Settings = () => {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // For loading state


  const getToken = async () => {
   await AsyncStorage.getItem("token");   
  };  
  const getUserData = async () => {
    try {
      const token = getToken(); // Wait for the token to be fetched
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.get(SINGLE_USER_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("User Data :--->", response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log("Error fetching user data :-->", error.message);
      setUser({});
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  useEffect(() => {
    getUserData()
  }, []);

  const handleLogout = async () => {
    try { 
      // Remove the token from AsyncStorage
      await AsyncStorage.removeItem("token");
      router.push("/Screens/login")
      // Optionally check if the token was removed by trying to retrieve it
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token does not exist anymore");
      } else {
        console.log("Token exists:", token);
      }
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {
     loading ? (
      <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
     ) : ( user !== null ? (
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            style={styles.drawing}
            source={{uri:"https://cdn-icons-png.flaticon.com/512/9689/9689593.png"}}
            resizeMode="contain"
          />
        </View>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text
            style={{ fontFamily: "Roboto", fontWeight: 600, fontSize: 24 }}
          >
            {user.firstName} {user.lastName}
          </Text>
          <Text
            style={{ fontFamily: "Roboto", fontWeight: 600, fontSize: 14 }}
          >
            {user.userName}
          </Text>
        </View>
        <View
          style={{
            height: 1,
            width: "98%",
            backgroundColor: "#EEEBF5",
            marginTop: 25,
          }}
        />

        {/* View Profile - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/edit-profile")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/eye.png")} // Replace with your icon path
          />
          <Text style={styles.text}>View Profile</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        {/* Edit Profile - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/edit-profile")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Edits.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Edit Profile</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        {/* Saved - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/saved")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Bookmarks.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Saved</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        {/* Posts - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/saved")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/PhotoGallery.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Posts</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        {/* Overview - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/overview")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/CaseStudy.png")} // Replace with your icon path
          />
          <Text style={styles.text}>OverView</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        {/* Transaction History - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/transaction-history")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Wallet.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Transaction History</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        {/* Wallet - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/wallet")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Time Machine.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Wallet</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 1,
            width: "98%",
            backgroundColor: "#EEEBF5",
            marginTop: 25,
          }}
        />

        {/* Settings - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/internal-settings")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Settings.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Settings</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        {/* Terms and Conditions - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          onPress={() => handleNavigation("/Screens/Terms")}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Terms and Conditions.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Terms and Conditions</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            height: 1,
            width: "98%",
            backgroundColor: "#EEEBF5",
            marginTop: 25,
          }}
        />

        {/* Logout - Touchable */}
        <TouchableOpacity
          style={styles.profile}
          // onPress={() => handleNavigation("/Screens/login")}
          onPress={handleLogout}
        >
          <Image
            style={styles.icon}
            source={require("../../assets/Export.png")} // Replace with your icon path
          />
          <Text style={styles.text}>Logout</Text>
          <View>
            <Image
              style={styles.icon}
              source={require("../../assets/CaretRight.png")} // Replace with your icon path
            />
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <TextInput>User is not present</TextInput>
      </View>
    ))
      }
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    marginTop: 20,
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    flex: 1,
    marginLeft: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  box: {
    height: 100,
    width: 100,
    // backgroundColor: "lightblue",
    borderRadius: 50,
    justifyContent: 'center', // Ensure image is centered in the box
    alignItems: 'center', // Align the image to the center of the box
  },
  drawing: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export default Settings;
