import { styles } from "../../App";


const { useState } = require("react");
const { TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, Keyboard, Alert, View, Text, ImageBackground, Image, TextInput, Button } = require("react-native");


const RegistrationScreen = ({isShowKeyboard, setIsShowKeyboard}) => {
    const [isReady, setIsReady] = useState(false);
    const [initialState, setInitialState] = useState({
          name: "",
          email: "",
      password: "",
    });

  
  console.log(isShowKeyboard)

    const closeKeyboard = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
      };
      
      const onSubmit = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        Alert.alert(`Your name: ${initialState.name}, your email: ${initialState.email}, your password: ${initialState.password}`)
        setInitialState({
        name: "",
        email: "",
        password: "",
      });
      }
  return (
        <View style={{ ...styles.menu, height: isShowKeyboard ? 300 : 350 }}>
          <KeyboardAvoidingView>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 0 : 100,
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
                style={{ ...styles.button, marginTop: isShowKeyboard ? 50 : 0 }}
                onPress={onSubmit}
              >
                <Text style={styles.btnTitle}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
  );

}

export default RegistrationScreen;