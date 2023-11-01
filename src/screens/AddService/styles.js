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
  modalButton: {
    backgroundColor: BaseColor.primaryColor,
    width: "100%",
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyImageContainer: {
    backgroundColor: "grey",
    width: "90%",
    height: 220,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    margin: 20
  },
  emptyImage: { width: 100, height: 100, alignSelf: "center" },
  scrollImageContainer: { flex: 1, justifyContent: "center", padding: 10 },
  imageStyle: {
    backgroundColor: "grey",
    width: "100%",
    height: 220,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20
  },
  cancelImage: { width: 40, height: 40 },
  uploadButton: {
    width: "50%",
    height: 40,
    borderRadius: 10,
    backgroundColor: BaseColor.primaryColor,
    marginHorizontal: 20,
    alignSelf: "center",
    justifyContent: "center"
  },
  uploadText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center"
  },
  deleteModalTitle: { color: BaseColor.greyColor, fontSize: 18 },
  deleteModalSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  deleteModalButton: {
    marginTop: 20,
    width: "40%",
    height: 40,
    borderRadius: 10,
    backgroundColor: BaseColor.primaryColor,
    alignSelf: "center",
    justifyContent: "center"
  },
  deleteModalButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center"
  },
  dropdown: {
    marginHorizontal: 10,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
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
  icon: {
    marginRight: 5
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
  },
  placeholderStyle: {
    fontSize: 16
  },
  selectedTextStyle: {
    fontSize: 16,
    color: BaseColor.darkPrimaryColor
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16
  },
  textStyle: { color: "black", fontSize: 16, margin: 10, marginTop: 15 },
  textInputHalfStyle: {
    backgroundColor: "white",
    marginHorizontal: 10,
    height: 40,
    borderRadius: 10,
    fontSize: 16,
    width: "45%"
  },
  textInputStyle: {
    backgroundColor: "white",
    marginHorizontal: 10,
    height: 40,
    borderRadius: 10,
    fontSize: 16
  },
  summitButton: {
    height: 40,
    width: "100%",
    backgroundColor: BaseColor.primaryColor,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  summitText: {
    color: BaseColor.greyColor,
    fontSize: 18,
    color: "white"
  }
});
