import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { FormBookProps, Book } from "@/models/books";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const useBookForm = ({ initialBook }: FormBookProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Book>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (typeof initialBook === "string" && initialBook !== "forme") {
        try {
          console.log(initialBook);
          const book = JSON.parse(initialBook) as Book;
          setValue("id", book.id);
          setValue("title", book.title);
          setValue("author", book.author);
          setValue("genre", book.genre);
        } catch (error) {
          console.error("Failed to parse initialBook:", error);
        }
      } else if (typeof initialBook === "object" && initialBook !== null) {
        const book = initialBook as Book;
        setValue("id", book.id);
        setValue("title", book.title);
        setValue("author", book.author);
        setValue("genre", book.genre);
      } else {
        setValue("title", "");
        setValue("author", "");
        setValue("genre", "");
      }
    }, [initialBook, setValue])
  );

  const onSubmit = async (data: Book) => {
    setLoading(true);
    try {
      if (data.id) {
        await axios.put(`${apiUrl}/books/${data.id}`, data);
        Alert.alert("Livro atualizado com sucesso!");
      } else {
        await axios.post(`${apiUrl}/books`, data);
        Alert.alert("Livro adicionado com sucesso!");
      }
      router.back();
    } catch (error) {
      console.error("Error saving book:", error);
      Alert.alert("Erro ao salvar livro. Verifique sua conexão de rede.");
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    loading,
    control,
    handleSubmit,
    setValue,
    getValues,
    errors,
  };
};
export default useBookForm;
