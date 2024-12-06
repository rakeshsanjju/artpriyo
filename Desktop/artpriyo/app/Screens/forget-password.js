import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { endpoints } from "../services/api";
import axios from "axios";

const {SENDOTP_API,RESETPASSWORD_API} = endpoints;

export default function Forget() {
  const [otp, setOtp] = useState(false); // Tracks if OTP input is visible
  const [email, setEmail] = useState(''); // Stores email input
  const [buttonText, setButtonText] = useState('Send OTP'); // Button text
  const router = useRouter();

  function showToast(type, message) {
    console.log("Showing Toast:", type, message); // Add this log to check if it's calle
    Toast.show({
      type: type,
      position: "top",
      text1: message,
      visibilityTime: 2000,
    });
  }


  const sendotp = async () => {
    try {
      if (!email) {
        showToast("info", "Please provide an email address.");
        return;
      }
  
      const response = await axios.post(SENDOTP_API, {
        email: email,
      });
  
      if (response.data.success) {
        showToast("success", response.data.message);
      } else {
        showToast("error", response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      if (error.response) {
        showToast("error", error.response.data.message || "An error occurred while sending OTP.");
      } else if (error.request) {
        showToast("error", "Network error. Please try again later.");
      } else {
        showToast("error", error.message || "Something went wrong.");
      }
    }
  };

  

  function otpSent() {
    setOtp(true); // Show OTP input
    setButtonText('Verify'); // Change button text to "Verify"
    if(buttonText === "Verify"){
      router.push("/Screens/reset-password");
    }
  }

  function handleButtonClick() {
    if (buttonText === 'Verify') {
      // Navigate to another screen when "Verify" is clicked
      navigation.navigate('NextScreen'); // Replace 'NextScreen' with the target screen name
    } else {
      otpSent(); // If it's "Send OTP", trigger the OTP sent logic
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.splashImage}
          source={require("../../assets/welocme-pic.png")}
        />
      </View>
      <View>
        <Text style={[styles.textstyle, { fontWeight: "bold" }]}>Forget Password</Text>
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
              onChangeText={(text) => setEmail(text)} // Update email state
            />
          </View>
        </View>

      {otp && ( // Only show OTP input if OTP state is true
        <View style={styles.email}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/lock.png")} // Replace with your OTP icon path
            />
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="numeric" // Set numeric input for OTP
            />
          </View>
        </View>
      )}
     
      
    <View style={styles.container2}>
      <TouchableOpacity style={styles.button2} onPress={otpSent}>
        <Text style={styles.buttonText2}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
      
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: '#297BCE',
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
    marginLeft:10
  },
  input: {
    flex: 1, // Takes up the remaining space
    height: '100%', // Make input fill the height
  },
  password:{
    marginTop:20,
    marginLeft:170,
  },
  text:{
    color:'#297BCE'
  },
  button: {
    backgroundColor: '#297BCE',
    padding: 15,
    borderRadius: 50,
    width:312,
    height:54
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  container1:{
    marginTop:50
  },
  button2: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 50,
    width:312,
    height:54
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  container2:{
    marginTop:50
  }
});
