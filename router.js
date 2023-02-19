import { Button, StyleSheet, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CommentsScreen from "./Screens/mainScreen/CommentsScreen";
import MapScreen from "./Screens/mainScreen/MapScreen/MapScreen";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  // if (!isAuth) {
  //   return (
  //     <AuthStack.Navigator
  //       initialRouteName="LoginScreen"
  //       screenOptions={{ headerShown: false }}
  //     >
  //       <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
  //       <AuthStack.Screen
  //         name="RegistrationScreen"
  //         component={RegistrationScreen}
  //       />
  //       <AuthStack.Screen name="Home" component={Home} />
  //     </AuthStack.Navigator>
  //   );
  // }
  return (
    <AuthStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      <AuthStack.Screen name="Home" component={Home} />
    </AuthStack.Navigator>
  );
};

export default useRoute;

const styles = StyleSheet.create({
  button: {
        backgroundColor: "#FF6C00",
        paddingLeft: 25,
        paddingRight: 25,
      paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
  },
});
