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
// import { useSelector } from "react-redux";

const Login = ({ navigation }) => {
  // const authUser = useSelector((state) => state.auth);
  const [params, setParams] = useState({ email: "", pwd: "" });

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
            <Text style={styles.subTitle}>Merchant</Text>
          </View>
        </View>
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
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              top: 20
            }}
            onPress={() => {
              navigation.navigate("Registration");
            }}
          >
            <Text
              style={{
                color: "#138D75",
                fontSize: 16
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
