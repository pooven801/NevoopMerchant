import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer: { flex: 1 },
  subContainer: { alignSelf: "center", marginTop: -100 },
  backgroundContainer: {
    flex: 1,
    justifyContent: "center"
  },
  logoContainer: {
    width: 250,
    height: 290,
    resizeMode: "stretch",
    right: -15,
    alignSelf: "center"
  },
  title: {
    fontSize: 40,
    paddingTop: 50,
    color: "#4D5656",
    alignSelf: "center",
    fontWeight: "500"
  },
  subTitle: {
    bottom: 5,
    right: 15,
    position: "absolute",
    fontSize: 20,
    color: "#117A65",
    alignSelf: "center",
    fontWeight: "800"
  }
});
