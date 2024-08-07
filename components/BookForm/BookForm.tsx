import React, { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Button,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { FormBookProps, Book } from "@/models/books";
import useBookForm from "@/hooks/useBookForm";
import { ThemedView } from "../ThemedView/ThemedView";
import { ThemedText } from "../ThemedText/ThemedText";
import { useFocusEffect } from "expo-router";

const categories = [
  "Aventura",
  "Ação",
  "Romance",
  "Suspense",
  "Comédia",
  "Terror",
];

const BookForm = ({ initialBook }: FormBookProps) => {
  const methods = useForm<Book>({
    defaultValues: initialBook as any,
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = methods;

  const { onSubmit, loading } = useBookForm(initialBook as any);
  const [image, setImage] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (initialBook && typeof initialBook !== "string") {
        const book = initialBook as Book;
        reset(book);
        setImage(book.image || null);
      } else {
        reset({ title: "", author: "", genre: "", image: "" });
        setImage(null);
      }
    }, [initialBook, reset])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setImage(selectedImage);
      setValue("image", selectedImage, { shouldValidate: true });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Título:</ThemedText>
      <Controller
        control={control}
        name="title"
        rules={{ required: "O Título é obrigatório" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Título"
          />
        )}
      />
      {errors.title && (
        <ThemedText style={styles.errorText}>{errors.title.message}</ThemedText>
      )}

      <ThemedText style={styles.label}>Autor:</ThemedText>
      <Controller
        control={control}
        name="author"
        rules={{ required: "O Autor é obrigatório" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Autor"
          />
        )}
      />
      {errors.author && (
        <ThemedText style={styles.errorText}>
          {errors.author.message}
        </ThemedText>
      )}

      <ThemedText style={styles.label}>Categoria:</ThemedText>
      <Controller
        control={control}
        name="genre"
        rules={{ required: "A Categoria é obrigatória" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            selectedValue={value}
            style={styles.picker}
            onValueChange={(itemValue) => onChange(itemValue)}
            onBlur={onBlur}
          >
            <Picker.Item label="Selecione uma categoria" value="" />
            {categories.map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        )}
      />
      {errors.genre && (
        <ThemedText style={styles.errorText}>{errors.genre.message}</ThemedText>
      )}

      <ThemedText style={styles.label}>Imagem:</ThemedText>
      <Controller
        control={control}
        name="image"
        rules={{ required: "A Imagem é obrigatória" }}
        render={({ field: { value }, fieldState: { error } }) => (
          <View style={styles.imagePickerContainer}>
            <Button
              title="Pick an image from camera roll"
              onPress={pickImage}
            />
            {value && <Image source={{ uri: value }} style={styles.image} />}
            {error && (
              <ThemedText style={styles.errorText}>{error.message}</ThemedText>
            )}
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <ThemedText style={styles.buttonText}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : typeof initialBook !== "string" ? (
            "Editar Livro"
          ) : (
            "Adicionar Livro"
          )}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default BookForm;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#132026",
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  imagePickerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6AB7E2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
