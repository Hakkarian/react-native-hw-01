import { useState } from "react";
import * as Font from "expo-font";
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

import useRoute from "./router";
import Home from "./Screens/mainScreen/Home";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";

const AuthStack = createStackNavigator();

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Regular": {
      url: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    },
  });
};

export default function App() {
  const [signUp, setSignUp] = useState(false)


  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );;
}