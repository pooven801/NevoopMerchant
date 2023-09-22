import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import styles from "./styles";
import { useDispatch } from "react-redux";
import * as AuthAction from "@actions/AuthAction";
// import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  // const authUser = useSelector((state) => state.auth);
  const [params, setParams] = useState({ email: "", pwd: "" });
  const dispatch = useDispatch();

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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={styles.title}>NEVOOP</Text>
            <Text style={styles.subTitle}>HOME</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(AuthAction.authentication(null)).then((res) => {
                if (res.success) {
                  navigation.navigate("Login");
                }
              });
            }}
            style={{ width: "100%", height: 80, backgroundColor: "red" }}
          ></TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Home;
