import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "./bottomnavigation";


export default function TransactionHistory() {
  return (
    <View style={{ flex: 1 }}>
        <View style={styles.container}>
      <View style={styles.mainText}>
        <Text style={[styles.text, { fontWeight: "bold" }]}>
          Transaction History
        </Text>
      </View>
      
      <View style={styles.posts}>
        <View style={styles.post}>
        <Image
            style={styles.splashImage}
            source={require("../../assets/small.png")}
          />
          <View style={styles.mainTexts}>
            <Text style={[styles.texts, { fontWeight: "bold" }]}>
              Drawing
            </Text>
            <Text style={styles.user}>Yesterday at 16.44</Text>
          </View>
        </View>
        <View style={styles.time}>
           
         <Text style={styles.textSize}>-₹15</Text>
        </View>
        
      </View>
      <View style={styles.posts}>
        <View style={styles.post}>
        <Image
            style={styles.splashImage}
            source={require("../../assets/small.png")}
          />
          <View style={styles.mainTexts}>
            <Text style={[styles.texts, { fontWeight: "bold" }]}>
              Drawing
            </Text>
            <Text style={styles.user}>Yesterday at 16.44</Text>
          </View>
        </View>
        <View style={styles.time}>
           
         <Text style={styles.textSize}>-₹1000</Text>
        </View>
        
      </View>
      <View style={styles.posts}>
        <View style={styles.post}>
        <Image
            style={styles.splashImage}
            source={require("../../assets/small.png")}
          />
          <View style={styles.mainTexts}>
            <Text style={[styles.texts, { fontWeight: "bold" }]}>
              Drawing
            </Text>
            <Text style={styles.user}>Yesterday at 16.44</Text>
          </View>
        </View>
        <View style={styles.time}>
           
         <Text style={styles.textSize}>-₹145</Text>
        </View>
        
      </View>
      <View style={styles.posts}>
        <View style={styles.post}>
        <Image
            style={styles.splashImage}
            source={require("../../assets/small.png")}
          />
          <View style={styles.mainTexts}>
            <Text style={[styles.texts, { fontWeight: "bold" }]}>
              Drawing
            </Text>
            <Text style={styles.user}>Yesterday at 16.44</Text>
          </View>
        </View>
        <View style={styles.time}>
           
         <Text style={styles.textSize}>-₹115</Text>
        </View>
        
      </View>
    </View>
    <BottomNavigation/>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
  textSize:{
    fontSize:20,
  },
  mainText: {
    marginTop: 10,
  },
  post: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  mainTexts: {
    marginLeft: 10,
  },
  user: {
    fontSize: 12,
    paddingTop: 5,
    paddingRight: 15,
  },
  posts: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 30,
  },
  time: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
  },
  image: {
    marginTop: 20,
    marginRight: 30,
  },
  splashImages: {
    width: "100%",
    height: 268,
    borderRadius: 0,
  },
  
});
