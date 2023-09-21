import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView
} from "react-native";
import styles from "./styles";
import { BaseColor, Images } from "@config";
import { Header, CustomStatusBar, CustomModal } from "@components";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as Services from "@services";

const Registration = ({ navigation }) => {
  const [params, setParams] = useState({
    email: "",
    password: "",
    icImg: "",
    logoImg: ""
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [showImgSizeAlert, setShowImgSizeAlert] = useState(false);
  const [showSummitFail, setShowSummitFail] = useState({
    show: false,
    message: ""
  });
  const [showSummitSuccess, setShowSummitSuccess] = useState(false);
  const [currentImageSelectionType, setCurrentImageSelectionType] =
    useState("");

  const callRegisterMerchant = () => {
    if (params?.password !== params?.pwd) {
      setShowSummitFail({
        show: true,
        message: "Password is not matching with repeat password"
      });
      return;
    }
    Services.createMerchant(params).then((res) => {
      if (res?.success == false) {
        setShowSummitFail({ show: true, message: res?.message });
      } else {
        setShowSummitSuccess(true);
      }
    });
  };

  const handleFileUpload = async (imgName, imgBase64) => {
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
    if (sizeInMb > 5) {
      setShowImgSizeAlert(true);
      let timerShowQRFail = setTimeout(() => {
        setShowImgSizeAlert(false);
      }, 4000);
      return;
    }
    Services.storeBlobGetURL({ file: newImageBase64 }).then((res) => {
      if (currentImageSelectionType == "icImage") {
        setParams({ ...params, icImg: res.urlLink });
        setCurrentImageSelectionType("");
      } else if (currentImageSelectionType == "logoImg") {
        setParams({ ...params, logoImg: res.urlLink });
        setCurrentImageSelectionType("");
      }
    });
  };

  const imageEmptyView = (param) => {
    return (
      <View style={[styles.uploadButtonContainer]}>
        <TouchableOpacity
          style={styles.uploadButtonSub}
          onPress={() => {
            setShowImageModal(true);
            setCurrentImageSelectionType(param.imageType);
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
          callRegisterMerchant();
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
            onChangeText={(text) => setParams({ ...params, password: text })}
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
            onChangeText={(text) => setParams({ ...params, handphoneNo: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"number-pad"}
          />
          <Text style={styles.subTitlesText}>Office Number</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, officeNo: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"number-pad"}
          />
          <Text style={styles.subTitlesText}>Director Name</Text>
          <TextInput
            onChangeText={(text) =>
              setParams({ ...params, directorName: text })
            }
            style={styles.subTitlesTextInput}
          />
          <Text style={styles.subTitlesText}>IC No</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, icno: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"number-pad"}
          />
          <Text style={styles.subTitlesText}>Company Name</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, companyName: text })}
            style={styles.subTitlesTextInput}
          />
          <Text style={styles.subTitlesText}>SSM No</Text>
          <TextInput
            onChangeText={(text) => setParams({ ...params, ssmno: text })}
            style={styles.subTitlesTextInput}
            keyboardType={"number-pad"}
          />
          <Text style={styles.subTitlesText}>IC Image</Text>
          {params?.icImg == "" ? (
            imageEmptyView({ bottomMargin: false, imageType: "icImage" })
          ) : (
            <View>
              <Image src={params.icImg} style={styles.imageContainer} />
              <TouchableOpacity
                style={styles.cancelButtonContainer}
                onPress={() => {
                  setParams({ ...params, icImg: "" });
                }}
              >
                <Image
                  source={Images.icons.cancelRoundRed}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.subTitlesText}>Company Logo</Text>
          {params?.logoImg == "" ? (
            imageEmptyView({ bottomMargin: true, imageType: "logoImg" })
          ) : (
            <View>
              <Image src={params.logoImg} style={styles.imageContainer} />
              <TouchableOpacity
                style={styles.cancelButtonContainer}
                onPress={() => {
                  setParams({ ...params, logoImg: "" });
                }}
              >
                <Image
                  source={Images.icons.cancelRoundRed}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
                  }
                );
              }}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Open Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { marginTop: 10 }]}
              onPress={() => {
                launchCamera({ includeBase64: true, mediaType: "photo" }).then(
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
                  }
                );
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
        <CustomModal
          title={"Error"}
          buttonText={"Ok"}
          buttonOnPress={() => {
            setShowSummitFail(false);
          }}
          cancelOnPress={() => {
            setShowSummitFail(false);
          }}
          subTitle={"Registration Failed"}
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
        <CustomModal
          title={"Success"}
          buttonText={"Ok"}
          buttonOnPress={() => {
            setShowSummitSuccess(false);
          }}
          cancelOnPress={() => {
            setShowSummitSuccess(false);
            navigation.navigate("Login");
          }}
          subTitle={"Registered"}
          show={showSummitSuccess}
        >
          <View style={styles.modalSuccessContainer}>
            <Text style={styles.textStyle}>
              Your registration is successful.{"\n"}Please wait for the next 7
              working days for administrative approval. You will be informed via
              the registered email. Thank you.
            </Text>
            <TouchableOpacity
              style={styles.modalSuccessButton}
              onPress={() => {
                setShowSummitFail(false);
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.modalSuccessText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      </ScrollView>
    </View>
  );
};

export default Registration;
