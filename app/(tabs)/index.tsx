import React, { useState, useEffect } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function TabOneScreen() {
  const [hasLibraryPermission, setHasLibraryPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasLibraryPermission(libraryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    if (hasLibraryPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.uri);
      }
    }
  };

  if (hasLibraryPermission === null) {
    return <View />;
  }

  if (hasLibraryPermission === false) {
    return <Text>No access to media library</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an Image</Text>
      <Button title="Select Image from Camera Roll" onPress={pickImage} />
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
