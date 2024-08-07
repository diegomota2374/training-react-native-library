import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  message,
  containerStyle,
  textStyle,
}: ConfirmationModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={[styles.modalContainer, containerStyle]}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalText, textStyle]}>{message}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" color="gray" onPress={onCancel} />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#6AB7E2" }]}
              onPress={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Confirmar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#2f2f2f",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export default ConfirmationModal;
