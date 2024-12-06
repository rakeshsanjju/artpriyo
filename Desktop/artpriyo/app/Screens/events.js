import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "./bottomnavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoints, eventEndPoints } from "../services/api";
import axios from "axios";
import { useEffect, useState } from "react";

const { FETCH_ONGOING_EVENTS } = eventEndPoints;
const { SINGLE_USER_API } = endpoints;

export default function RecentSearch() {
  const router = useRouter();

  const getToken = async () => {
    await AsyncStorage.getItem("token");
  };
  const token = getToken();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [user, setUser] = useState({});
  const [userEvents, setUserEvents] = useState([]); // To store event IDs the user has joined

  const getUserData = async () => {
    try {
      const response = await axios.get(SINGLE_USER_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setUserEvents(response.data.user.events); // Assuming user.events is an array of event IDs
    } catch (error) {
      console.log("Error fetching user data: ", error.message);
      setUser({});
    }
  };

  // Fetch all events data
  useEffect(() => {
    fetchAllEvents();
    getUserData();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(FETCH_ONGOING_EVENTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.events);
      setLoading(false);
    } catch (error) {
      setEvents([]);
      setLoading(false);
      console.log(error.message);
    }
  };

  function convertToIST(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const startIST = start.toLocaleString("en-IN", {
      ...options,
      timeZone: "Asia/Kolkata",
    });

    const endIST = end.toLocaleString("en-IN", {
      ...options,
      timeZone: "Asia/Kolkata",
    });

    return { startIST, endIST };
  }

  function getTimeDifference(endDate) {
    const [days, hours, minutes, seconds] = getRemainingTime(endDate);
    return `${days}d | ${hours}h | ${minutes}m | ${seconds}s`;
  }

  const getRemainingTime = (endDate) => {
    const start = new Date(); // Current date
    const end = new Date(endDate); // End date

    const diffInMilliseconds = end - start;

    if (diffInMilliseconds <= 0) {
      return ["0", "0", "0", "0"];
    }

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    return [days, hours, minutes, seconds];
  };

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (events.length > 0) {
        // Assume we are using the first event's endDate for now.
        const endDate = events[0].endDate;
        const [days, hours, minutes, seconds] = getRemainingTime(endDate);
        setCountdown(`${days}d | ${hours}h | ${minutes}m | ${seconds}s`);
      }
    }, 1000); // Update every second
  
    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [events])

  const handleEventsJoined = (eventId) => {
    router.push(`/Screens/events-joined/${eventId}`);
  };

  const handleJoinEvent = (eventId) => {
    // Add event join logic here
    // Update the user's events in the backend
    console.log("Joining event with ID:", eventId);
    setUserEvents([...userEvents, eventId]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.text}>
          <Text style={[styles.texts, { fontWeight: "bold" }]}>Events</Text>
        </View>
        <View style={styles.inputContainer}>
          <Image
            style={styles.icon}
            source={require("../../assets/search.png")}
          />
          <TextInput
            style={styles.input}
            placeholder="Search for competitions"
          />
        </View>
        <View style={styles.view}>
          <View style={styles.internal}>
            <Image
              style={styles.icons}
              source={require("../../assets/glossy.png")}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 32,
                color: "#fff",
                marginLeft: 100,
                marginTop: 10,
              }}
            >
              {events.length}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                marginLeft: 20,
                marginTop: 5,
              }}
            >
              competitions are waiting
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 5,
            marginTop: 15,
            marginBottom: 10,
          }}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
              <Text>Loading Events...</Text>
            </View>
          ) : events?.length > 0 ? (
            events.map((event) => {
              const { startIST, endIST } = convertToIST(event.startDate, event.endDate);
              const timeDiff = getTimeDifference(event.endDate);
              const isJoined = userEvents.includes(event._id); // Check if event ID is in userEvents

              return (
                <View style={styles.events} key={event._id}>
                  <Image
                    style={styles.drawing}
                    source={{ uri: event.eventImage }}
                  />
                  <View>
                    <Text style={{ fontSize: 18, marginLeft: 10, marginTop: 10, fontWeight: 700 }}>
                      {event.eventName}
                    </Text>
                    <Text style={{ fontSize: 12, marginLeft: 10, marginTop: 5 }}>
                      {startIST} - {endIST}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 14, marginLeft: 10, marginTop: 5 }}>
                      {timeDiff} remaining
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 10, marginLeft: 10, marginTop: 3 }}>
                      Entry Fee : ₹{event.entryFee}/-
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 5,
                    }}
                  >
                    <Image
                      style={styles.drawings}
                      source={require("../../assets/iconic.png")}
                    />
                    <Text style={{ fontSize: 10, marginLeft: 10, marginTop: 3 }}>
                      {event.participants.length} Participants
                    </Text>
                  </View>
                  <View style={styles.inputContainers1}>
                    <TouchableOpacity
                      style={[
                        styles.inputButton,
                        { backgroundColor: isJoined ? "gray" : "green" },
                      ]}
                      // onPress={() => (isJoined ? handleEventsJoined(event._id) : handleJoinEvent(event._id))}
                    >
                      <Text style={styles.inputPlaceholder}>{isJoined ? "Joined" : "Join"}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>No Events for now</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 17,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 63,
    overflow: "scroll",

  },loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texts: {
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 352,
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
  view: {
    width: 352,
    height: 110,
    backgroundColor: "#297BCE",
    borderRadius: 30,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  icons: {
    height: 107,
    width: 93,
    marginBottom: 30,
    color: "gold",
  },
  internal: {
    marginLeft: 25,
  },
  events: {
    width: 172,
    height: 411,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#FFF",
    backgroundColor: "#FFF", // Card background color
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.5, // Shadow radius
    elevation: 5, // For Android shadow
  },
  drawing: {
    width: 165,
    height: 165,
  },
  drawings: {
    height: 20,
    width: 20,
    marginTop: 5,
  },
  inputContainers1: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    width: 100,
    height: 40,
    marginTop: 20,
    marginLeft: 25,
    // backgroundColor: "#292932",
  },
  inputs: {
    color: "blue",
    paddingLeft: 20,
    paddingTop: 5,
  },
  inputButton: {
    alignItems: "center",
    padding:5,
    borderRadius:10,
    width:"100%"
  },
  inputPlaceholder: {
    justifyContent: "center",
    color: "#fff",
  },
  inputContainers2: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    width: 100,
    height: 40,
    marginTop: 20,
    marginLeft: 25,
    backgroundColor: "#23A26D",
  },
  
});
