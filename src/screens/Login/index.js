import React, { useState } from "react";
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
import { BaseColor, Images } from "@config";
import { CustomModal } from "@components";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [params, setParams] = useState({ email: "", password: "" });
  const [showSummitFail, setShowSummitFail] = useState({
    show: false,
    message: ""
  });

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
              onChangeText={(text) => setParams({ ...params, password: text })}
              secureTextEntry={true}
              style={styles.subTitlesTextInput}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if ((params.email == "", params.password == "")) {
                Alert.alert("Sorry", "All fields are required");
              } else {
                dispatch(AuthAction.authentication(params)).then((res) => {
                  if (res.success) {
                    navigation.navigate("Home");
                  } else {
                    setShowSummitFail({ show: true, message: res?.message });
                  }
                });
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
        <CustomModal
          title={"Error"}
          buttonText={"Ok"}
          buttonOnPress={() => {
            setShowSummitFail(false);
          }}
          cancelOnPress={() => {
            setShowSummitFail(false);
          }}
          subTitle={"Login Failed"}
          show={showSummitFail?.show}
        >
          <View
            style={{
              marginTop: 20
            }}
          >
            <Text style={{ color: BaseColor.greyColor, fontSize: 18 }}>
              {showSummitFail?.message}
            </Text>
            <TouchableOpacity
              style={styles.modalErrorButton}
              onPress={() => {
                setShowSummitFail(false);
              }}
            >
              <Text style={styles.modalErrorText}>Try again</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      </ImageBackground>
    </View>
  );
};

export default Login;
