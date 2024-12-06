import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { endpoints } from "../services/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { LOGIN_API } = endpoints;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login button click
  const handleHome = async () => {
    try {
      if (email && password) {
        setLoading(true); // Show loading spinner
        const response = await axios.post(LOGIN_API, {
          email: email,
          password: password,
        });
  
        if (response.data.success) {
          setEmail("");
          setPassword("");
  
          // Show success message
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Login Success",
            visibilityTime: 2000,
          });
  
          // Ensure the token is valid and store it
          const token = response.data.token;
          if (token) {
            AsyncStorage.setItem("token", token);
          } else {
            console.error("Token is missing in the response");
          }
  
          // Navigate to home        
          router.push("/Screens/home-screen");
        } else {
          Toast.show({
            type: "error",
            position: "bottom",
            text1: "Login failed. Please try again.",
            visibilityTime: 2000,
          });
        }
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Please enter both email and password",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      setLoading(false); // Hide loading spinner
  
      if (error.response) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: error.response.data.message || "Login Failed. Please try again.",
          visibilityTime: 3000,
        });
      } else if (error.request) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "No response received from server. Please check your connection.",
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "An error occurred. Please try again later.",
          visibilityTime: 3000,
        });
      }
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };
  

  const navigateHome = () => {
    router.push("/Screens/create-account");
  };

  const handleCreateAccount = () => {
    router.push("/Screens/welcome-screen");
  };

  const handleForgetPassword = () => {
    router.push("/Screens/forget-password");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.splashImage} source={require("../../assets/welocme-pic.png")} />
      </View>
      <View>
        <Text style={[styles.textstyle, { fontWeight: "bold" }]}>Login</Text>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require("../../assets/mail.png")} />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            keyboardType="email-address" // Shows the email keyboard
            autoCapitalize="none" // Prevents capitalization
            textContentType="emailAddress"
            value={email}
            onChangeText={(newEmail) => setEmail(newEmail)} // Corrected onChangeText
          />
        </View>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image style={styles.icon} source={require("../../assets/lock.png")} />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={(newPassword) => setPassword(newPassword)} // Corrected onChangeText
          />
          <Image style={styles.icon} source={require("../../assets/eye.png")} />
        </View>
      </View>
      <View style={styles.password}>
        <TouchableOpacity onPress={handleForgetPassword}>
          <Text style={styles.text}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]} // Disable button when loading
          onPress={handleHome}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" /> // Show spinner when loading
          ) : (
            <Text style={[styles.buttonText, { fontWeight: "bold" }]}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.button2} onPress={handleCreateAccount}>
          <Text style={styles.buttonText2}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 77,
  },
  splashImage: {
    width: 120,
    height: 152,
  },
  textstyle: {
    fontSize: 24,
    paddingTop: 25,
  },
  email: {
    marginTop: 30,
  },
  inputError: {
    borderColor: "red", // Red border for error
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
  password: {
    marginTop: 20,
    marginLeft: 170,
  },
  text: {
    color: "#297BCE",
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
    marginTop: 50,
  },
  button2: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 50,
    width: 312,
    height: 54,
  },
  buttonText2: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  container2: {
    marginTop: 50,
  },
  buttonDisabled: {
    backgroundColor: "#b0b0b0", // Disabled button color
  },
});
