import { Image, StyleSheet, Text, View } from "react-native";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image 
      style={styles.splashImage}
      source={require('../../assets/splash.png')} />
      
     

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:'center',
    backgroundColor:'#297BCE'
  },
  splashImage:{
    width: 368,
    height: 409,
  }
  
});
