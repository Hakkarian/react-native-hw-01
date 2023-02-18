import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Image, ImageBackground, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { elements } from "../../../api-service/fakeAPI";


const ProfileScreen = ({navigation}) => {
const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const closeKeyboard = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
    };
  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.picture}
          source={require("../../../img/mountain.jpg")}
        >
          <View style={{ ...styles.menu, height: isShowKeyboard ? 250 : 550 }}>
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
                    source={require("../../../img/plsholder.jpg")}
                  />
                  <TouchableOpacity style={styles.addbutton}>
                    <Text style={styles.addspan}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 300, marginTop: -30 }}
                    onPress={() => navigation.popToTop()}
                  >
                    <Feather name="log-out" size={30} color={"#bdbdbd"} />
                  </TouchableOpacity>
                </View>
                <FlatList>
                  {elements.map(
                    ({ image, text, comments, likes, location }) => {
                      <>
                        <Text>{text}</Text>
                      </>;
                    }
                  )}
                </FlatList>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picture: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
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
  wrapperImg: {
    position: "relative",
    marginBottom: 550,
  },
  img: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 15,
  },
  addbutton: {
    position: "absolute",
    top: 50,
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
});