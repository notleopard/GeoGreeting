import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#d6a4a4"]}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.title}>Welcome to GeoGreeting</Text>
      <Text style={styles.description}>
        Create and share custom greeting cards based on your location.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LocationSelection")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SavedGreetingCards")}
      >
        <Text style={styles.buttonText}>View Saved Cards</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#ca8989",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
