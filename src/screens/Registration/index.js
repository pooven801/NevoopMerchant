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
  Platform,
  ScrollView
} from "react-native";
import styles from "./styles";
import { BaseColor } from "@config";
import { HomeHeader, Header, CustomStatusBar } from "@components";
import Icon from "react-native-vector-icons/AntDesign";
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
        onPressRight={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return <Text style={{ fontSize: 15, color: "white" }}>Submit</Text>;
        }}
      />
      <ScrollView style={{}}>
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
          <Text style={styles.subTitlesText}>Repeat Password</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, pwd: text })}
            secureTextEntry={true}
            style={styles.subTitlesTextInput}
          />
          <Text style={styles.subTitlesText}>Handphone Number</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, email: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"number-pad"}
          />
          <Text style={styles.subTitlesText}>Office Number</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, email: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"number-pad"}
          />
          <Text style={styles.subTitlesText}>Director Name</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, email: text })}
            style={styles.subTitlesTextInput}
          />
          <Text style={styles.subTitlesText}>IC No</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, email: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"number-pad"}
          />
          <Text style={styles.subTitlesText}>Company Name</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, email: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"email-address"}
          />
          <Text style={styles.subTitlesText}>SSM No</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, email: text })}
            style={styles.subTitlesTextInput}
          />
          <Text style={styles.subTitlesText}>IC Image</Text>
          <View style={styles.uploadButtonContainer}>
            <TouchableOpacity style={styles.uploadButtonSub} onPress={() => {}}>
              <Text style={{ color: "white" }}>Upload</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitlesText}>Company Logo</Text>
          <View style={[styles.uploadButtonContainer, { marginBottom: 20 }]}>
            <TouchableOpacity style={styles.uploadButtonSub} onPress={() => {}}>
              <Text style={{ color: "white" }}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Registration;
