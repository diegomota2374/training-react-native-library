import { useCallback, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { ThemedView } from "../ThemedView/ThemedView";
import { Book } from "@/models/books";
import BookItem from "../BookItem/BookItem";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import FloatingButton from "../FloatingButton/FloatingButton";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const itemsPerPage = 4;

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const fetchBooks = useCallback(async () => {
    try {
      // get the total number books registers
      const totalItemBook = (await axios.get(`${apiUrl}/books`)).data.length;
      // get the books in json-server
      const res = await axios.get(`${apiUrl}/books`, {
        params: { _page: currentPage, _per_page: itemsPerPage },
      });
      setBooks(res.data["data"]);
      setTotalPages(Math.ceil(totalItemBook / itemsPerPage));
    } catch (error) {
      const errorMessage =
        "Erro ao buscar livro. Verifique sua conexão de rede.";
      setError(errorMessage);
      Alert.alert("Erro", errorMessage);
    }
  }, [currentPage]);

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
          <BookItem key={item.id} book={item} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </ThemedView>
      <FloatingButton />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  tableContente: {
    paddingBottom: 50,
  },
});

export default BookList;
