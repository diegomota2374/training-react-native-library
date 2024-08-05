import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { FormBookProps } from "@/models/books";
import useBookForm from "@/hooks/useBookForm";
import { ThemedView } from "../ThemedView/ThemedView";
import { ThemedText } from "../ThemedText/ThemedText";

const categories = [
  "Aventura",
  "Ação",
  "Romance",
  "Suspense",
  "Comédia",
  "Terror",
];

const BookForm = ({ initialBook }: FormBookProps) => {
  const { onSubmit, loading, control, handleSubmit, errors } = useBookForm(
    initialBook as any
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Título:</ThemedText>
      <Controller
        control={control}
        name="title"
        rules={{ required: "O Título é obrigatório" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            testID="title"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={value || "title"}
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
            testID="author"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={value || "author"}
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
            testID="category"
          >
            <Picker.Item label="Selecione uma categoria" value="" />
            {categories.map((category) => (
              <Picker.Item
                testID={category}
                key={category}
                label={category}
                value={category}
              />
            ))}
          </Picker>
        )}
      />
      {errors.genre && (
        <ThemedText style={styles.errorText}>{errors.genre.message}</ThemedText>
      )}

      <TouchableOpacity
        testID="submit-button"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
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
