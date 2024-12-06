import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "./bottomnavigation";


export default function Saved() {
  return (
    <View style={{ flex: 1 }}>
       <ScrollView style={styles.container}>
      
      <View style={styles.mainText}>
        <Text style={[styles.text, { fontWeight: "bold" }]}>
          Saved
        </Text>
      </View>
      
      <View style={styles.posts}>
        <View style={styles.post}>
          <Image
            style={styles.splashImage}
            source={require("../../assets/small.png")}
          />
          <View style={styles.mainTexts}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              Dasari Rakesh
            </Text>
            <Text style={styles.user}>sanjju</Text>
          </View>
        </View>
        <View style={styles.time}>
          <Text style={styles.user}>1h</Text>
          <Image
            style={styles.splashImage}
            source={require("../../assets/More.png")}
          />
        </View>
      </View>
      <View style={styles.image}>
        <Image
          style={styles.splashImages}
          source={require("../../assets/post.png")}
        />
      </View>
      <View style={styles.love}>
        <Image
          style={styles.splashImages1}
          source={require("../../assets/Love.png")}
        />
        <Text style={styles.quote}>122</Text>
      </View>
      <View>
        <Text style={styles.quotes}>Capturing the heart beat of the city</Text>
      </View>
      <View style={styles.posts}>
        <View style={styles.post}>
          <Image
            style={styles.splashImage}
            source={require("../../assets/small.png")}
          />
          <View style={styles.mainTexts}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              Dasari Rakesh
            </Text>
            <Text style={styles.user}>sanjju</Text>
          </View>
        </View>
        <View style={styles.time}>
          <Text style={styles.user}>1h</Text>
          <Image
            style={styles.splashImage}
            source={require("../../assets/More.png")}
          />
        </View>
      </View>
      <View style={styles.image}>
        <Image
          style={styles.splashImages}
          source={require("../../assets/post.png")}
        />
      </View>
      <View style={styles.love}>
        <Image
          style={styles.splashImages1}
          source={require("../../assets/Love.png")}
        />
        <Text style={styles.quote}>122</Text>
      </View>
      <View>
        <Text style={styles.quotes}>Capturing the heart beat of the city</Text>
      </View>
    </ScrollView>
    <BottomNavigation/>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 20,
    marginBottom:20
  },
  artpriyo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 30,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
  },
  img: {
    marginLeft: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
  mainText: {
    marginTop: 10,
  },
  contests: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 30,
  },
  post: {
    marginTop: 30,
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
    marginTop: 45,
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
  love: {
    marginTop: 10,
   
    display: "flex",
    flexDirection: "row",
  },
  quote: {
    paddingTop: 2,
    marginLeft: 10,
  },
});
