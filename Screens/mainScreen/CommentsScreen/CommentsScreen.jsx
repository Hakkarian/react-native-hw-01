import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addDoc, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config";
import { postsRef } from "../PostsScreen/PostsScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const CommentsScreen = ({ route }) => {
    const {nickName, userId} = useSelector(store => store.auth)
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
    const { id } = route.params;

  console.log("comment", comment, "nichName", nickName)
  
  console.log(allComments)

  useEffect(() => {
    getAllPost();
  }, [])

    
  const sendComment = () => {
    setComment("");
        const docRef = doc(db, "posts", id);
        const commentsRef = collection(docRef, "comments");
    addDoc(commentsRef, { comment: comment, nickName: nickName })
    }

  const getAllPost = () => {
    setAllComments([]);
     const docRef = doc(db, "posts", id);
     const commentsRef = collection(docRef, "comments");
      onSnapshot(commentsRef, (docsSnap) =>
        setAllComments(docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
    }
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <FlatList style={{flexDirection: "column-reverse"}} data={allComments} renderItem={({ item }) => <View style={styles.commentWrapper}>
            <Text style={styles.nickname}>{item.nickName}</Text>
            <View style={styles.textWrapper}>
              <Text>{item.comment}</Text>
            </View>
          </View>} />
        </SafeAreaView>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            placeholder="Comment..."
            onChangeText={(text) => setComment(text)}
          />
          <TouchableOpacity style={styles.button} onPress={sendComment}>
            <AntDesign name="arrowup" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    justifyContent: "flex-end",
        marginHorizontal: 10,

    },
    wrapper: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "darkgrey",
        borderRadius: 30
    },
    input: {
        height: 40
    },
  button: {
    justifyContent: "center",
    alignItems: "center",
      padding: 10,

    borderRadius: 50,
    backgroundColor: "#FF6C00",
  },
  commentWrapper: {

    height: 100,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "lightgrey",
    borderRadius: 15
  },
  nickname: {
    fontSize: 20
  },
  textWrapper: {
    padding: 5
  }
});

export default CommentsScreen;
