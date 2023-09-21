import { StyleSheet, Platform, StatusBar } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  mainContainer: { flex: 1 },
  subContainer: {
    marginTop: 20,
    marginHorizontal: 30
  },
  subTitlesText: {
    fontSize: 15,
    paddingVertical: 10,
    color: "#138D75"
  },
  subTitlesTextInput: {
    backgroundColor: "#CCD1D1",
    color: "black",
    fontSize: 20,
    borderRadius: 10,
    height: 45
  },
  uploadButtonContainer: {
    width: "100%",
    height: 160,
    backgroundColor: "grey",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  uploadButtonSub: {
    backgroundColor: BaseColor.primaryColor,
    height: 40,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: BaseColor.darkPrimaryColor,
    borderWidth: 2,
    width: 80
  },
  modalButton: {
    backgroundColor: BaseColor.primaryColor,
    width: "100%",
    height: 40,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  modalSuccessContainer: {
    marginTop: 20
  },
  textStyle: {
    color: BaseColor.greyColor,
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center"
  },
  modalSuccessButton: {
    backgroundColor: BaseColor.primaryColor,
    height: 40,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  modalSuccessText: {
    color: BaseColor.greyColor,
    fontSize: 18,
    alignSelf: "center",
    color: "white"
  },
  modalErrorButton: {
    backgroundColor: BaseColor.primaryColor,
    height: 40,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  modalErrorText: {
    color: BaseColor.greyColor,
    fontSize: 18,
    alignSelf: "center",
    color: "white"
  },
  headerButtonStyle: { fontSize: 15, color: "white", right: 10 },
  imageContainer: {
    width: "100%",
    height: 170,
    borderRadius: 10,
    backgroundColor: "grey"
  },
  cancelButtonContainer: {
    position: "absolute",
    right: 10,
    top: 10
  }
});
