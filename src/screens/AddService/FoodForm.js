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
  Dimensions,
  ScrollView
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "@actions/AuthAction";
import {
  CustomStatusBar,
  Header,
  CustomModal,
  MapCoordinateMarking
} from "@components";
import { BaseColor, Images } from "@config";
import Carousel from "react-native-reanimated-carousel";
import * as Services from "@services";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Dropdown } from "react-native-element-dropdown";
// import { useSelector } from "react-redux";

const FoodForm = (props) => {
  const authUser = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    images: [],
    minMaxPlateCount: { min: "", max: "" },
    locationCoordinate: props.location
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageAutoPlay, setImageAutoPlay] = useState(true);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [showImgSizeAlert, setShowImgSizeAlert] = useState(false);
  const [doProvideServant, setDoProvideServant] = useState(null);
  const [currentDeleteImageIndex, setCurrentDeleteImageIndex] = useState(0);
  const [value, setValue] = useState(null);
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
  const { mapOnPress, location } = props;
  console.log("propssx", mapOnPress);

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
            // onSnapToItem={(index) => console.log("current index:", index)}
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
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Plate Count
      </Text>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TextInput
          onChangeText={(text) =>
            setParams({
              ...params,
              minMaxPlateCount: {
                ...params.minMaxPlateCount,
                min: text.replace(/[^0-9]/g, "")
              }
            })
          }
          placeholder={"Min"}
          keyboardType={"number-pad"}
          value={params.minMaxPlateCount.min}
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            height: 40,
            borderRadius: 10,
            fontSize: 16,
            width: "45%"
          }}
        />
        <TextInput
          onChangeText={(text) =>
            setParams({
              ...params,
              minMaxPlateCount: {
                ...params.minMaxPlateCount,
                max: text.replace(/[^0-9]/g, "")
              }
            })
          }
          value={params.minMaxPlateCount.max}
          placeholder={"Max"}
          keyboardType={"number-pad"}
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            height: 40,
            borderRadius: 10,
            fontSize: 16,
            width: "45%"
          }}
        />
      </View>
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Menu Type
      </Text>
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

      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Choose Cuisine
      </Text>
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
          setValue(item.value);
        }}
        renderItem={renderItem}
      />
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Provide Servant
      </Text>
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
          } else {
            setDoProvideServant(item.value);
          }
        }}
        renderItem={renderItem}
      />
      {doProvideServant == "Yes" && (
        <View>
          <Text
            style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}
          >
            Number Of Servants
          </Text>
          <TextInput
            onChangeText={(text) =>
              setParams({
                ...params,
                provideServant: {
                  ...params.pricePerServant,
                  numberOfServant: text
                }
              })
            }
            value={params?.provideServant?.numberOfServant}
            placeholder={"Number Of Servants"}
            style={{
              backgroundColor: "white",
              marginHorizontal: 10,
              height: 40,
              borderRadius: 10,
              fontSize: 16
            }}
          />
          <Text
            style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}
          >
            Price Per Servant (Hourly)
          </Text>
          <TextInput
            onChangeText={(text) =>
              setParams({
                ...params,
                provideServant: {
                  ...params.numberOfServant,
                  pricePerServant: text
                }
              })
            }
            value={params?.provideServant?.pricePerServant}
            placeholder={" Price Per Servant (Hourly)"}
            style={{
              backgroundColor: "white",
              marginHorizontal: 10,
              height: 40,
              borderRadius: 10,
              fontSize: 16
            }}
          />
        </View>
      )}
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Product Halal?
      </Text>
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
        value={doProvideServant}
        onChange={(item) => {
          setParams({
            ...params,
            isHalal: item.value
          });
        }}
        renderItem={renderItem}
      />
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Video Link
      </Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            videoLink: text
          })
        }
        value={params?.videoLink}
        placeholder={"Video Link"}
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          height: 40,
          borderRadius: 10,
          fontSize: 16
        }}
      />
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Food Name
      </Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            name: text
          })
        }
        value={params?.name}
        placeholder={"Food Name"}
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          height: 40,
          borderRadius: 10,
          fontSize: 16
        }}
      />
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Description
      </Text>
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
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          height: 150,
          borderRadius: 10,
          fontSize: 16,
          textAlignVertical: "top"
        }}
      />
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Price Per Plate
      </Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            pricePerPlate: text
          })
        }
        value={params?.pricePerPlate}
        placeholder={"Price Per Plate"}
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          height: 40,
          borderRadius: 10,
          fontSize: 16
        }}
      />
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Service Location
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
      <Text style={{ color: "black", fontSize: 16, margin: 10, marginTop: 15 }}>
        Transport Price Per KM(RM)
      </Text>
      <TextInput
        onChangeText={(text) =>
          setParams({
            ...params,
            transportPrice: text
          })
        }
        value={params?.transportPrice}
        placeholder={"Transport Price Per KM(RM)"}
        style={{
          backgroundColor: "white",
          marginHorizontal: 10,
          height: 40,
          borderRadius: 10,
          fontSize: 16,
          marginBottom: 50
        }}
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
    </View>
  );
};

export default FoodForm;
