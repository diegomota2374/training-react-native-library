// DeleteButton.tsx
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText/ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";

const DeleteButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.delete} onPress={onPress}>
      <ThemedText type="default">
        <AntDesign name="delete" size={24} color="red" />
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  delete: {
    padding: 2,
    marginLeft: 10,
    borderStyle: "solid",
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 2,
  },
});

export default DeleteButton;
