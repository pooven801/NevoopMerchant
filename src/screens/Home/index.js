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
  Dimensions
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "@actions/AuthAction";
import { CustomStatusBar } from "@components";
import { BaseColor, GreenColor } from "@config";
// import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  // const authUser = useSelector((state) => state.auth);
  const [params, setParams] = useState({ email: "", pwd: "" });
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.data);
  const subItemsFirst = ["Add Service", "Service List", "Payout"];
  const subItemsSecond = ["Booking", "Status", "Support"];
  console.log(authUser);
  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar
        backgroundColor={BaseColor.primaryColor}
        barStyle="light-content"
      />
      <View
        style={{
          minHeight: "25%",
          width: "90%",
          backgroundColor: BaseColor.darkPrimaryColor,
          borderRadius: 20,
          alignSelf: "center",
          marginTop: Platform.OS == "android" ? 40 : 20
        }}
      >
        <Image
          src={authUser?.icImg}
          style={{
            width: 140,
            height: "80%",
            borderRadius: 10,
            position: "absolute",
            right: 20,
            top: 20,
            alignSelf: "center",
            backgroundColor: "grey"
          }}
        />
        <View style={{ margin: 15 }}>
          <Text style={{ color: "white" }}>Company Name</Text>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
            {authUser.companyName}
          </Text>
          <Text style={{ color: "white" }}>SSM No</Text>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
            {authUser.ssmno}
          </Text>
          <Text style={{ color: "white" }}>Balance</Text>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
            RM 42344
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: GreenColor.primaryColor,
              width: 100,
              height: 30,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "green",
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              Cash Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: "row", marginTop: 40 }}>
        {subItemsFirst.map((res) => {
          return (
            <TouchableOpacity
              style={{
                width: Dimensions.get("window").width / 3 - 10,
                marginHorizontal: 5,
                height: 100,
                borderRadius: 10,
                backgroundColor: BaseColor.primaryColor
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  position: "absolute",
                  alignSelf: "center",
                  bottom: "0",
                  justifyContent: "center"
                }}
              >
                {res}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {subItemsSecond.map((res) => {
          return (
            <TouchableOpacity
              style={{
                width: Dimensions.get("window").width / 3 - 10,
                marginHorizontal: 5,
                height: 100,
                borderRadius: 10,
                backgroundColor: BaseColor.primaryColor
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  position: "absolute",
                  alignSelf: "center",
                  bottom: "0",
                  justifyContent: "center"
                }}
              >
                {res}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Home;
