import { Feather } from "@expo/vector-icons";
import { getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { elements } from "../../../api-service/fakeAPI";
import { db } from "../../../config";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { postsRef } from "../PostsScreen/PostsScreen";


const ProfileScreen = ({ navigation }) => {
  const {userId} = useSelector(state => state.auth)
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [profilePosts, setProfilePosts] = useState([]);
  const dispatch = useDispatch();
  

    const closeKeyboard = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
  };

  useEffect(() => {getUserPosts()}, [])

  const getUserPosts = async () => {
    const q = query(postsRef, where('id', "==", userId))
    const queSnap = await getDocs(q)
    onSnapshot(q, (docsSnap) =>
      setProfilePosts(docsSnap.docs.map((doc) => (doc.data())))
    );
  }

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.picture}
          source={require("../../../img/mountain.jpg")}
        >
          <View style={{ ...styles.menu, height: isShowKeyboard ? 250 : 600 }}>
            <KeyboardAvoidingView>
              <View
                style={{
                  ...styles.form,
                  marginBottom: isShowKeyboard ? -50 : 100,
                }}
              >
                <View style={styles.wrapperImg}>
                  <Image
                    style={{
                      ...styles.img,
                    }}
                    source={require("../../../img/plsholder.jpg")}
                  />
                  <TouchableOpacity style={styles.addbutton}>
                    <Text style={styles.addspan}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 300, marginTop: -30 }}
                    onPress={() => dispatch(authSignOutUser())}
                  >
                    <Feather name="log-out" size={30} color={"#bdbdbd"} />
                  </TouchableOpacity>
                </View>
                <View style={styles.postsWrapper}>
                  <FlatList
                    data={profilePosts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <View>
                        <Image
                          source={{ uri: item.photo }}
                          style={styles.token}
                        />
                        <Text
                          style={{
                            marginLeft: 20,
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          {item.comment}
                        </Text>
                        <View style={styles.feedbackContainer}>
                          <TouchableOpacity
                            style={styles.feedbackButton}
                            onPress={() =>
                              navigation.navigate("Comments", { id: item.id })
                            }
                          >
                            <Feather
                              name="message-circle"
                              size={24}
                              color="black"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ marginRight: 80, flexDirection: "row" }}
                            onPress={() =>
                              navigation.navigate("Map", {
                                locationInfo: item.locationInfo.coords,
                              })
                            }
                          >
                            <Feather name="map-pin" size={24} color="black" />
                            <Text style={{ marginLeft: 10 }}>
                              {item.locationText}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    flex: 1,
    justifyContent: "flex-end",
  },
  menu: {
    alignItems: "flex-end",
    height: 400,
    ...Platform.select({
      ios: {
        backgroundColor: "#fff",
      },
      android: {
        backgroundColor: "#fff",
      },
    }),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  form: {
    marginHorizontal: 40,
  },
  wrapperImg: {
    position: "absolute",
    top: -60,
  },
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
  },
  addbutton: {
    position: "absolute",
    top: 50,
    right: 90,
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "yellow",
    borderRadius: 50,
  },
  addspan: {
    color: "yellow",
  },
  postsWrapper: {

    marginTop: 70,
  },
  token: {
    marginBottom: "auto",
    alignSelf: "center",


    marginTop: 5,
    width: 343,
    height: 240,
  },
  feedbackContainer: {
    flexDirection: "row",
  },
  feedbackButton: {
    flexDirection: "row",
    marginRight: "auto",
    marginLeft: 20,
    marginBottom: 10,
  },
});