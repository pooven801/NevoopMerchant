import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";
import styles from "./styles";
import { useSelector } from "react-redux";
import { CustomModal } from "@components";
import { BaseColor, Images } from "@config";
import Carousel from "react-native-reanimated-carousel";
import * as Services from "@services";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Dropdown } from "react-native-element-dropdown";

const VanueForm = (props) => {
  const authUser = useSelector((state) => state.auth.data);
  const [params, setParams] = useState({
    images: [],
    locationCoordinate: props.location,
    merchantId: authUser._id
  });
  const [showSubmitStatusModal, setShowSubmitStatusModal] = useState({
    show: false,
    message: ""
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageAutoPlay, setImageAutoPlay] = useState(true);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [showImgSizeAlert, setShowImgSizeAlert] = useState(false);
  const [currentDeleteImageIndex, setCurrentDeleteImageIndex] = useState(0);
  const [validPrice, setValidPrice] = useState(true);
  const [firstRun, setFirstRun] = useState(true);
  const width = Dimensions.get("window").width;
  const pricePerDayHourItem = [
    { label: "Day", value: "Day" },
    { label: "Hour", value: "Hour" }
  ];
  const typePackageAddOnItem = [
    { label: "Add On", value: true },
    { label: "Full Package", value: false }
  ];

  const {
    mapOnPress,
    location,
    updateParams,
    checkFormError,
    submitForm,
    editParams
  } = props;

  useEffect(() => {
    setParams(editParams);
  }, []);

  useEffect(() => {
    updateParams(params);
  }, [params]);

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      return;
    }
    if (params.images.length == 0) {
      setShowSubmitStatusModal({
        show: true,
        message: "Atleast one service image needed"
      });
    } else if (
      params?.name == "" ||
      params?.name == undefined ||
      params?.description == "" ||
      params?.description == undefined ||
      params?.price == "" ||
      params?.price == undefined ||
      validPrice == false ||
      params?.pricePerDayHour == undefined ||
      params?.typePackageAddOn == undefined ||
      params?.address?.addressLine1 == "" ||
      params.address?.addressLine1 == undefined ||
      params?.address?.addressLine2 == "" ||
      params?.address?.addressLine2 == undefined
    ) {
      setShowSubmitStatusModal({
        show: true,
        message:
          params?.name == "" || params?.name == undefined
            ? "Fill in name"
            : params?.description == "" || params?.description == undefined
            ? "Fill in description"
            : params?.typePackageAddOn == undefined
            ? "Choose package type"
            : params?.price == "" || params?.price == undefined
            ? "Fill in price"
            : validPrice == false
            ? "Invalid price"
            : params?.pricePerDayHour == undefined
            ? "Choose Price per Day/Hour"
            : params?.address?.addressLine1 == "" ||
              params.address?.addressLine1 == undefined
            ? "Address Line 1 is empty"
            : "Address Line 2 is empty"
      });
    } else if (
      params?.videoLink != undefined &&
      params?.videoLink != "" &&
      matchYoutubeUrl(params?.videoLink) == false
    ) {
      setShowSubmitStatusModal({
        show: true,
        message: "Invalid Youtube video"
      });
    } else {
      if (params?.videoLink == "") delete params.videoLink;
      submitForm();
    }
  }, [checkFormError]);

  useEffect(() => {
    if (editParams == null) {
      setParams({ ...params, locationCoordinate: props.location });
    } else {
      setParams({ ...editParams, locationCoordinate: props.location });
    }
  }, [location]);

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

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const matchYoutubeUrl = (url) => {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      console.log(url.match(p)[1]);
      return true;
      //   return url.match(p)[1];
    }
    return false;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{}}>
        {params?.images.length == 0 ? (
          <View style={styles.emptyImageContainer}>
            <Image source={Images.icons.imageIcon} style={styles.emptyImage} />
          </View>
        ) : (
          <Carousel
            loop
            width={width}
            pagingEnabled
            height={240}
            autoPlay={
              imageAutoPlay == false ? false : params?.images?.length > 1
            }
            data={params?.images}
            scrollAnimationDuration={1000}
            renderItem={({ index, item }) => (
              <View style={styles.scrollImageContainer}>
                <Image src={item} style={styles.imageStyle} />
                <TouchableOpacity
                  style={styles.cancelButtonContainer}
                  onPress={() => {
                    setConfirmDeleteModal(true);
                    setImageAutoPlay(false);
                    setCurrentDeleteImageIndex(index);
                  }}
                >
                  <Image
                    source={Images.icons.cancelRoundRed}
                    style={styles.cancelImage}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
      <TouchableOpacity
        style={[
          {
            marginTop: params?.images.length == 0 ? -10 : 10
          },
          styles.uploadButton
        ]}
        onPress={() => {
          setShowImageModal(true);
        }}
      >
        <Text style={styles.uploadText}>Upload Image</Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>Vanue Name *</Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            name: text
          })
        }
        value={params?.name}
        placeholder={"Vanue Name"}
        style={styles.textInputStyle}
      />
      <Text style={styles.textStyle}>Description *</Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            description: text
          })
        }
        value={params?.description}
        placeholder={"Description"}
        multiline={true}
        style={[
          styles.textInputStyle,
          {
            height: 150,
            textAlignVertical: "top"
          }
        ]}
      />
      <Text style={styles.textStyle}>Package Type *</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={typePackageAddOnItem}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        value={params.typePackageAddOn}
        onChange={(item) => {
          setParams({
            ...params,
            typePackageAddOn: item.value
          });
        }}
        renderItem={renderItem}
      />
      <Text style={styles.textStyle}>Price *</Text>
      <TextInput
        onChangeText={(text) => {
          if (/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(text) == true) {
            setValidPrice(true);
          } else {
            setValidPrice(false);
          }
          setParams({
            ...params,
            price: text.replace(/[^0-9.]/g, "")
          });
        }}
        value={params?.price}
        placeholder={"Price"}
        style={styles.textInputStyle}
      />
      {validPrice == false && params.price != "" && (
        <Text
          style={[styles.textStyle, { color: "red", top: -10, fontSize: 14 }]}
        >
          Invalid Price Format (Must be in Currency Format)
        </Text>
      )}
      <Text style={styles.textStyle}>Price per Day/Hour *</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={pricePerDayHourItem}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        value={params.pricePerDayHour}
        onChange={(item) => {
          setParams({
            ...params,
            pricePerDayHour: item.value
          });
        }}
        renderItem={renderItem}
      />
      <Text style={styles.textStyle}>Video Link (Youtube Video Only)</Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            videoLink: text
          })
        }
        value={params?.videoLink}
        placeholder={"Video Link"}
        style={styles.textInputStyle}
      />
      <Text style={styles.textStyle}>
        Service Location (Default Current Location) *
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: BaseColor.primaryColor,
          height: 40,
          marginHorizontal: 10,
          borderRadius: 10
        }}
        onPress={() => {
          mapOnPress();
        }}
      >
        <Text style={{ color: "white", fontSize: 16, margin: 10 }}>
          {params.locationCoordinate == null
            ? "Mark Location : No Location Selected"
            : `Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
        </Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>Address Line 1 *</Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            address: { ...params?.address, addressLine1: text }
          })
        }
        value={params?.address?.addressLine1}
        placeholder={"Address Line 1"}
        style={styles.textInputStyle}
      />
      <Text style={styles.textStyle}>Address Line 2 *</Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            address: { ...params?.address, addressLine2: text }
          })
        }
        value={params?.address?.addressLine2}
        placeholder={"Address Line 2"}
        style={[styles.textInputStyle, { marginBottom: 50 }]}
      />
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
          <Text style={styles.deleteModalTitle}>
            Are you sure wanna delete this image?
          </Text>
          <View style={styles.deleteModalSubContainer}>
            <TouchableOpacity
              style={styles.deleteModalButton}
              onPress={() => {
                setConfirmDeleteModal(false);
                setImageAutoPlay(true);
              }}
            >
              <Text style={styles.deleteModalButtonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteModalButton}
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
              }}
            >
              <Text style={styles.deleteModalButtonText}>Yes</Text>
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
      <CustomModal
        title={"Error"}
        buttonText={"Ok"}
        buttonOnPress={() => {
          setShowSubmitStatusModal(false);
        }}
        cancelOnPress={() => {
          setShowSubmitStatusModal(false);
        }}
        subTitle={"Fix"}
        show={showSubmitStatusModal.show}
      >
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text style={{ color: BaseColor.greyColor, fontSize: 18 }}>
            {showSubmitStatusModal.message}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.summitButton}
          onPress={() => {
            setShowSubmitStatusModal({
              show: false,
              message: ""
            });
          }}
        >
          <Text style={styles.summitText}>OK</Text>
        </TouchableOpacity>
      </CustomModal>
    </View>
  );
};

export default VanueForm;
