import PropTypes from 'prop-types';
import { styles } from "../../Screens/RegistrationScreen/RegistrationScreen";

const { useState } = require("react");
const {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Alert,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Button,
} = require("react-native");

const LoginScreen = ({navigation}) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [initialState, setInitialState] = useState({
    email: "",
    password: "",
  });

  console.log(isShowKeyboard);

  const closeKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    Alert.alert(
      `Your email: ${initialState.email}, your password: ${initialState.password}`
      );
      setInitialState({
        email: "",
        password: "",
      });
    navigation.navigate("ProfileScreen")
  };
  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.picture}
          source={require("../../img/mountain.jpg")}
        >
          <View style={{ ...styles.menu, height: isShowKeyboard ? 250 : 400 }}>
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
                  <TouchableOpacity style={styles.addbutton}>
                    <Text style={styles.addspan}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>Login</Text>
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
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text style={styles.btnTitle}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onPress={() => navigation.navigate("RegistrationScreen")}
                >
                  <Text style={{ color: "blue", fontSize: 18 }}>
                    Have no account? Register!
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};



export default LoginScreen;