import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ComposeGreetingCardScreen = ({ navigation, route }) => {
  const { location, image, locationInfo } = route.params;
  const [message, setMessage] = useState("");

  const handleShare = () => {
    if (message.trim() === "") {
      Alert.alert(
        "Empty Message",
        "Are you sure you want to proceed with an empty message?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () =>
              navigation.navigate("Share", {
                location,
                image,
                message,
                locationInfo,
              }),
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate("Share", {
        location,
        image,
        message,
        locationInfo,
      });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#d6a4a4"]}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.title}>Compose Greeting Card</Text>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.location}>
          {locationInfo[0].city}, {locationInfo[0].region}
          {"\n"}
          {locationInfo[0].country}
          {"\n\n"}
          Coordinates: {location.coords.latitude.toFixed(2)},{" "}
          {location.coords.longitude.toFixed(2)}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Add a personalized message"
          onChangeText={setMessage}
          value={message}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share Greeting Card</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    minHeight: 300,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    fontSize: 16,
    textAlign: "center",
    minHeight: 60,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 10,
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

export default ComposeGreetingCardScreen;
