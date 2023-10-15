import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  StatusBar,
  ScrollView
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "@actions/AuthAction";
import { CustomStatusBar, Header } from "@components";
import { BaseColor } from "@config";
import FoodForm from "./FoodForm";
// import { useSelector } from "react-redux";

const AddService = ({ navigation }) => {
  const [params, setParams] = useState({ email: "", pwd: "" });
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);
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
        title={"Add Service"}
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
        onPressRight={() => {
          // callRegisterMerchant();
          navigation.navigate("MarkLocation");
        }}
        renderRight={() => {
          return (
            <Text
              style={[
                styles.headerButtonStyle,
                Platform.OS === "ios" && { fontSize: 14 }
              ]}
            >
              Submit
            </Text>
          );
        }}
      />
      <ScrollView>
        <FoodForm
          mapOnPress={() => {
            navigation.navigate("MarkLocation");
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AddService;
