import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Image, ImageBackground, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

export default function App() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const nameHandler = text => setName(text);
  const passwordHandler = text => setPassword(text);
  const onSubmit = () => {
    Alert.alert(`Credentials: ${name} and ${password}`);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ImageBackground source={require("./assets/adaptive-icon.png")}>
          <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={{ width: 70, height: 70 }}
          />
          <ImageBackground source={require("./assets/adaptive-icon.png")} />
          <TextInput
            style={styles.input}
            placeholder="Type smth"
            value={name}
            onChangeText={nameHandler}
          />
          <TextInput
            style={styles.input}
            placeholder="Type smth"
            value={password}
            onChangeText={passwordHandler}
          />
          <Button
            title={"Login"}
            style={styles.input}
            onPress={onSubmit}
            ></Button>
            </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 50 : 100,
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: '#000'
      },
      android: {
        backgroundColor: '#fff'
      }
    }),
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  input: {
    borderWidth: 1
  }
});
