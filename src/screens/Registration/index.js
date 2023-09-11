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
  ScrollView,
  Modal,
  Pressable
} from "react-native";
import styles from "./styles";
import { BaseColor } from "@config";
import { HomeHeader, Header, CustomStatusBar, CustomModal } from "@components";
import Icon from "react-native-vector-icons/AntDesign";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as Services from "@services";
// import { useSelector } from "react-redux";

const Registration = ({ navigation }) => {
  // const authUser = useSelector((state) => state.auth);
  const [params, setParams] = useState({ email: "", pwd: "" });
  const [showImageModal, setShowImageModal] = useState(false);
  const [showImgSizeAlert, setShowImgSizeAlert] = useState(false);

  const handleFileUpload = async (imgName, imgBase64) => {
    // const file = imgURI.target.files[0];
    // console.log("handleFileUploadxx", imgBase64.assets[0]);
    let newImageBase64 = "";
    var stringLength = imgBase64.assets[0]?.base64.length;
    var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    var sizeInMb = sizeInBytes / 1048576;
    newImageBase64 =
      "data:" +
      imgBase64.assets[0].type +
      ";" +
      "base64," +
      imgBase64.assets[0]?.base64;
    console.log("sizeInMb", imgBase64.assets[0].type);
    if (sizeInMb > 5) {
      console.log("more then 10mb");
      imageRef.current.value = "";
      setShowImgSizeAlert(true);
      let timerShowQRFail = setTimeout(() => {
        setShowImgSizeAlert(false);
      }, 4000);
      return;
    }
    Services.storeBlobGetURL({ file: newImageBase64 }).then((res) => {
      console.log(res.urlLink);
      // if (imgName == "icImage") {
      //   setFormParams({ ...formParams, icImg: res.urlLink });
      // } else if (imgName == "logoImg") {
      //   icRef.current.value = "";
      //   logoRef.current.value = "";
      //   setFormParams({ ...formParams, logoImg: res.urlLink });
      // }
    });
  };

  const imageEmptyView = () => {
    return (
      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity
          style={styles.uploadButtonSub}
          onPress={() => {
            setShowImageModal(true);
          }}
        >
          <Text style={{ color: "white" }}>Upload</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
          return <Text style={{ fontSize: 15, color: "white" }}>Back</Text>;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Text style={{ fontSize: 15, color: "white", right: 10 }}>
              Submit
            </Text>
          );
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
          {imageEmptyView()}
          <Text style={styles.subTitlesText}>Company Logo</Text>
          {imageEmptyView()}
        </View>
        {/* {uploadImageModal()} */}
        <CustomModal
          title={"Upload"}
          buttonText={"Ok"}
          buttonOnPress={() => {
            setShowImageModal(false);
          }}
          cancelOnPress={() => {
            setShowImageModal(false);
          }}
          subTitle={"Image"}
          show={showImageModal}
        >
          <View
            style={{
              marginTop: 20
            }}
          >
            <TouchableOpacity
              style={[styles.modalButton]}
              onPress={() => {
                launchImageLibrary(
                  {
                    includeBase64: true,
                    mediaType: "photo",
                    quality: 0.5,
                    maxWidth: 1000,
                    maxHeight: 1000
                  },
                  (res) => {
                    if (res.didCancel) {
                      console.log("canceled");
                    } else if (res.error) {
                      console.log("err");
                    } else if (res.customButton) {
                      console.log("cstm btn");
                    } else {
                      setShowImageModal(false);
                      handleFileUpload("icImage", res);
                    }
                    // console.log(res);
                  }
                );
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { marginTop: 10 }]}
              onPress={() => {
                launchCamera({ includeBase64: true, mediaType: "photo" });
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>
                Capture Image
              </Text>
            </TouchableOpacity>
          </View>
        </CustomModal>

        <CustomModal
          title={"Error"}
          buttonText={"Ok"}
          buttonOnPress={() => {
            setShowImageModal(false);
          }}
          cancelOnPress={() => {
            setShowImageModal(false);
          }}
          subTitle={"Image Size"}
          show={showImgSizeAlert}
        >
          <View
            style={{
              marginTop: 20
            }}
          >
            <Text style={{ color: BaseColor.greyColor, fontSize: 18 }}>
              Image must be less than 5 Mb
            </Text>
          </View>
        </CustomModal>
      </ScrollView>
    </View>
  );
};

export default Registration;
