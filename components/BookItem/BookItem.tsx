import { useState } from "react";
import { Image, StyleSheet, Animated, TouchableOpacity } from "react-native";

import { Book } from "@/models/books";

import { ThemedView } from "../ThemedView/ThemedView";
import { ThemedText } from "../ThemedText/ThemedText";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { router } from "expo-router";

interface BookItemProps {
  book: Book;
  setBookToDelete: (book: Book | null) => void;
  setIsModalVisible: (visible: boolean) => void;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  setBookToDelete,
  setIsModalVisible,
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  //anime the button if pressed
  const toggleButtons = () => {
    if (showButtons) {
      Animated.timing(animation, {
        toValue: showButtons ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowButtons((prev) => !prev));
    } else {
      setShowButtons(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  //show the button
  const buttonOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  //forwards to the form in edit mode
  const useEditBook = (item: Book) => {
    const encodedBook = encodeURIComponent(JSON.stringify(item));
    router.navigate(`/book/${encodedBook}`);
  };

  return (
    <TouchableOpacity
      onPress={toggleButtons}
      style={styles.container}
      activeOpacity={0.7}
    >
      <ThemedView style={styles.ItemContainer}>
        <Image
          style={styles.bookImg}
          source={{
            uri: book.image,
          }}
        />
        <ThemedView style={styles.textContainer}>
          <ThemedText type="subtitle" numberOfLines={1} ellipsizeMode="tail">
            {book.title}
          </ThemedText>
          <ThemedText type="default" numberOfLines={1} ellipsizeMode="tail">
            {book.author}
          </ThemedText>
          <ThemedText type="default" numberOfLines={1} ellipsizeMode="tail">
            {book.genre}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      {/* show the buttons if pressed item list */}
      {showButtons && (
        <Animated.View
          style={[styles.buttonContainer, { opacity: buttonOpacity }]}
        >
          <EditButton onPress={() => useEditBook(book)} />
          <DeleteButton
            onPress={() => {
              setBookToDelete(book);
              setIsModalVisible(true);
            }}
          />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-end",
    backgroundColor: "rgb(82, 154, 189)",
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  ItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(82, 154, 189)",
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  bookImg: {
    width: 60,
    height: 70,
    marginRight: 10,
  },
  textContainer: {
    width: 200,
    backgroundColor: "rgb(82, 154, 189)",
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 5,
  },
  text: {
    marginBottom: 4,
    flexShrink: 1,
  },
});
export default BookItem;
