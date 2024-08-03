import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText/ThemedText";
import { ThemedView } from "../ThemedView/ThemedView";

const Loading = () => {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator
        testID="activity-indicator"
        size="large"
        color="#6AB7E2"
      />
      <ThemedText style={styles.loadingText}>Carregando...</ThemedText>
    </ThemedView>
  );
};
export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#132026",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
});
