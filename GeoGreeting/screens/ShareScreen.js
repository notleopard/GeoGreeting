import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as SMS from "expo-sms";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { db } from "../firebase/FirebaseConfig";
import { LinearGradient } from "expo-linear-gradient";

const ShareScreen = ({ route, navigation }) => {
  const { location, image, message, locationInfo } = route.params;

  const saveGreetingCard = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      Alert.alert("Error", "You must be logged in to save a greeting card.");
      navigation.navigate("Login");
      return;
    }
    const greetingCardData = {
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        city: locationInfo[0].city,
        region: locationInfo[0].region,
        country: locationInfo[0].country,
      },
      image: image,
      message: message,
      user: currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await db.collection("greetingCards").add(greetingCardData);
      Alert.alert("Success", "Greeting card saved successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Fail", "Greeting card failed to save");
    }
  };

  const shareByEmail = async () => {
    const subject = "Check out my GeoGreeting!";
    const body = `Hey! I wanted to share this GeoGreeting with you:\n\n${message}\n\nSent from: ${
      locationInfo[0].city
    }, ${locationInfo[0].region}, ${
      locationInfo[0].country
    } (${location.coords.latitude.toFixed(
      2
    )}, ${location.coords.longitude.toFixed(2)})`;

    const options = {
      recipients: [],
      subject,
      body,
      attachments: [image],
    };

    const result = await MailComposer.composeAsync(options);
    if (result.status === "sent") {
      Alert.alert("Success", "Email sent successfully");
    } else {
      Alert.alert("Error", "Email service is not available on this device");
    }
  };

  const shareBySMS = async () => {
    const body = `Hey! I wanted to share this GeoGreeting with you:\n\n${message}\n\nSent from: ${
      locationInfo[0].city
    }, ${locationInfo[0].region}, ${
      locationInfo[0].country
    } (${location.coords.latitude.toFixed(
      2
    )}, ${location.coords.longitude.toFixed(2)})`;

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const result = await SMS.sendSMSAsync([], body);
      if (result.result === "sent") {
        Alert.alert("Success", "SMS sent successfully");
      }
    } else {
      Alert.alert("Error", "SMS service is not available on this device");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#d6a4a4"]}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.title}>Share Greeting Card</Text>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.location}>
          Sent from: {locationInfo[0].city}, {locationInfo[0].region},{" "}
          {locationInfo[0].country}
          {"\n\n"}Coordinates: {location.coords.latitude.toFixed(2)},{" "}
          {location.coords.longitude.toFixed(2)}
        </Text>
        <Text style={styles.message}>Message: {message}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={shareByEmail}>
          <Text style={styles.buttonText}>Share by Email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={shareBySMS}>
          <Text style={styles.buttonText}>Share by SMS</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={saveGreetingCard}>
        <Text style={styles.buttonText}>Save The Greeting Card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.buttonText}>Main Menu</Text>
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
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ca8989",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ShareScreen;
