import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#CADFDD" },
  headerButtonStyle: { fontSize: 15, color: "white", right: 10 },
  cancelButtonContainer: {
    position: "absolute",
    right: 20,
    top: 30
  },
  emptyImageContainer: {
    width: 100,
    height: 80,
    alignSelf: "center",
    margin: 10,
    borderRadius: 10,
    backgroundColor: BaseColor.primaryColor
  },
  emptyImage: {
    width: 80,
    height: 60,
    alignSelf: "center",
    margin: 10,
    borderRadius: 10
  },
  imageStyle: {
    width: 100,
    height: 80,
    alignSelf: "center",
    margin: 10,
    borderRadius: 10
  },
  dropdownMain: {
    marginHorizontal: 10,
    height: 30,
    width: "50%",
    alignSelf: "center",
    backgroundColor: BaseColor.lightPrimaryColor,
    borderWidth: 1.5,
    borderColor: BaseColor.primaryColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textItem: {
    flex: 1,
    fontSize: 16
  }
});
