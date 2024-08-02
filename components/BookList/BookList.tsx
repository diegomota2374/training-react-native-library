import { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { ThemedView } from "../ThemedView";
import { Book } from "@/models/books";
import BookItem from "../BookItem/BookItem";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchBooks = useCallback(async () => {
    try {
      // get the total number books registers
      const totalItemBook = (await axios.get(`${apiUrl}/books`)).data.length;
      // get the books in json-server
      const res = await axios.get(`${apiUrl}/books`, {
        params: { _page: 1, _per_page: 2 },
      });
      setBooks(res.data["data"]);
    } catch (error) {
      const errorMessage =
        "Erro ao buscar livro. Verifique sua conexão de rede.";
      setError(errorMessage);
      Alert.alert("Erro", errorMessage);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [fetchBooks])
  );
  console.log(books);

  return (
    <ThemedView>
      <ThemedView style={styles.tableContente}>
        {books.map((item) => (
          <BookItem book={item} />
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  tableContente: {
    maxHeight: 500,
  },
});

export default BookList;
