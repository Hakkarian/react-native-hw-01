import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import Home from "./Screens/mainScreen/Home";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import { store } from "./redux/store";
import useRoute from "./router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import Main from "./components/Main";

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

  return (<Provider store={store}><Main /></Provider>);
}