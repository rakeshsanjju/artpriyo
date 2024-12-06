import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Forget() {
  const router = useRouter();

  const handleHome = () =>{
    router.push("/Screens/home-screen")
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
        <Text style={[styles.textstyle, { fontWeight: "bold" }]}>Reset Password</Text>
      </View>
      
      <View style={styles.email}>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/lock.png")} // Replace with your email icon path
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
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
            // Add any other props needed
          />
           <Image
            style={styles.icon}
            source={require("../../assets/eye.png")} // Replace with your email icon path
          />
        </View>
      </View>
     
      
    <View style={styles.container2}>
      <TouchableOpacity style={styles.button2} onPress={handleHome}>
        <Text style={styles.buttonText2}>Continue</Text>
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
