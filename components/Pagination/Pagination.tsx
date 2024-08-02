import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView/ThemedView";
import { ThemedText } from "../ThemedText/ThemedText";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <ThemedView style={styles.pagination}>
      <TouchableOpacity
        style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
        onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ThemedText style={styles.pageButtonText}>{"<"}</ThemedText>
      </TouchableOpacity>
      <ThemedText
        style={styles.pageInfo}
      >{`${currentPage} / ${totalPages}`}</ThemedText>
      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
        onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <ThemedText style={styles.pageButtonText}>{">"}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    backgroundColor: "#6AB7E2",
    borderRadius: 5,
  },
  pageButtonText: {
    color: "#fff",
  },
  pageInfo: {
    marginHorizontal: 10,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default Pagination;
