import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigateFormBook } from "@/models/books";

const FloatingButton = ({ navigate }: NavigateFormBook) => {
  function handleNavigate() {
    router.replace(navigate as any);
  }

  return (
    <TouchableOpacity style={styles.floatingButton} onPress={handleNavigate}>
      <AntDesign
        testID="floatingButton"
        name="pluscircle"
        size={50}
        color="#6AB7E2"
      />
    </TouchableOpacity>
  );
};
export default FloatingButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: -5,
    bottom: -30,
  },
});
