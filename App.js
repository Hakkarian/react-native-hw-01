import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

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
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  console.log(isShowKeyboard)

  const onSignUp = () => {
    setSignUp(true);
  }

  const onSignIn = () => {
    setSignUp(false);
  }
  
      const closeKeyboard = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
      };
  return (
    
    <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={styles.container}>
    <ImageBackground
      style={styles.picture}
      source={require("./img/mountain.jpg")}
    >
        {!signUp ? <LoginScreen isShowKeyboard={isShowKeyboard} setIsShowKeyboard={setIsShowKeyboard} /> : <RegistrationScreen isShowKeyboard={isShowKeyboard} setIsShowKeyboard={setIsShowKeyboard} />}
        </ImageBackground>
      </View>
      </TouchableWithoutFeedback>
  );;
}

export const styles = StyleSheet.create({
  height: Platform.OS === "ios" ? 50 : 100,
  container: {
    flex: 1
  },
  menu: {
    height: 500,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "#fff",
      },
      android: {
        backgroundColor: "#fff",
      },
    }),
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  form: {
    marginHorizontal: 40,
  },
  label: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 13,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    height: 40,
    marginBottom: 20,
    color: "#000",

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  picture: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapperImg: {
    position: "relative"
  },
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15
  },
  addbutton: {
    position: "absolute",
    bottom: 20,
    right: 90,
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "yellow",
    borderRadius: 50
  },
  addspan: {
    color: "yellow"
  },
  button: {
    marginTop: 10,
    padding: 10,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#fff",
      },
      android: {
        backgroundColor: "#FF6C00",
      },
    }),
    borderRadius: 5,
    borderWidth: 1,

    borderColor: Platform.OS === "ios" && "#fff",
  },
  btnTitle: {
    ...Platform.select({
      ios: {
        color: "blue",
      },
      android: {
        color: "#fff",
      },
    }),
    fontSize: 20,
    textAlign: "center",
  },
});
