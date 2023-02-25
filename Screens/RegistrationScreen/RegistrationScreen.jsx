import { useDispatch } from 'react-redux';
import { authSignUpUser } from "../../redux/auth/authOperations";
const { useState } = require("react");
const { TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, Keyboard, Alert, View, Text, ImageBackground, Image, TextInput, Button, StyleSheet } = require("react-native");


const RegistrationScreen = ({navigation}) => {
  const [isReady, setIsReady] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [initialState, setInitialState] = useState({
          name: "",
      email: "",
      password: "",
    });
  const dispatch = useDispatch();

  
  console.log(isShowKeyboard)
  console.log(initialState)

    const closeKeyboard = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      };
      
      const onSubmit = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        dispatch(authSignUpUser(initialState))
        Alert.alert(`Your name: ${initialState.name}, your email: ${initialState.email}, your password: ${initialState.password}`)
        setInitialState({
        name: "",
          email: "",
        password: "",
        });
        navigation.navigate({
          name: "PostsScreen"
        })
  }
  
  
  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.picture}
          source={require("../../img/mountain.jpg")}
        >
          <View style={{ ...styles.menu, height: isShowKeyboard ? 300 : 450 }}>
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
                    source={require("../../img/plsholder.jpg")}
                  />
                  <TouchableOpacity style={styles.addbutton} >
                    <Text style={styles.addspan}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Registration</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    textAlign={"center"}
                    placeholder="Enter your name"
                    onFocus={() => setIsShowKeyboard(true)}
                    value={initialState.name}
                    onChangeText={(text) =>
                      setInitialState((prevState) => ({
                        ...prevState,
                        name: text,
                      }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    textAlign={"center"}
                    placeholder="Enter your email"
                    onFocus={() => setIsShowKeyboard(true)}
                    value={initialState.email}
                    onChangeText={(text) =>
                      setInitialState((prevState) => ({
                        ...prevState,
                        email: text,
                      }))
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    textAlign={"center"}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    onFocus={() => setIsShowKeyboard(true)}
                    value={initialState.password}
                    onChangeText={(text) =>
                      setInitialState((prevState) => ({
                        ...prevState,
                        password: text,
                      }))
                    }
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.button}
                  onPress={onSubmit}
                >
                  <Text style={styles.btnTitle} onPress={onSubmit}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10, marginBottom: 10 }}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  <Text style={{ color: "blue", fontSize: 18}}>
                    Already have an account? Log in!
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );

}

export const styles = StyleSheet.create({
  height: Platform.OS === "ios" ? 50 : 100,
  container: {
    flex: 1,
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
    borderTopRightRadius: 50,
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
    marginBottom: 20,
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
    position: "relative",
  },
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
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
    borderRadius: 50,
  },
  addspan: {
    color: "yellow",
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


export default RegistrationScreen;