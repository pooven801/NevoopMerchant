import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { CustomStatusBar, Header } from "@components";
import { BaseColor } from "@config";

const MarkLocation = ({ navigation, route }) => {
  const authUser = useSelector((state) => state.auth);
  const [markedCoordinate, setMarkedCoordinate] = useState(
    route.params.markedCoordinate
  );
  const initialRegion = {
    latitude: markedCoordinate.latitude,
    longitude: markedCoordinate.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };
  console.log(route.params);
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
        style={{ height: "100%", width: "100%" }}
        initialRegion={initialRegion}
        onMapReady={(res) => {
          // console.log(res);
        }}
        onPress={(res) => {
          setMarkedCoordinate(res.nativeEvent.coordinate);
        }}
      >
        <Marker
          draggable
          coordinate={markedCoordinate}
          onDragEnd={(e) => setMarkedCoordinate(e.nativeEvent.coordinate)}
        />
      </MapView>
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
      >
        <Text
          style={{
            color: "white",
            fontStyle: "italic",
            fontSize: 20,
            alignSelf: "center",
            top: 20
          }}
        >
          Latitude: {markedCoordinate.latitude}
          {"\n"}Longitude: {markedCoordinate.longitude}
        </Text>
        <TouchableOpacity
          style={{
            width: "80%",
            height: "30%",
            backgroundColor: BaseColor.darkPrimaryColor,
            borderRadius: 10,
            position: "absolute",
            alignSelf: "center",
            bottom: 30,
            justifyContent: "center"
          }}
          onPress={(res) => {
            route.params.updateLocation(markedCoordinate);
            navigation.goBack({ param: "dscsd" });
          }}
        >
          <Text style={{ color: "white", fontSize: 18, alignSelf: "center" }}>
            Mark Coordinate
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MarkLocation;
