import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const LocationSelectionScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      setInitialRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const confirmLocation = async () => {
    if (!location) {
      Alert.alert("Error", "Please select a location before proceeding.");
    } else {
      try {
        const locationInfo = await Location.reverseGeocodeAsync(
          location.coords
        );
        navigation.navigate("ImageSelection", { location, locationInfo });
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Location</Text>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onPress={(e) => {
            setLocation({ coords: e.nativeEvent.coordinate });
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          )}
        </MapView>
      )}
      <TouchableOpacity style={styles.button} onPress={confirmLocation}>
        <Text style={styles.buttonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: "70%",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ca8989",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LocationSelectionScreen;
