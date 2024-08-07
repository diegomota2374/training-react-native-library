import BookForm from "@/components/BookForm/BookForm";
import ParallaxScrollView from "@/components/ParallaxScrollView/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView/ThemedView";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet } from "react-native";

const FormBook = () => {
  const { formBook } = useLocalSearchParams();

  const initialBook =
    formBook && formBook !== "form" ? JSON.parse(formBook as string) : "form";

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/titleBook.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <BookForm initialBook={initialBook} />
      </ThemedView>
    </ParallaxScrollView>
  );
};
export default FormBook;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
