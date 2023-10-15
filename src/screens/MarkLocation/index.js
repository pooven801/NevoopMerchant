import React, { useEffect } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import styles from "./styles";
import { useSelector } from "react-redux";
import MapView from "react-native-maps";
import { CustomStatusBar, Header } from "@components";
import { BaseColor } from "@config";

const MarkLocation = ({ navigation }) => {
  const authUser = useSelector((state) => state.auth);
  const initialRegion = {
    latitude: 3.085252,
    longitude: 101.692468,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar
        backgroundColor={BaseColor.primaryColor}
        barStyle="light-content"
      />
      <Header
        ignoreBottomBorder={true}
        style={{
          backgroundColor: BaseColor.primaryColor
        }}
        title={"Mark Location"}
        renderLeft={() => {
          return (
            <Text
              style={[
                styles.headerButtonStyle,
                Platform.OS === "ios" && { fontSize: 14 }
              ]}
            >
              Back
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <MapView
        style={{ height: "100%", width: "100" }}
        initialRegion={initialRegion}
        onMapReady={(res) => {
          console.log(res);
        }}
      />
      <View
        style={{
          width: "100%",
          height: "20%",
          backgroundColor: BaseColor.primaryColor,
          zIndex: 9999,
          position: "absolute",
          bottom: 0,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40
        }}
      ></View>
    </View>
  );
};

export default MarkLocation;
