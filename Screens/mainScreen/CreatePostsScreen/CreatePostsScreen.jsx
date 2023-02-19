import { Camera } from 'expo-camera';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"; 
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const CreatePostsScreen = ({navigation}) => {
    const [camera, setCamera] = useState(null);
  const [state, setState] = useState({
      name: "",
        location: "",
      photo: "",
    })
  const { name, location, photo } = state;
  
  console.log("name", name, "location", location);

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      console.log("status", status)
      if (status !== "granted") {
        alert("You do not belong in here")
        return;
      }
    })();
  });

    const TakePhoto = async () => {
      const snap = await camera.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
      setState({
        photo: snap.uri,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    const sendPhoto = () => {
      navigation.navigate("Posts", {
        photo, name, location
      });
      setState({photo: "", name: "", location: ""})
  };

  const handleInputChange = (e) => {
    setName(e.target.value)
  }
  
    return (
      <View style={styles.container}>
        <Camera style={{ ...styles.camera, backgroundColor: "#212121" }} ref={setCamera}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          )}
          <TouchableOpacity style={styles.round} onPress={TakePhoto}>
            <MaterialIcons name="camera-alt" size={24} color="black" />
          </TouchableOpacity>
        </Camera>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Upload photo</Text>
          <TextInput
            style={styles.input}
            placeholder="Name..."
            defaultValue={name}
            onChangeText={(text) =>
              setState((prevState) => ({ ...prevState, name: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Location..."
            defaultValue={location}
            onChangeText={(text) =>
              setState((prevState) => ({ ...prevState, location: text }))
            }
          />
          <TouchableOpacity style={styles.button} onPress={sendPhoto}>
            <Text>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default CreatePostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,


        marginTop: 20
    },
    wrapper: {
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 343, 
        height: 240,
        backgroundColor: "#e8e8e8",
        borderRadius: 8
    },
    round: {
        alignItems: "center",
        justifyContent: "center",
        width: 44,
        height: 44,
        backgroundColor: "#fff",
        borderRadius: 50
    },
    text: {
        marginTop: 15,
        fontSize: 20
    },
    input: {
        width: 300,
        marginTop: 15,
    },
    camera: {
        justifyContent: "center",
        alignItems: "center",
        height: "40%",
        marginTop: 20,
        marginHorizontal: 3,
        backgroundColor: "#212121"
    },
    takePhotoContainer: {
        position: "absolute",
        top: 20,
        right: 20,
        borderColor: "#fff",
        borderWidth: 1,
    },
    buttonContainer: {

    },
    button: {
        marginTop: 15,
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "darkgrey",
        color: "#bdbdbd",
        borderRadius: 15,
    },
})