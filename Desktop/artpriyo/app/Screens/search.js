import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "./bottomnavigation";
import { useEffect, useState } from "react";
import { endpoints } from "../services/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { SEARCH_API } = endpoints;

export default function Search() {
  const getToken = async () => {
    await AsyncStorage.getItem("token");
  };
  const token = getToken();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      // Use POST request if you're sending data in req.body
      const response = await axios.post(
        SEARCH_API,
        {
          searchTerm: searchTerm, // Send searchTerm in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header with token
          },
        }
      );

      if (response.data.success) {
        setEvents(response.data.events); // Set events data from the response
        setUsers(response.data.users); // Set users data from the response
      } else {
        setEvents([]); // Reset events if nothing is found
        setUsers([]); // Reset users if nothing is found
      }
    } catch (error) {
      setSearchTerm(""); // Reset the searchTerm if an error occurs
      setEvents([]); // Clear events in case of error
      setUsers([]); // Clear users in case of error
      console.log("Error: ", error);
    } finally {
      setLoading(false); // Stop loading indicator once the request is complete
    }
  };

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch(); // Only call handleSearch if the searchTerm is not empty
    }
  }, [searchTerm]);

  return (
    <View style={{ flex: 1 }}>
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
            value={searchTerm}
            onChangeText={(newText) => setSearchTerm(newText)}
            // Add any other props needed
          />
        </View>
        <View style={styles.options}>
          <Text>Recent</Text>
          <TouchableOpacity onPress={() => setSearchTerm("")}>
            <Text>Clear All</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>Events</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Events...</Text>
          </View>
        ) : events.length > 0 ? (
          events.map((event) => (
            <View style={styles.posts} key={event._id}>
              <View style={styles.post}>
                <Image
                  style={styles.splashImage}
                  source={{ uri: event.eventImage }}
                />
                <View style={styles.mainTexts}>
                  <Text style={[styles.text, { fontWeight: "bold" }]}>
                    {event.eventName}
                  </Text>
                  <Text
                    style={[
                      styles.user,
                      new Date(event.endDate) > new Date()
                        ? { color: "green",fontWeight:"bold" } 
                        : { color: "red",fontWeight:"bold" }, 
                    ]}
                  >
                    {new Date(event.endDate) > new Date() ? "Live" : "Ended"}
                  </Text>
                </View>
              </View>
              <View style={styles.time}>
                <Image
                  // style={styles.splashImage}
                  source={require("../../assets/cancel.png")}
                />
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              height: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No Events Found</Text>
          </View>
        )}
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>Users</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Users...</Text>
          </View>
        ) : users.length > 0 ? (
          users.map((user) => (
            <View style={styles.posts} key={user._id}>
              <View style={styles.post}>
                <Image
                  style={styles.splashImage}
                  source={require("../../assets/small.png")}
                />
                <View style={styles.mainTexts}>
                  <Text style={[styles.text, { fontWeight: "bold" }]}>
                    {user?.firstName} {user?.lastName}
                  </Text>
                  <Text style={styles.user}>{user?.userName}</Text>
                </View>
              </View>
              <View style={styles.time}>
                <Image
                  // style={styles.splashImage}
                  source={require("../../assets/cancel.png")}
                />
              </View>
            </View>
          ))
        ) : (
          <View
            style={{
              height: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No Users Found</Text>
          </View>
        )}
      </View>
      <BottomNavigation />
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
  splashImage: {
    width: 50, // set appropriate width
    height: 50, // set appropriate height
    resizeMode: "contain", // optional but can help if the image isn't scaling properly
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
