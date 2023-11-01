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
import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "@actions/AuthAction";
import { CustomModal } from "@components";
import { BaseColor, Images } from "@config";
import Carousel from "react-native-reanimated-carousel";
import * as Services from "@services";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Dropdown } from "react-native-element-dropdown";

const FoodForm = (props) => {
  const authUser = useSelector((state) => state.auth.data);
  const [params, setParams] = useState({
    images: [],
    minMaxPlateCount: { min: 0, max: 0 },
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
  const [doProvideServant, setDoProvideServant] = useState(null);
  const [currentDeleteImageIndex, setCurrentDeleteImageIndex] = useState(0);
  const [validTransportPrice, setValidTransportPrice] = useState(true);
  const [validPlateCount, setValidPlateCount] = useState(true);
  const [validPrice, setValidPrice] = useState(true);
  const [firstRun, setFirstRun] = useState(true);
  const width = Dimensions.get("window").width;
  const menuTypeItem = [
    { label: "Full Set", value: "Full Set" },
    { label: "Alacarte", value: "Alacarte" }
  ];
  const provideServantItem = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" }
  ];
  const isHalalItem = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" }
  ];
  const cuisineData = [
    { label: "Malay", value: "Malay" },
    { label: "Chinese", value: "Chinese" },
    { label: "Indian", value: "Indian" },
    { label: "Malay-Chinese", value: "Malay-Chinese" },
    { label: "Malay-Indian", value: "Malay-Indian" },
    { label: "Sabahan", value: "Sabahan" },
    { label: "Sarawakian", value: "Sarawakian" },
    { label: "Peranakan", value: "Peranakan" },
    { label: "Western", value: "Western" }
  ];
  const { mapOnPress, location, updateParams, checkFormError } = props;

  useEffect(() => {
    updateParams(params);
  }, [params]);

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      return;
    }
    console.log("Check PARAMS_ERR", params?.provideServant);
    if (params.images.length == 0) {
      console.log(
        "ERRx",
        params.minMaxPlateCount.min > params.minMaxPlateCount.max
      );
      setShowSubmitStatusModal({
        show: true,
        message: "Atleast one service image needed"
      });
    } else if (
      parseInt(params.minMaxPlateCount.min) >
      parseInt(params.minMaxPlateCount.max)
    ) {
      setShowSubmitStatusModal({
        show: true,
        message: "Invalid Plate Count. Min must be less than Max"
      });
    } else if (
      params.minMaxPlateCount.min == "" ||
      params.minMaxPlateCount.max == ""
    ) {
      setShowSubmitStatusModal({
        show: true,
        message: "Fill in plate count"
      });
    } else if (params?.menuType == undefined) {
      setShowSubmitStatusModal({
        show: true,
        message: "Choose menu type"
      });
    } else if (params?.cuisine == undefined) {
      setShowSubmitStatusModal({
        show: true,
        message: "Choose cuisine"
      });
    } else if (
      params?.provideServant == undefined ||
      params?.provideServant?.numberOfServant == "" ||
      params?.provideServant?.pricePerServant == ""
    ) {
      setShowSubmitStatusModal({
        show: true,
        message:
          params?.provideServant == undefined
            ? "Please choose servant service"
            : params?.provideServant?.numberOfServant
            ? "Servant number is empty"
            : "Servant price is empty"
      });
    } else if (params?.isHalal == undefined) {
      setShowSubmitStatusModal({
        show: true,
        message: "Choose halal status"
      });
    } else if (
      params?.provideServant?.videoLink == "" ||
      params?.provideServant?.name == "" ||
      params?.provideServant?.description == "" ||
      params?.provideServant?.pricePerPlate == "" ||
      validPlateCount == false ||
      params?.provideServant?.transportPrice == "" ||
      validTransportPrice == false
    ) {
      setShowSubmitStatusModal({
        show: true,
        message:
          params?.provideServant?.videoLink == ""
            ? "Fill in video link"
            : params?.provideServant?.name
            ? "Fill in name"
            : params?.provideServant?.description
            ? "Fill in description"
            : params?.provideServant?.pricePerPlate == ""
            ? "Fill in price per plate"
            : validPlateCount == false
            ? "Invalid price per plate"
            : params?.provideServant?.transportPrice == ""
            ? "Fill in transport price"
            : "Invalid transport price"
      });
    }
  }, [checkFormError]);

  useEffect(() => {
    setParams({ ...params, locationCoordinate: props.location });
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
            autoPlay={imageAutoPlay}
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
      <Text style={styles.textStyle}>Plate Count</Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TextInput
          onChangeText={(text) => {
            if (text.replace(/[^0-9]/g, "") > params.minMaxPlateCount.max) {
              setValidPlateCount(false);
            } else {
              setValidPlateCount(true);
            }
            setParams({
              ...params,
              minMaxPlateCount: {
                ...params.minMaxPlateCount,
                min: text.replace(/[^0-9]/g, "")
              }
            });
          }}
          placeholder={"Min"}
          keyboardType={"number-pad"}
          value={params.minMaxPlateCount.min}
          style={styles.textInputHalfStyle}
        />
        <TextInput
          onChangeText={(text) => {
            console.log(
              params.minMaxPlateCount.min,
              text.replace(/[^0-9]/g, ""),
              params.minMaxPlateCount.min > text.replace(/[^0-9]/g, "")
            );
            if (params.minMaxPlateCount.min > text.replace(/[^0-9]/g, "")) {
              setValidPlateCount(false);
            } else {
              setValidPlateCount(true);
            }
            setParams({
              ...params,
              minMaxPlateCount: {
                ...params.minMaxPlateCount,
                max: text.replace(/[^0-9]/g, "")
              }
            });
          }}
          value={params.minMaxPlateCount.max}
          placeholder={"Max"}
          keyboardType={"number-pad"}
          style={styles.textInputHalfStyle}
        />
      </View>
      {validPlateCount == false && (
        <Text
          style={[styles.textStyle, { color: "red", top: -10, fontSize: 14 }]}
        >
          Min must be more than Max
        </Text>
      )}
      <Text style={styles.textStyle}>Menu Type</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={menuTypeItem}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={params.menuType}
        onChange={(item) => {
          setParams({
            ...params,
            menuType: item.value
          });
        }}
        renderItem={renderItem}
      />
      <Text style={styles.textStyle}>Choose Cuisine</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cuisineData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        value={params.cuisine}
        onChange={(item) => {
          setParams({
            ...params,
            cuisine: item.value
          });
        }}
        renderItem={renderItem}
      />
      <Text style={styles.textStyle}>Provide Servant</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={provideServantItem}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        value={doProvideServant}
        onChange={(item) => {
          if (item.value == "No") {
            setParams({
              ...params,
              provideServant: {
                numberOfServant: "",
                pricePerServant: ""
              }
            });
            setDoProvideServant(null);
          } else {
            setDoProvideServant(item.value);
            setParams({
              ...params,
              provideServant: {
                numberOfServant: "",
                pricePerServant: ""
              }
            });
          }
        }}
        renderItem={renderItem}
      />
      {doProvideServant == "Yes" && (
        <View>
          <Text style={styles.textStyle}>Number Of Servants</Text>
          <TextInput
            onChangeText={(text) =>
              setParams({
                ...params,
                provideServant: {
                  ...params.provideServant,
                  numberOfServant: text.replace(/[^0-9]/g, "")
                }
              })
            }
            value={params?.provideServant?.numberOfServant}
            placeholder={"Number Of Servants"}
            style={styles.textInputStyle}
            keyboardType={"number-pad"}
          />
          <Text style={styles.textStyle}>Price Per Servant (Hourly)</Text>
          <TextInput
            onChangeText={(text) =>
              setParams({
                ...params,
                provideServant: {
                  ...params.provideServant,
                  pricePerServant: text.replace(/[^0-9]/g, "")
                }
              })
            }
            value={params?.provideServant?.pricePerServant}
            placeholder={" Price Per Servant (Hourly)"}
            style={styles.textInputStyle}
            keyboardType={"number-pad"}
          />
        </View>
      )}
      <Text style={styles.textStyle}>Product Halal?</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={isHalalItem}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select"
        searchPlaceholder="Search..."
        value={params.isHalal}
        onChange={(item) => {
          setParams({
            ...params,
            isHalal: item.value
          });
        }}
        renderItem={renderItem}
      />
      <Text style={styles.textStyle}>Video Link</Text>
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
      <Text style={styles.textStyle}>Food Name</Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            name: text
          })
        }
        value={params?.name}
        placeholder={"Food Name"}
        style={styles.textInputStyle}
      />
      <Text style={styles.textStyle}>Description</Text>
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
      <Text style={styles.textStyle}>Price Per Plate</Text>
      <TextInput
        onChangeText={(text) => {
          if (/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(text) == true) {
            setValidPrice(true);
          } else {
            setValidPrice(false);
          }
          setParams({
            ...params,
            pricePerPlate: text.replace(/[^0-9.]/g, "")
          });
        }}
        value={params?.pricePerPlate}
        placeholder={"Price Per Plate"}
        style={styles.textInputStyle}
      />
      {validPrice == false && (
        <Text
          style={[styles.textStyle, { color: "red", top: -10, fontSize: 14 }]}
        >
          Invalid Price Format (Must be in Currency Format)
        </Text>
      )}
      <Text style={styles.textStyle}>
        Service Location (Default Current Location)
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
      <Text style={styles.textStyle}>Transport Price Per KM(RM)</Text>
      <TextInput
        onChangeText={(text) => {
          if (/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(text) == true) {
            setValidTransportPrice(true);
          } else {
            setValidTransportPrice(false);
          }
          setParams({
            ...params,
            transportPrice: text.replace(/[^0-9.]/g, "")
          });
        }}
        value={params?.transportPrice}
        placeholder={"Transport Price Per KM(RM)"}
        style={[
          styles.textInputStyle,
          validTransportPrice == true && { marginBottom: 50 }
        ]}
      />
      {validTransportPrice == false && (
        <Text
          style={[
            styles.textStyle,
            { marginBottom: 50, color: "red", top: -10, fontSize: 14 }
          ]}
        >
          Invalid Price Format (Must be in Currency Format)
        </Text>
      )}
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

export default FoodForm;
