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
  StatusBar
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "@actions/AuthAction";
import { CustomStatusBar } from "@components";
import { BaseColor } from "@config";
// import { useSelector } from "react-redux";

const AddService = ({ navigation }) => {
  // const authUser = useSelector((state) => state.auth);
  const [params, setParams] = useState({ email: "", pwd: "" });
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);
  console.log(authUser);
  return (
    <View style={styles.mainContainer}>
      <Text style={{ fontSize: 30, alignSelf: "center", top: 100 }}>
        ADD Service
      </Text>
    </View>
  );
};

export default AddService;
