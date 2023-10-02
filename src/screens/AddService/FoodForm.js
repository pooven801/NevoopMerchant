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
import { CustomStatusBar, Header, CustomModal } from "@components";
import { BaseColor, Images } from "@config";
import Carousel from "react-native-reanimated-carousel";
import * as Services from "@services";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// import { useSelector } from "react-redux";

const FoodForm = ({ navigation }) => {
  const authUser = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [params, setParams] = useState({ images: [] });
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageAutoPlay, setImageAutoPlay] = useState(true);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [showImgSizeAlert, setShowImgSizeAlert] = useState(false);
  const [currentDeleteImageIndex, setCurrentDeleteImageIndex] = useState(0);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    // Check for changes in data and update the carousel
  }, [params]);

  const handleFileUpload = async (imgBase64) => {
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
      setParams({ ...params, images: [...params.images, res.urlLink] });
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{}}>
        {params?.images.length == 0 ? (
          <View
            style={{
              backgroundColor: "grey",
              width: "90%",
              height: 220,
              alignSelf: "center",
              borderRadius: 10,
              justifyContent: "center",
              margin: 20
            }}
          >
            <Image
              source={Images.icons.imageIcon}
              style={{ width: 100, height: 100, alignSelf: "center" }}
            />
          </View>
        ) : (
          <Carousel
            loop
            width={width}
            pagingEnabled
            height={240}
            autoPlay={imageAutoPlay}
            data={params?.images}
            scrollAnimationDuration={1000}
            // onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ index, item }) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  padding: 10
                }}
              >
                <Image
                  src={item}
                  style={{
                    backgroundColor: "grey",
                    width: "100%",
                    height: 220,
                    alignSelf: "center",
                    borderRadius: 10,
                    justifyContent: "center",
                    marginTop: 20
                  }}
                />
                <TouchableOpacity
                  style={styles.cancelButtonContainer}
                  onPress={() => {
                    setConfirmDeleteModal(true);
                    setImageAutoPlay(false);
                    setCurrentDeleteImageIndex(index);
                    console.log(
                      params,
                      currentDeleteImageIndex,
                      params?.images.length
                    );
                  }}
                >
                  <Image
                    source={Images.icons.cancelRoundRed}
                    style={{ width: 40, height: 40 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
      <TouchableOpacity
        style={{
          marginTop: params?.images.length == 0 ? -10 : 10,
          width: "50%",
          height: 40,
          borderRadius: 10,
          backgroundColor: BaseColor.primaryColor,
          marginHorizontal: 20,
          alignSelf: "center",
          justifyContent: "center"
        }}
        onPress={() => {
          setShowImageModal(true);
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            alignSelf: "center"
          }}
        >
          Upload Image
        </Text>
      </TouchableOpacity>
      <CustomModal
        title={"Confirm"}
        cancelOnPress={() => {
          setConfirmDeleteModal(false);
          setImageAutoPlay(true);
        }}
        subTitle={"Delete?"}
        show={confirmDeleteModal}
      >
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text style={{ color: BaseColor.greyColor, fontSize: 18 }}>
            Are you sure wanna delete this image?
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                width: "40%",
                height: 40,
                borderRadius: 10,
                backgroundColor: BaseColor.primaryColor,

                alignSelf: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                setConfirmDeleteModal(false);
                setImageAutoPlay(true);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  alignSelf: "center"
                }}
              >
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: 20,
                width: "40%",
                height: 40,
                borderRadius: 10,
                backgroundColor: BaseColor.redColor,
                alignSelf: "center",
                justifyContent: "center"
              }}
              onPress={() => {
                let newImagesArray = [
                  ...params.images.splice(currentDeleteImageIndex, 1)
                ];
                setConfirmDeleteModal(false);
                setImageAutoPlay(true);
                setParams({
                  ...params,
                  images: [...params.images.splice(currentDeleteImageIndex, 1)]
                });
                console.log({
                  ...params,
                  images: [...newImagesArray]
                });
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                  alignSelf: "center"
                }}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>
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
                    handleFileUpload(res);
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
                    handleFileUpload(res);
                  }
                }
              );
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Capture Image</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </View>
  );
};

export default FoodForm;
