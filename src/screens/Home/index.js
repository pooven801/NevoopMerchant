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
import { BaseColor, GreenColor, Images } from "@config";
// import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  // const authUser = useSelector((state) => state.auth);
  const [params, setParams] = useState({ email: "", pwd: "" });
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.data);
  const subItemsFirst = ["Add Service", "Service List", "Payout", "Booking"];
  const subItemsSecond = ["Status", "Support"];
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
          width: "95%",
          backgroundColor: BaseColor.primaryColor,
          borderRadius: 10,
          alignSelf: "center",
          marginTop: Platform.OS == "android" ? 40 : 20
        }}
      >
        <Image
          src={authUser?.logoImg}
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
          <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
            {authUser?.companyName}
          </Text>
          <Text style={{ color: "white" }}>SSM No</Text>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 10 }}>
            {authUser?.ssmno}
          </Text>
          <Text style={{ color: "white" }}>Balance</Text>
          <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
            RM 42344
          </Text>

          {/* <TouchableOpacity
            style={{
              backgroundColor: BaseColor.primaryColor,
              width: 100,
              height: 30,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              Cash Out
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          marginLeft: 10,
          marginBottom: 5
        }}
      >
        <Text
          style={{
            color: BaseColor.primaryColor,
            fontWeight: "bold",
            fontSize: 15,
            marginRight: 5
          }}
        >
          Main
        </Text>
        <Image
          source={Images.icons.processorIcon}
          style={{
            width: 20,
            height: 20,
            alignSelf: "center"
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        {subItemsFirst.map((res, index) => {
          return (
            <TouchableOpacity
              style={{
                width: Dimensions.get("window").width / 4 - 10,
                marginHorizontal: 5,
                height: 90,
                borderRadius: 10,
                justifyContent: "center",
                backgroundColor: BaseColor.primaryColor
              }}
              onPress={() => {
                if (index == 0) {
                  navigation.navigate("AddService");
                } else if (index == 1) {
                  navigation.navigate("ServiceList");
                }
              }}
            >
              {index == 0 && (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "center",
                    top: -5
                  }}
                  source={require("../../assets/icons/icons8-add-50.png")}
                />
              )}
              {index == 1 && (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "center",
                    top: -5
                  }}
                  source={require("../../assets/icons/icons8-search-in-list-50.png")}
                />
              )}
              {index == 2 && (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "center",
                    top: -5
                  }}
                  source={require("../../assets/icons/icons8-payout-64.png")}
                />
              )}
              {index == 3 && (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "center",
                    top: -5
                  }}
                  source={require("../../assets/icons/icons8-booking-80.png")}
                />
              )}
              <Text
                style={{
                  fontSize: 12,
                  color: BaseColor.whiteColor,
                  position: "absolute",
                  bottom: 5,
                  alignSelf: "center"
                }}
              >
                {res}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {subItemsSecond.map((res, index) => {
          return (
            <TouchableOpacity
              style={{
                width: Dimensions.get("window").width / 4 - 10,
                marginHorizontal: 5,
                height: 90,
                borderRadius: 10,
                justifyContent: "center",
                backgroundColor: BaseColor.primaryColor
              }}
            >
              {index == 0 && (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "center",
                    top: -5
                  }}
                  source={require("../../assets/icons/icons8-status-80.png")}
                />
              )}
              {index == 1 && (
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "center",
                    top: -5
                  }}
                  source={require("../../assets/icons/icons8-support-68.png")}
                />
              )}
              <Text
                style={{
                  fontSize: 12,
                  color: BaseColor.whiteColor,
                  position: "absolute",
                  bottom: 5,
                  alignSelf: "center"
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
