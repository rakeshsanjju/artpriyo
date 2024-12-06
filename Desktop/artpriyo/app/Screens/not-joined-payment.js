import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "./bottomnavigation";

export default function NotJoinedEventPayment() {
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
            source={require("../../assets/drawing-rename.png")}
          />
          <View style={styles.infoContainer}>
            <Text style={{ fontSize: 13, fontFamily: "Roboto", fontWeight: "700" }}>
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
                <Text style={styles.entryFeeText}>Entry Fee</Text>
                <Text style={styles.priceText}>₹15</Text>
              </View>
              <View style={{ marginTop: 14, display: "flex", alignItems: "center" }}>
                <Text style={styles.entryFeeText}>Total Price</Text>
                <Text style={styles.priceText}>₹1500</Text>
              </View>
            </View>
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
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/Leaderboard.png")}
            />
          </View>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/share.png")}
            />
          </View>
          <View style={styles.inputContainers1}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.inputButton}>
              <Text style={styles.inputPlaceholder}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirmation Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you sure want to join in this competition</Text>
              <Text style={styles.modalText}>By Clicking confirm and pay you will proceed to payment </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.payButton}
                  onPress={() => {
                    // Handle payment logic here
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Pay</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Other components remain the same... */}
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
              style={{ height: 268, width: 375 }}
              source={require("../../assets/post.png")}
            />
          </View>
          <View style={styles.love}>
            <Image
              style={styles.splashImages}
              source={require("../../assets/Love.png")}
            />
            <Text style={styles.quote}>122</Text>
          </View>
          <View>
            <Text style={styles.quote}>
              Capturing the heart beat of the city
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
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
  entryFeeText: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 3,

    fontStyle: "Roboto",
  },
  priceText: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 3,

    fontStyle: "Roboto",
  },
  rulesButton: {
    height: 36,
    width: 106,
    backgroundColor: "#E4E0E0",
    borderRadius: 30,
    marginTop: 10,
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
  buttonContainer: {
    marginTop: 15,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    height: 36,
    width: 56,
    backgroundColor: "#297BCE",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 22,
    height: 22,
  },
  inputContainers1: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    width: 210,
    height: 36,
    backgroundColor: "#292932",
  },
  inputButton: {
    alignItems: "center",
    paddingTop: 8,
  },
  inputPlaceholder: {
    justifyContent: "center",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 350,
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
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    borderRadius: 30,
    padding: 10,
    width: 109,
    height: 40,
    alignItems: 'center',
    marginRight: 10,
    marginTop: 10
  },
  payButton: {
    backgroundColor: "#297BCE",
    borderRadius: 30,
    padding: 10,
    width: 159,
    height: 40,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
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
});
