import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "./bottomnavigation";

export default function RecentSearch() {
  const router = useRouter();

  const handleShare = () => {
    router.push("/Screens/share-event")
  }
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
      <View style={styles.text}>
        <Text style={[styles.texts, { fontWeight: "bold" }]}>
          Event-Drawing
        </Text>
        <Text
          style={{
            fontSize: 12,
            marginTop: 5,
            fontWeight: 400,
            fontStyle: "Roboto",
          }}
        >
          June 26 - June 27 2024
        </Text>
      </View>
      <View style={styles.image}>
        <Image
          style={styles.drawing}
          source={require("../../assets/drawing-rename.png")} // Replace with your email icon path
        />
        <View style={styles.infoContainer}>
          <Text
            style={{ fontSize: 13, fontFamily: "Roboto", fontWeight: "700" }}
          >
            Info & Rules
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginLeft: 10,
              marginTop: 5,
              fontWeight: 600,
              fontStyle: "Roboto",
            }}
          >
            2d | 11 h | 43 m
          </Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ marginTop: 14 }}>
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  marginTop: 3,
                  fontWeight: 600,
                  fontStyle: "Roboto",
                }}
              >
                Entry Fee
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  marginTop: 3,
                  fontWeight: 600,
                  fontStyle: "Roboto",
                }}
              >
                ₹15
              </Text>
            </View>
            <View
              style={{ marginTop: 14, display: "flex", alignItems: "center" }}
            >
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  marginTop: 3,
                  fontWeight: 600,
                  fontStyle: "Roboto",
                }}
              >
                Total Price
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  marginTop: 3,
                  fontWeight: 600,
                  fontStyle: "Roboto",
                }}
              >
                ₹1500
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
          {/* Other texts remain the same... */}
          <View style={styles.rulesButtonContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.rulesButton}>
                <Image
                  style={styles.ruleIcon}
                  source={require("../../assets/Rules.png")}
                />
                <Text style={styles.rulesText}>Rules</Text>
                <Image
                  style={styles.dropIcon}
                  source={require("../../assets/drop.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rules</Text>
            <Text style={styles.modalText}>1. Rule one description</Text>
            <Text style={styles.modalText}>2. Rule two description</Text>
            <Text style={styles.modalText}>3. Rule three description</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          marginLeft: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: 36,
            width: 56,
            backgroundColor: "#297BCE",
            borderRadius: 30,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              style={{ width: 22, height: 22 }}
              source={require("../../assets/Leaderboard.png")}
            />
          </View>
        </View>
        <View
          style={{
            height: 36,
            width: 56,
            backgroundColor: "#297BCE",
            borderRadius: 30,
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity onPress={handleShare}>
            <Image
              style={{ width: 22, height: 22 }}
              source={require("../../assets/share.png")}
            />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainers1}>
          <TouchableOpacity style={styles.inputButton}>
            <Text style={styles.inputPlaceholder}>Create a Post </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
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
        <View style={styles.imagees}>
          <Image
            style={{height:268,width:375}}
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
      </View>
    </ScrollView>
    <BottomNavigation/>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 17,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  texts: {
    fontSize: 24,
  },
  image: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  drawing: {
    width: 165,
    height: 165,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },
  inputContainers1: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    width: 210,
    height: 36,

    backgroundColor: "#292932",
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
    color: "#fff",
  },
  post: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
  },
  posts: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 30,
  },
  user: {
    fontSize: 12,
    paddingTop: 5,
    paddingRight: 15,
  },
  time: {
    marginTop: 45,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 13,
    fontFamily: "Roboto",
  },
  mainText: {
    marginTop: 10,
  },
  user: {
    fontSize: 12,
    paddingTop: 5,
    paddingRight: 15,
  },
  mainTexts: {
    marginLeft: 10,
  },
  imagees: {
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
 
  texts: {
    fontSize: 24,
  },
  image: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  drawing: {
    width: 165,
    height: 165,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },
  rulesButtonContainer: {
    marginTop: 10,
  },
  rulesButton: {
    height: 36,
    width: 106,
    backgroundColor: "#E4E0E0",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ruleIcon: {
    width: 22,
    height: 22,
    marginLeft: 10,
  },
  dropIcon: {
    width: 22,
    height: 22,
    marginLeft: 5,
  },
  rulesText: {
    fontSize: 12,
   
    fontFamily: "Roboto",
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#297BCE",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    
  },
 
});
