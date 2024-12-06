import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { endpoints } from "../services/api";
import axios from "axios";

const { SIGNUP_API } = endpoints;

export default function CreateAccount() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function showToast(type, message) {
    console.log("Showing Toast:", type, message); // Add this log to check if it's calle
    Toast.show({
      type: type,
      position: "top",
      text1: message,
      visibilityTime: 2000,
    });
  }

  const handleCreateAccount = async () => {
    try {
      // Check if all fields are filled
      if (
        !firstName ||
        !lastName ||
        !userName ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        showToast("info", "Please fill all the fields"); // Informational message
        return; 
      }
  
      // Check if password and confirmPassword match
      if (password !== confirmPassword) {
        showToast("error", "Password and confirm password are not matching");
        return;
      }
  
      // Send signup request to the backend
      const response = await axios.post(SIGNUP_API, {
        firstName,
        lastName,
        userName,
        accountType: "User",
        email,
        password,
      });
  
      if (response.data.success) {
        // Show success toast and clear the form fields
        showToast("success", response.data.message); 
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
  
        // Delay navigation to login page after showing success toast
        setTimeout(() => {
          router.push("/Screens/login");
        }, 2000); // Delay to let the toast display for 2 seconds
      } else {
        // Show error toast based on response from backend
        showToast("error", response.data.message);
      }
    } catch (error) {
      // Handle errors during the signup request
      if (error.response) {
        showToast("error", error.response.data.message || "Something went wrong");
      } else {
        showToast("error", error.message || "Something went wrong");
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.splashImage}
          source={require("../../assets/welocme-pic.png")}
        />
      </View>
      <View>
        <Text style={[styles.textstyle, { fontWeight: "bold" }]}>
          Create Account
        </Text>
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
            onChangeText={(value) => setFirstName(value)}
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
            onChangeText={(value) => setLastName(value)}
            // Add any other props needed
          />
        </View>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/at-sign.png")} 
          />
          <TextInput
            style={styles.input}
            placeholder="Enter User Name"
            value={userName}
            onChangeText={(value) => {
              setUserName(value)
            }}
          />
        </View>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/mail.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            // Add any other props needed
          />
        </View>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/lock.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            // Add any other props needed
          />
          <Image
            style={styles.icon}
            source={require("../../assets/eye.png")} // Replace with your email icon path
          />
        </View>
      </View>
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/lock.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            // Add any other props needed
          />
          <Image
            style={styles.icon}
            source={require("../../assets/eye.png")} // Replace with your email icon path
          />
        </View>
      </View>

      <View style={styles.container1}>
        <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
          <Text style={[styles.buttonText, { fontWeight: "bold" }]}>
            Create Account
          </Text>
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
    paddingTop: 27,
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
    marginTop: 20,
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
    marginTop: 30,
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
});
