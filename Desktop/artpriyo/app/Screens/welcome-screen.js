import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {
  const router = useRouter();
  const handleLogin = ()=>{
    router.push("/Screens/create-account")
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.splashImage}
          source={require("../../assets/welocme-pic.png")}
        />
      </View>
      <View style={styles.name}>
        <View></View>
        <Text style={[styles.textstyle, { fontWeight: "bold" }]}>Art</Text>
        <Text style={[styles.textstyle1, { fontWeight: "bold" }]}>priyo</Text>
      </View>
      <View style={styles.textView}>
        <Image
          style={styles.textImage}
          source={require("../../assets/welcome-text.png")}
        />
        <Image
          style={styles.textImage1}
          source={require("../../assets/price.png")}
        />
      </View>
      <View style={styles.condition}>
      <Switch
        value={isChecked}
        onValueChange={handleToggle}
      />
        <Text style={styles.text}>I agree to the terms & conditions and Privacy Policy </Text>
      </View>
      <View style={styles.container1}>
      <TouchableOpacity 
        style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]} 
        onPress={handleLogin} 
        disabled={!isChecked} // Disable button if not checked
      >
        <Text style={styles.buttonText}>Get Started</Text>
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
  name: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  textstyle: {
    color: "black",
    fontSize: 40,
    fontFamily: "Roboto",
  },
  textImage: {
    width: 206,
    height: 184,
  },
  textImage1: {
    width: 131,
    height: 140,
    marginTop: 40,
  },
  textstyle1: {
    color: "#297BCE",
    fontSize: 40,
    fontFamily: "Roboto",
  },
  textView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
  },
  condition:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:30
  },
  text:{
    marginTop:10
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
  }
  
});
