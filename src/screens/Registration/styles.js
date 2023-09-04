import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  mainContainer: { flex: 1 },
  subContainer: { alignSelf: "center" },
  backgroundContainer: {
    flex: 1,
    justifyContent: "center"
  },
  logoContainer: {
    width: 250,
    height: 290,
    resizeMode: "stretch",
    right: -15,
    top: -30,
    alignSelf: "center"
  },
  title: {
    fontSize: 40,
    // paddingTop: 50,
    color: "#4D5656",
    alignSelf: "center",
    fontWeight: "500"
  },
  subTitle: {
    bottom: 5,
    right: -5,
    bottom: -8,
    // position: "absolute",
    fontSize: 20,
    color: "#117A65",
    alignSelf: "center",
    fontWeight: "800"
  },
  titleText: {
    fontSize: 30,
    padding: 15,
    marginLeft: 5,
    color: "white",
    alignSelf: "center"
  },

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

  buttonContainer: {
    width: "90%",
    height: 55,
    justifyContent: "center",
    backgroundColor: "#138D75",
    borderRadius: 20,
    marginTop: 35,
    alignSelf: "center"
  },

  buttonText: {
    fontSize: 18,
    padding: 10,
    marginLeft: 5,
    alignSelf: "center",
    fontWeight: "bold",
    color: "white"
  }
});
