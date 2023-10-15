import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#CADFDD" },
  headerButtonStyle: { fontSize: 15, color: "white", right: 10 },
  cancelButtonContainer: {
    position: "absolute",
    right: 20,
    top: 30
  }
});
