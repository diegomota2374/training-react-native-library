import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView/ThemedView";
import BookItem from "../BookItem/BookItem";
import Pagination from "../Pagination/Pagination";
import FloatingButton from "../FloatingButton/FloatingButton";
import { ThemedText } from "../ThemedText/ThemedText";
import useFetchBooks from "@/hooks/useFetchBooks";
import Loading from "../Loading/Loading";

const BookList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 4;

  const { books, totalPages, error, loading } = useFetchBooks(
    currentPage,
    itemsPerPage
  );

  if (error) {
    return <ThemedText type="defaultSemiBold">{error}</ThemedText>;
  }

  return (
    <ThemedView>
      {loading ? (
        <ThemedView>
          <Loading />
        </ThemedView>
      ) : (
        <ThemedView>
          <ThemedView style={styles.tableContente}>
            {books.map((item, i) => (
              <BookItem key={i} book={item} />
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </ThemedView>
          <FloatingButton navigate="/book/form" />
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  tableContente: {
    paddingBottom: 50,
  },
});

export default BookList;
