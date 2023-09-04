import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform
} from "react-native";
import styles from "./styles";
import { BaseColor } from "@config";
import { HomeHeader, Header, CustomStatusBar } from "@components";
// import { useSelector } from "react-redux";

const Registration = ({ navigation }) => {
  // const authUser = useSelector((state) => state.auth);
  const [params, setParams] = useState({ email: "", pwd: "" });

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
        title={"Registration"}
        renderLeft={() => {
          return <Text style={{ fontSize: 16, color: "white" }}>Back</Text>;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{}}>
        <View style={styles.subContainer}>
          <Text style={styles.subTitlesText}>Email Address</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, email: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"email-address"}
          />
          <Text style={styles.subTitlesText}>Password</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, pwd: text })}
            secureTextEntry={true}
            style={styles.subTitlesTextInput}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if ((params.email == "", params.pwd == "")) {
              Alert.alert("Sorry", "All fields are required");
            } else {
              // dispatch(AuthAction.authentication(params)).then((res) => {
              //   if (res) {
              //     console.log("Ggtry me", res);
              //     navigation.navigate("Home");
              //   } else {
              //     Alert.alert("Sorry", "Authentication Error");
              //   }
              // });
            }
          }}
          style={[
            styles.buttonContainer,
            { backgroundColor: BaseColor.primaryColor }
          ]}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration;
