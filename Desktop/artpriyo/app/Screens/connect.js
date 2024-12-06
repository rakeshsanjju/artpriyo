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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { endpoints, eventEndPoints } from "../services/api";
import axios from "axios";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const { FETCH_CONNECTIONS, FETCH_RANDOM_USERS } = eventEndPoints;
const { ACCEPT_CONNECTION, CONNECT_FRIEND,DELETE_REQUESTED_CONNECTION } = endpoints;
console.log("Api:--->", DELETE_REQUESTED_CONNECTION);
export default function RecentSearch() {
  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };

  const [requestConnections, setRequestConnections] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRequestsSent, setUserRequestsSent] = useState({});
  const [pendingConnections, setPendingConnections] = useState([]);

  const token = getToken();

  function showToast(type, message){
    console.log("Showing Toast:", type, message); // Add this log to check if it's calle
    Toast.show({
      type: type,
      position: "top",
      text1: message,
      visibilityTime: 2000,
    });
  };

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(FETCH_CONNECTIONS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequestConnections(response.data.requestConnections);
      setPendingConnections(response.data.pendingConnections);
      setLoading(false);
    } catch (error) {
      setRequestConnections([]);
      Toast.show({
        type: "error",
        text1: `Server Error : ${error.message}`,
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(FETCH_RANDOM_USERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers(response.data.users);
        setLoading(false);
      } else {
        Toast.show({
          type: "error",
          text1: response.data.message,
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      setUsers([]);
      Toast.show({
        type: "error",
        text1: error.message,
        position: "bottom",
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  

  const createConnection = async (email) => {
    try {
      const response = await axios.post(
        CONNECT_FRIEND,
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Create connection:----->", response.data);
      if (response.data.success) {
        showToast("success", response.data.message);
        setUserRequestsSent((prevState) => ({
          ...prevState,
          [email]: true, // Mark as sent
        }));
        fetchSuggestions(); // Refresh suggestions
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const deleteRequestConnection = async (deleteRequestId) => {
    try {
      const response = await axios.post(
        DELETE_REQUESTED_CONNECTION,
        {
          deleteRequestId: deleteRequestId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.data.success) {
        showToast("success", response.data.message);
        fetchConnections();
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      console.log("Error:---->", error);
            if (error.response) {
        showToast("error", error.response.data.message || "Something went wrong");
      } else if (error.request) {
        // If no response was received (network issues or server not reachable)
        showToast("error", "No response received from server");
      } else {
        // If the error occurred while setting up the request
        showToast("error", "Request setup failed: " + error.message);
      }
    }
  };
  
  const handleConnect = () => {
    // Your logic to send the request (only if not already sent)
    if (pendingConnections.find(connection => connection.user.email === user?.email)) {
      // Do nothing if the request has already been sent
      console.log("Request already sent");
      return;
    }
  
    // Logic to send connection request goes here
    sendConnectionRequest();
  };

  const acceptConnection = async (acceptUserId) => {
    try {
      const response = await axios.post(
        ACCEPT_CONNECTION,
        { acceptUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        showToast("success","Connectin accepted succesfully")
        fetchConnections(); // Refresh connections after accepting
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const truncatedName = (name) => {
    return name.length > 25 ? name.substring(0, 25) + "..." : name;
  };

  const displayTimeDifference = (targetDate) => {
    const currentDate = new Date();
    const targetDateObj = new Date(targetDate);
    const timeDifferenceInMilliseconds = currentDate - targetDateObj;

    const minutes = timeDifferenceInMilliseconds / (1000 * 60);
    const hours = timeDifferenceInMilliseconds / (1000 * 60 * 60);
    const days = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);
    const weeks = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 7);
    const months = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 30);
    const years = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);

    if (minutes < 60) {
      return `${Math.floor(minutes)} minute${
        Math.floor(minutes) === 1 ? "" : "s"
      } ago`;
    } else if (hours < 24) {
      return `${Math.floor(hours)} hour${
        Math.floor(hours) === 1 ? "" : "s"
      } ago`;
    } else if (days < 7) {
      return `${Math.floor(days)} day${Math.floor(days) === 1 ? "" : "s"} ago`;
    } else if (weeks < 4) {
      return `${Math.floor(weeks)} week${
        Math.floor(weeks) === 1 ? "" : "s"
      } ago`;
    } else if (months < 12) {
      return `${Math.floor(months)} month${
        Math.floor(months) === 1 ? "" : "s"
      } ago`;
    } else {
      return `${Math.floor(years)} year${
        Math.floor(years) === 1 ? "" : "s"
      } ago`;
    }
  };

  useEffect(() => {
    fetchConnections();
    fetchSuggestions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={[styles.texts, { fontWeight: "bold" }]}>Connect</Text>
        </View>

        <View
          style={{
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 30,
          }}
        >
          <Text style={styles.requests}>
            {`Requests (${requestConnections?.length})`}
          </Text>
          <Text style={styles.requests1}>See all</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Requests...</Text>
          </View>
        ) : requestConnections.length > 0 ? (
          requestConnections.map((connection) => (
            <View key={connection._id}>
              <View style={styles.user}>
                <Image
                  style={styles.splashImage}
                  source={require("../../assets/small.png")}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", paddingTop: 5 }}
                  >
                    {truncatedName(
                      `${connection?.user.firstName} ${connection?.user.lastName}`
                    )}
                  </Text>
                  <Text style={{ fontSize: 16, paddingTop: 5 }}>
                    {connection?.user.userName}
                  </Text>
                  <Text style={{ fontSize: 12, paddingTop: 5 }}>
                    {displayTimeDifference(connection?.requestedAt)}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 20,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => acceptConnection(connection.user._id)}
                  >
                    <View style={{ marginLeft: 10 }}>
                      <Image
                        style={styles.icon1}
                        source={require("../../assets/icon1.png")}
                      />
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                          position: "absolute",
                          marginTop: 4,
                          marginLeft: 7,
                        }}
                        source={require("../../assets/Done.png")}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {deleteRequestConnection(connection.user._id)}}
                  >
                    <View style={{ marginLeft: 10 }}>
                      <Image
                        style={styles.icon1}
                        source={require("../../assets/icon1.png")}
                      />
                      <Image
                        style={{
                          height: 24,
                          width: 24,
                          position: "absolute",
                          marginTop: 4,
                          marginLeft: 7,
                        }}
                        source={require("../../assets/cancel.png")}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.separator} />
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
            <Text>No Request found</Text>
          </View>
        )}

        <View
          style={{
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 30,
          }}
        >
          <Text style={styles.requests}>Suggestions</Text>
          <Text style={styles.requests1}>See all</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading Suggestions...</Text>
          </View>
        ) : users.length > 0 ? (
          users.map((user) => (
            <View key={user._id}>
              <View style={styles.user}>
                <Image
                  style={styles.splashImage}
                  source={require("../../assets/small.png")}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", paddingTop: 10 }}
                  >
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text style={{ fontSize: 16, paddingTop: 10 }}>
                    {user.userName}
                  </Text>
                </View>

                <View style={styles.inputContainers1}>
                  <TouchableOpacity
                    style={styles.inputButton}
                    onPress={() => {
                      createConnection(user?.email);
                    }}
                  >
                    <Text style={styles.inputPlaceholder}>
                      {pendingConnections.find(
                        (connection) => connection.user.email === user?.email
                      )
                        ? "Request Sent"
                        : "Connect"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          ))
        ) : (
          <View style={styles.noRequestsContainer}>
            <Text>No Suggestions found</Text>
          </View>
        )}
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
  texts: {
    fontFamily: "Roboto",
    fontSize: 24,
  },
  requests: {
    fontSize: 14,
    fontFamily: "Roboto",
    marginLeft: 5,
  },
  requests1: {
    fontSize: 14,
    fontFamily: "Roboto",
    marginLeft: 5,
    color: "#297BCE",
  },
  user: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
  },
  splashImage: {
    height: 80,
    width: 80,
  },
  icon1: {
    height: 40,
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainers1: {
    borderColor: "#297BCE",
    borderWidth: 1,
    borderRadius: 30,
    width: 100,
    height: 40,
    marginTop: 20,
    marginLeft: 55,
  },
  inputs: {
    color: "blue",
    paddingLeft: 20,
    paddingTop: 5,
  },
  inputButton: {
    alignItems: "center",
    paddingTop: 8,
  },
  inputPlaceholder: {
    justifyContent: "center",
    color: "#297BCE",
  },
});
