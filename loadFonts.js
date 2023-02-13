import { Platform, View } from "react-native";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
};

export default () => {
    const [Ready, setReady] = useState(false);
    
    const onPressButton = () => {
        alert("You've pressed me")
    }
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadFonts}
        finish={() => setReady(true)}
      ></AppLoading>
    );
    }
    return <View style={styles.container}><View style={styles.buttonContainer}><Button onPress={onPressButton} title={"Press me"} /></View></View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...Platform.select({
            ios: {
                backgroundColor: "#000"
            },
            androind: {
                backgroundColor: "#fff"
            }
        }),
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        paddingHorizontal: 6,
        paddingVertical: 6,
        backgroundColor: "green"
    }
})
