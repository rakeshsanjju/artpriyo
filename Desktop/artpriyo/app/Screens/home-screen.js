import { useRouter } from "expo-router";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { eventEndPoints } from "../services/api";
import axios from "axios";
import { useEffect, useState } from "react";

const { GET_ALL_EVENTS } = eventEndPoints;

export default function HomeScreen() {
  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
  };
  const userToken = getToken();
  const router = useRouter();

  const [eventTypes, setEventTypes] = useState([]);

  const handleNotification = () => {
    router.push("/Screens/notifications-screen");
  };
  const handleEvents = () => {
    router.push("/Screens/events");
  };

  const handleSearch = () => {
    router.push("/Screens/search");
  };

  const getEventTypes = async (req, res) => {
    try {
      const response = await axios.get(GET_ALL_EVENTS, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      // console.log("Event Types :---->",eventTypes);
      setEventTypes(response.data.eventTypes);
    } catch (error) {
      setEventTypes([]);
      console.log("Error : ", error.message);
    }
  };

  useEffect(() => {
    getEventTypes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {userToken !== null ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 70 }} // Ensuring space at the bottom
        >
          <View style={styles.artpriyo}>
            <View>
              <Image
                // style={styles.splashImage}
                source={require("../../assets/Artpriyo.png")}
              />
            </View> 
            <View style={styles.icons}>
              <View>
                <TouchableOpacity onPress={handleSearch}>
                  <Image
                    style={{}}
                    source={require("../../assets/search.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.img}>
                <TouchableOpacity onPress={handleNotification}>
                  <Image
                    // style={styles.splashImage}
                    source={require("../../assets/bell.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.mainText}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              OnGoing Events
            </Text>
          </View>
          <View style={styles.contests}>
            {eventTypes?.length > 0 ? (
              eventTypes.map((eventType) => (
                <TouchableOpacity onPress={handleEvents} key={eventType._id}>
                  <Image
                    style={styles.splashImage}
                    source= { {uri:eventType.eventImage} } 
                  />
                  <Text>{eventType.eventName}</Text> 
                </TouchableOpacity>
              ))
            ) : (
              <View>
                <Text>No events here</Text>
              </View>
            )}
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
                // style={styles.splashImage}
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
            <Text style={styles.quotes}>
              Capturing the heart beat of the city
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
                // style={styles.splashImage}
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
            <Text style={styles.quotes}>
              Capturing the heart beat of the city
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View>
          <TextInput>User is not present</TextInput>
        </View>
      )}
      <BottomNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    overflow: "scroll",
  },
  splashImage: {
    width: 50, // set appropriate width
    height: 50, // set appropriate height
    resizeMode: 'contain', // optional but can help if the image isn't scaling properly
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
    fontSize: 13,
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
  quotes: {
    paddingTop: 10,
    fontSize: 14,
    color: "#888",
  },
});
