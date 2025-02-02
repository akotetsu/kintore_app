import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  inner: {
    flex: 1, // ここを修正（必要なら削除）
    padding: 15, // 余白を確保
  },
  scrollContainer: {
    flexGrow: 1, // ここを追加してスクロール可能に
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    color: "white",
  },
  dropdown: {
    marginBottom: 16,
    borderColor: "#ccc",
    backgroundColor: "#333",
  },
  dropdownContainer: {
    borderColor: "#ccc",
    backgroundColor: "#333",
  },
  textWhite: {
    color: "white",
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#444",
  },
  dateButtonText: {
    fontSize: 16,
    color: "white",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
