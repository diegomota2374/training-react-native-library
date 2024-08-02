// EditButton.tsx
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText/ThemedText";
import Feather from "@expo/vector-icons/Feather";

const EditButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.edit} onPress={onPress}>
      <ThemedText type="default">
        <Feather name="edit" size={24} color="white" />
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  edit: {
    padding: 5,
    marginLeft: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
});

export default EditButton;
