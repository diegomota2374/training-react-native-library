import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Alert } from "react-native";
import { FormBookProps, Book } from "@/models/books";
import useFetchBooks from "./useFetchBooks";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const useBookForm = ({ initialBook }: FormBookProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Book>({
    defaultValues: initialBook as any,
  });

  useEffect(() => {
    if (typeof initialBook === "string" && initialBook !== "form") {
      try {
        const book = JSON.parse(initialBook) as Book;
        Object.keys(book).forEach((key) => {
          setValue(key as keyof Book, book[key as keyof Book]);
        });
      } catch (error) {
        console.error("Failed to parse initialBook:", error);
      }
    } else if (typeof initialBook === "object" && initialBook !== null) {
      const book = initialBook as Book;
      Object.keys(book).forEach((key) => {
        setValue(key as keyof Book, book[key as keyof Book]);
      });
    }
  }, [initialBook, setValue]);

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

  const onDeleteBook = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${apiUrl}/books/${id}`);
      // setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
      // setError("Error deleting book.");
    } finally {
      setLoading(false);
    }
    setIsModalVisible(false);
    setBookToDelete(null);
  };

  return {
    onSubmit,
    loading,
    control,
    onDeleteBook,
    isModalVisible,
    setIsModalVisible,
    bookToDelete,
    setBookToDelete,
    handleSubmit,
    setValue,
    errors,
  };
};

export default useBookForm;
