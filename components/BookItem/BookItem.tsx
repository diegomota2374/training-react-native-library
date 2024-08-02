import { Image, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Book } from "@/models/books";

const BookItem = ({ book }: { book: Book }) => {
  return (
    <ThemedView key={book.id} style={styles.container}>
      <Image
        style={styles.bookImg}
        source={{
          uri: book.img,
        }}
      />
      <ThemedView style={styles.textContainer}>
        <ThemedText type="subtitle">{book.title}</ThemedText>
        <ThemedText type="default">{book.author}</ThemedText>
        <ThemedText type="default">{book.genre}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(82, 154, 189)",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  bookImg: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  textContainer: {
    backgroundColor: "rgb(82, 154, 189)",
  },
  text: {
    marginBottom: 4,
  },
});
export default BookItem;
