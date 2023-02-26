import { Camera } from 'expo-camera';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"; 
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { db, storage } from '../../../config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from '@reduxjs/toolkit';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

const CreatePostsScreen = ({navigation}) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cameraPermissions, setCameraPermissions] = useState(null);

  const [state, setState] = useState({
      name: "",
    locationInfo: null,
        locationName: "",
    latitude: "",
    longitude: "",
      id: "",
  })
  const { userId, nickName, stateChange } = useSelector(state => state.auth)
  const { name, locationInfo, locationName} = state;
  console.log("cameraPermissions", cameraPermissions)
  console.log("name", name, "location", locationInfo, "photo", photo);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermissions(cameraStatus.status === 'granted');
      const {status} = await Location.requestForegroundPermissionsAsync();
      console.log("status", status)
      if (status !== "granted") {
        alert("You do not belong in here")
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setState({locationInfo: locationRes})
    })();
  }, []);

  const TakePhoto = async () => {
    if (camera) {
        const snap = await camera.takePictureAsync(null);
        setPhoto(snap.uri);
      }
      // console.log("snap", snap)

      const loc = await Location.getCurrentPositionAsync();



      setState({
        locationInfo: loc
      });
    };

  const sendPhoto = () => {
    uploadPostToServer();
    if (photo) {
      navigation.navigate("Posts", {
        photo,
      });
    }

  };

  const uploadPostToServer = async () => {
    uploadPhotoToServer();
    const createPost = await addDoc(collection(db, "posts"),
      {
        photo: photo || null, name: nickName || null,
        locationInfo: locationInfo,
        locationText: locationName || null,
        id: userId || null, comment: name || null
      });
    console.log("doc with ID", createPost.id);
    setState({id: createPost.id})
  }

  const handleInputChange = (e) => {
    setName(e.target.value)
  }

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = nanoid()

    const storageRef = ref(storage, `photos/${uniquePostId}`);
    
    const processedPhoto = uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => setState({photo: url}))
    })
    
    return processedPhoto
  }

  if (cameraPermissions === false) {
    <Text>No appropriate photo</Text>
  }
  
    return (
      <View style={styles.container}>
        <Camera style={{ ...styles.camera, backgroundColor: "#212121" }} ref={ref => setCamera(ref)}>

            <View style={styles.takePhotoContainer}>
              <Image
                source={{ uri: photo }}
                style={{ width: 100, height: 100 }}
              />
            </View>
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
              setState((prevState) => ({ ...prevState, locationName: text }))
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