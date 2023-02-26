import { StyleSheet, Text, View } from "react-native"
import MapView, {Marker} from "react-native-maps";


const MapScreen = ({ route }) => {
  console.log(route.params)
  const locationInfo = route.params.locationInfo;
  console.log( locationInfo )
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: locationInfo.coords.latitude,
            longitude: locationInfo.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: locationInfo.coords.latitude,
              longitude: locationInfo.coords.longitude,
            }}
            title="travel photo"
          />
        </MapView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    }
})

export default MapScreen;