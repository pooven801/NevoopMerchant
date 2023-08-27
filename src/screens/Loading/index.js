import React, { useEffect } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import styles from "./styles";
// import { useSelector } from "react-redux";

const Loading = ({ navigation }) => {
  // const authUser = useSelector((state) => state.auth);

  const onProcess = () => {
    // let status = authUser.login;
    let status = true;
    switch (status) {
      case true:
        setTimeout(() => {
          // navigation.navigate("Home");
          navigation.navigate("Login");
        }, 1000);
        break;
      default:
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
        break;
    }
  };

  useEffect(() => {
    onProcess();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../../assets/images/peakpx.jpg")}
        resizeMode="cover"
        style={styles.backgroundContainer}
      >
        <View style={styles.subContainer}>
          <Image
            style={styles.logoContainer}
            source={require("../../assets/logos/logo.png")}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>Nevoop</Text>
            <Text style={styles.subTitle}>Merchant</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Loading;
