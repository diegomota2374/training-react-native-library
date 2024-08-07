import { useState } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Controller, useFormContext } from "react-hook-form";

const PickImage = ({ control, name, rules }) => {
  const { setValue, getValues } = useFormContext();
  const [image, setImage] = useState(getValues(name) || null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setValue(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue(name, result.assets[0].uri, { shouldValidate: true });
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ fieldState: { error } }) => (
        <View style={styles.container}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default PickImage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});
