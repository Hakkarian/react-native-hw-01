import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"; 

const CreatePostsScreen = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer}>
          <View style={styles.round}>
            <MaterialIcons name="camera-alt" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Upload photo</Text>
        <TextInput
          style={styles.input}
          placeholder="Name..."

        />
        <TextInput
          style={styles.input}
          placeholder="Location..."

            />
        <TouchableOpacity style={styles.button}><Text>Publish</Text></TouchableOpacity>
      </View>
    );
}

export default CreatePostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 20
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