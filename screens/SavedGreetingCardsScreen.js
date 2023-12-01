import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../authcontext/AuthContext";

const SavedGreetingCardsScreen = () => {
  const [greetingCards, setGreetingCards] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("greetingCards")
      .where("user", "==", user.uid)
      .onSnapshot((snapshot) => {
        const cards = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGreetingCards(cards);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.location}>
        {item.location.city}, {item.location.region}
        {"\n"}
        {item.location.country}
        {"\n\n"}Coords: ({item.location.latitude.toFixed(2)},{" "}
        {item.location.longitude.toFixed(2)})
      </Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#d6a4a4"]}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.title}>Saved Greeting Cards</Text>
      <FlatList
        data={greetingCards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
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
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  location: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  list: {
    paddingRight: 80,
    paddingLeft: 80,
  },
});

export default SavedGreetingCardsScreen;
