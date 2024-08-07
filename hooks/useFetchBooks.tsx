// useFetchBooks.ts
import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const useFetchBooks = (currentPage: number, itemsPerPage: number) => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      // Get the total number of book records
      const totalItemBook = (await axios.get(`${apiUrl}/books`)).data.length;
      // Get the books from json-server
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
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [fetchBooks])
  );

  return { books, totalPages, error, loading, fetchBooks, refetch: fetchBooks };
};

export default useFetchBooks;
