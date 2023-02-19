import { AntDesign, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native"
import CommentsScreen from "../CommentsScreen";
import CreatePostsScreen from "../CreatePostsScreen";
import MapScreen from "../MapScreen/MapScreen";
import PostsScreen from "../PostsScreen";
import PostsNavigator from "../PostsScreen/PostsNavigator";
import ProfileScreen from "../ProfileScreen";

const MainTab = createBottomTabNavigator();

const Home = ({navigation}) => {
    return (
      <MainTab.Navigator
        screenOptions={{ tabBarShowLabel: false }}
        initialRouteName="Home"
      >
        <MainTab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              if (focused) {
                return (
                  <Feather
                    style={styles.button}
                    name="grid"
                    size={size}
                    color={"white"}
                  />
                );
              }
              return <Feather name="grid" size={size} color={"#212121"} />;
            },
            headerRight: ({ size, color }) => (
              <Feather
                style={{ marginRight: 10 }}
                name="log-out"
                size={40}
                color={color}
                onPress={() => navigation.popToTop()}
              />
            ),
            headerShown: false
          }}
          name="PostsScreen"
          component={PostsNavigator}
        />
        <MainTab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              if (focused) {
                return (
                  <AntDesign
                    style={styles.button}
                    name="plus"
                    size={size}
                    color={"white"}
                  />
                );
              }
              return <AntDesign name="plus" size={size} color={"#212121"} />;
            },
          }}
          name="Create"
          component={CreatePostsScreen}
        />
        <MainTab.Screen
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              if (focused) {
                return (
                  <AntDesign
                    style={styles.button}
                    name="user"
                    size={size}
                    color={"white"}
                  />
                );
              }
              return <AntDesign name="user" size={size} color={"#212121"} />;
            },
            headerShown: false,
          }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
      </MainTab.Navigator>
    );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF6C00",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 15,
  },
});