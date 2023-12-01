import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

const ImageSelectionScreen = ({ navigation, route }) => {
  const { location, locationInfo } = route.params;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      } else {
        alert("Could not find the selected image. Please try again.");
      }
    }
  };

  const handleNext = () => {
    if (!image) {
      alert("Please select an image before proceeding.");
    } else {
      navigation.navigate("ComposeGreetingCard", {
        location,
        image,
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
      <Text style={styles.title}>Select an Image</Text>
      {image ? (
        <Image source={{ uri: image }} style={styles.selectedImage} />
      ) : (
        <Text style={styles.placeholder}>No image selected</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
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
  selectedImage: {
    width: "80%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  placeholder: {
    width: 200,
    height: 200,
    backgroundColor: "#eee",
    marginBottom: 20,
    textAlign: "center",
    verticalAlign: "middle",
  },
  button: {
    backgroundColor: "#ca8989",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ImageSelectionScreen;
