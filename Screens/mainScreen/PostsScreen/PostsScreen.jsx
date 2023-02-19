import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommentsScreen from "../CommentsScreen";
import MapScreen from "../MapScreen/MapScreen";

const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  console.log(route.params)

  const AuthStack = createStackNavigator();

  // if (!route.params.photo || !route.params.location || route.params.name) {
  //   return;
  // }


  useEffect(() => { 
    console.log(route.params)
    if (route.params) {
      setPosts((prevState) => [...prevState, { photo: route.params.photo, location: route.params.location, name: route.params.name } ]);
    }
    console.log(posts)
  }, [route.params]);
  console.log("posts", posts)
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
            onPress={() => navigation.popToTop()}
          />
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: { photo, name, location } }) => (
            <View>
              <Image source={{ uri: photo }} style={styles.token} />
              <Text style={{marginLeft: 35, marginTop: 10, marginBottom: 10}}>{name}</Text>
              <View style={styles.feedbackContainer}>
                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Feather name="message-circle" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 120, flexDirection: "row"}}
                  onPress={() => navigation.navigate("Map")}
                >
                  <Feather name="map-pin" size={24} color="black" />
                  <Text>{location}</Text>
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