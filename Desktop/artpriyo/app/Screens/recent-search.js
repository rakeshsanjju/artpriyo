import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecentSearch() {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={[styles.texts, { fontWeight: "bold" }]}>Search</Text>
      </View>
      <View style={styles.inputContainer}>
        <Image
          style={styles.icon}
          source={require("../../assets/search.png")} // Replace with your email icon path
        />
        <TextInput
          style={styles.input}
          placeholder="Search for competitions or users"
          // Add any other props needed
        />
      </View>
      <View style={styles.options}>
        <Text>Events</Text>
      </View>
      <View style={styles.posts}>
        <View style={styles.post}>
          <Image
            style={styles.splashImagee}
            source={require("../../assets/drawing-icon.png")}
          />
          <View style={styles.mainTexts}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Drawing</Text>
            <Text style={styles.user}>Event-Live</Text>
          </View>
        </View>
        <View style={styles.inputContainers}>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputPlaceholder}>Connect</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.time}>
          <Image
            style={styles.splashImage}
            source={require("../../assets/eye-icon.png")}
          />
        </View>
      </View>
      <View style={styles.posts}>
        <View style={styles.post}>
          <Image
            style={styles.splashImagee}
            source={require("../../assets/drawing-icon.png")}
          />
          <View style={styles.mainTexts}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>Drawing</Text>
            <Text style={styles.user}>Event-Live</Text>
          </View>
        </View>
        <View style={styles.inputContainers}>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputPlaceholder}>Connect</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.time}>
          <Image
            style={styles.splashImage}
            source={require("../../assets/eye-icon.png")}
          />
        </View>
      </View>
      <View style={styles.options}>
        <Text>Accounts</Text>
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
        <View style={styles.inputContainers1}>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputPlaceholder}>Connect</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.time}>
          <Image
            style={styles.splashImage}
            source={require("../../assets/send.png")}
          />
        </View>
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
        <View style={styles.inputContainers1}>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputPlaceholder}>Connect</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.time}>
          <Image
            style={styles.splashImage}
            source={require("../../assets/send.png")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 17,
    marginLeft: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 340,
    height: 40,
    paddingHorizontal: 10, // Padding to align the icon and input nicely
  },
  icon: {
    width: 20, // Set icon width
    height: 20, // Set icon height
    marginRight: 10, // Space between icon and input
    marginLeft: 10,
    color: "#297BCE",
  },
  input: {
    flex: 1, // Takes up the remaining space
    height: "100%", // Make input fill the height
  },
  text: {
    marginLeft: 0,
  },
  texts: {
    fontFamily: "Roboto",
    fontSize: 24,
  },
  options: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 10,
    marginRight: 35,
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
    marginTop: 20,
    display: "flex",
    justifyContent: "center", // Center the icon inside
    alignItems: "center", // Center the icon vertically
    borderRadius: 20, // Half of width/height for a circular border
    borderColor: '#297BCE',
    borderWidth: 2, // Set the border width
    width: 40,
    height: 40,
    backgroundColor: 'transparent', // Set a background color if needed
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
  inputContainers: {
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 100,
    height: 40,
    marginTop: 20,
    marginLeft: 30,
  },
  inputContainers1: {
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 100,
    height: 40,
    marginTop: 20,
    marginLeft: 10,
  },
  inputs: {
    color: "blue",
    paddingLeft: 20,
    paddingTop: 5,
  },
  inputButton:{
    alignItems:'center',
    paddingTop:7
  },
  inputPlaceholder:{
    justifyContent:'center'
  }
});
