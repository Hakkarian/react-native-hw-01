import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config";

export const postsRef = collection(db, "posts");

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  console.log(route.params)
  console.log(posts)

  const AuthStack = createStackNavigator();



  useEffect(() => { 
    getAllPost();
    
  }, []);
  console.log("posts", posts)

  const signOut = () => {
    dispatch(authSignOutUser())
  }

  const getAllPost = async () => {
    setPosts([]);
    onSnapshot(postsRef, docsSnap => setPosts(docsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }))))

  }
  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>PostScreen</Text>
        </View>
        <View>
          <Feather
            style={{ marginRight: 20, marginTop: 20 }}
            name="log-out"
            size={40}
            color={"#212121"}
            onPress={signOut}
          />
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Image source={{ uri: item.photo }} style={styles.token} />
              <Text style={{marginLeft: 35, marginTop: 10, marginBottom: 10}}>{item.comment}</Text>
              <View style={styles.feedbackContainer}>
                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => navigation.navigate("Comments", {id: item.id})}
                >
                  <Feather name="message-circle" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 120, flexDirection: "row"}}
                  onPress={() => navigation.navigate("Map", { locationInfo: item.locationInfo.coords })}
                >
                  <Feather name="map-pin" size={24} color="black" />
                  <Text style={{marginLeft: 10}}>{item.locationText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  token: {
    alignSelf: "center",
    marginHorizontal: 10,
    marginTop: 5,
    width: 343,
    height: 240,
  },
  header: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  headerText: {
    marginLeft: 18,
    marginTop: 25,
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  feedbackContainer: {
    flexDirection: "row",
    
  },
  feedbackButton: {
    flexDirection: "row",
    marginRight: "auto",
    marginLeft: 40,
    marginBottom: 10,
  }
});