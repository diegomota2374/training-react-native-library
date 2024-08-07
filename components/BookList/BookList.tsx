import { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView/ThemedView";
import BookItem from "../BookItem/BookItem";
import Pagination from "../Pagination/Pagination";
import FloatingButton from "../FloatingButton/FloatingButton";
import { ThemedText } from "../ThemedText/ThemedText";
import useFetchBooks from "@/hooks/useFetchBooks";
import Loading from "../Loading/Loading";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import useBookForm from "@/hooks/useBookForm";

const BookList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 4;

  const { books, totalPages, error, loading, refetch } = useFetchBooks(
    currentPage,
    itemsPerPage
  );
  const {
    isModalVisible,
    bookToDelete,
    onDeleteBook,
    setIsModalVisible,
    setBookToDelete,
  } = useBookForm(books as any);

  if (error) {
    return <ThemedText type="defaultSemiBold">{error}</ThemedText>;
  }

  // Função para deletar um livro e atualizar a lista
  const handleDeleteBook = async (id: number) => {
    await onDeleteBook(id);
    refetch(); // Atualiza a lista de livros após a exclusão
  };

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
              <BookItem
                key={i}
                book={item}
                setBookToDelete={setBookToDelete}
                setIsModalVisible={setIsModalVisible}
              />
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
      <ConfirmationModal
        visible={isModalVisible}
        onConfirm={() => {
          if (bookToDelete) handleDeleteBook(bookToDelete.id as any);
        }}
        onCancel={() => {
          setIsModalVisible(false);
          setBookToDelete(null);
        }}
        message="Tem certeza de que deseja excluir este livro?"
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  tableContente: {
    paddingBottom: 50,
  },
});

export default BookList;
