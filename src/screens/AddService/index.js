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
  ScrollView
} from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "@actions/AuthAction";
import { CustomStatusBar, Header, CustomModal } from "@components";
import { BaseColor } from "@config";
import FoodForm from "./FoodForm";
import AccommodationForm from "./AccommodationForm";
import VanueForm from "./VanueForm";
import BeautyHealthForm from "./BeautyHealthForm";
import PhotographerForm from "./PhotographerForm";
import TransportationLogisticForm from "./TransportationLogisticForm";
import DecorationForm from "./DecorationForm";
import DesignerForm from "./DesignerForm";
import MultimediaForm from "./MultimediaForm";
import VideoRecorderForm from "./VideoRecorderForm";
import OthersForm from "./OthersForm";
import MarkLocation from "../MarkLocation";
import GetLocation from "react-native-get-location";
import * as Services from "@services";
import { Dropdown } from "react-native-element-dropdown";

// import { useSelector } from "react-redux";

const AddService = ({ navigation, route }) => {
  const [params, setParams] = useState();
  const [currentServiceType, setCurrentServiceType] = useState("Food");
  const [checkFormError, setCheckFormError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [showSubmitStatusModal, setShowSubmitStatusModal] = useState({
    show: false,
    message: ""
  });
  const [markedCoordinate, setMarkedCoordinate] = useState({
    latitude: 2.9213,
    longitude: 101.6559
  });
  const authUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const serviceItem = [
    { label: "Food", value: "Food" },
    { label: "Vanue", value: "Vanue" },
    { label: "Accommodation", value: "Accommodation" },
    { label: "Transportation/Logistic", value: "Transportation/Logistic" },
    { label: "Designer", value: "Designer" },
    { label: "Photographer", value: "Photographer" },
    { label: "Video Recorder", value: "Video Recorder" },
    { label: "Multimedia", value: "Multimedia" },
    { label: "Decoration", value: "Decoration" },
    { label: "Beauty & Health", value: "Beauty & Health" },
    { label: "Others", value: "Others" }
  ];

  var API_SERVICE_TYPE = "";
  var deleteServiceType = "";
  var editServiceType = "";

  if (currentServiceType == "Food") {
    API_SERVICE_TYPE = "createFoodService";
    deleteServiceType = "deleteFoodService";
    editServiceType = "editFoodService";
  } else if (currentServiceType == "Vanue") {
    API_SERVICE_TYPE = "createVanueService";
    deleteServiceType = "deleteVanueService";
    editServiceType = "editVanueService";
  } else if (currentServiceType == "Accommodation") {
    API_SERVICE_TYPE = "createAccommandationService";
    deleteServiceType = "deleteAccommandationService";
    editServiceType = "editAccommandationService";
  } else if (currentServiceType == "Transportation/Logistic") {
    API_SERVICE_TYPE = "createTransportationLogisticService";
    deleteServiceType = "deleteTransportationLogisticService";
    editServiceType = "editTransportationLogisticService";
  } else if (currentServiceType == "Designer") {
    API_SERVICE_TYPE = "createDesignerService";
    deleteServiceType = "deleteDesignerService";
    editServiceType = "editDesignerService";
  } else if (currentServiceType == "Photographer") {
    API_SERVICE_TYPE = "createPhotographerService";
    deleteServiceType = "deletePhotographerService";
    editServiceType = "editPhotographerService";
  } else if (currentServiceType == "Video Recorder") {
    API_SERVICE_TYPE = "createVideoRecorderService";
    deleteServiceType = "deleteVideoRecorderService";
    editServiceType = "editVideoRecorderService";
  } else if (currentServiceType == "Multimedia") {
    API_SERVICE_TYPE = "createMultimediaService";
    deleteServiceType = "deleteMultimediaService";
    editServiceType = "editMultimediaService";
  } else if (currentServiceType == "Decoration") {
    API_SERVICE_TYPE = "createDecorationService";
    deleteServiceType = "deleteDecorationService";
    editServiceType = "editDecorationService";
  } else if (currentServiceType == "Beauty & Health") {
    API_SERVICE_TYPE = "createBeautyHealthService";
    deleteServiceType = "deleteBeautyHealthService";
    editServiceType = "editBeautyHealthService";
  } else {
    API_SERVICE_TYPE = "createOthersService";
    deleteServiceType = "deleteOthersService";
    editServiceType = "editOthersService";
  }

  useEffect(() => {
    if (route?.params?.editParam != undefined) {
      setCurrentServiceType(route?.params?.editFormType);
      setParams(route?.params?.editParam);
      setMarkedCoordinate({
        latitude: route?.params?.editParam.locationCoordinate.latitude,
        longitude: route?.params?.editParam.locationCoordinate.longitude
      });
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000
      })
        .then((location) => {
          setMarkedCoordinate({
            latitude: location.latitude,
            longitude: location.longitude
          });
        })
        .catch((error) => {
          const { code, message } = error;
          console.warn(code, message);
        });
    }
  }, []);

  const locationCallback = (res) => {
    setMarkedCoordinate(res);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const submitForm = () => {
    if (route?.params?.editParam != undefined) {
      console.log(params, "XXXTESTXXX");
      Services.editService(editServiceType, params).then((res) => {
        if (res?.success) {
          setShowSubmitStatusModal({
            show: true,
            message: res.message
          });
        } else {
          setServerError(true);
          setShowSubmitStatusModal({
            show: true,
            message: res.message2
          });
        }
      });
    } else {
      Services.createServices(params, API_SERVICE_TYPE).then((res) => {
        if (res?.success) {
          setShowSubmitStatusModal({
            show: true,
            message: res.message
          });
        } else {
          setServerError(true);
          setShowSubmitStatusModal({
            show: true,
            message: res.message
          });
        }
      });
    }
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
        title={"Add Service"}
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
          setCheckFormError(!checkFormError);
        }}
        renderRight={() => {
          return (
            <Text
              style={[
                styles.headerButtonStyle,
                Platform.OS === "ios" && { fontSize: 14 }
              ]}
            >
              {route?.params?.editParam == undefined ? "Submit" : "Edit"}
            </Text>
          );
        }}
      />
      <ScrollView>
        {route?.params?.editParam == undefined && (
          <Dropdown
            style={styles.dropdownMain}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={serviceItem}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={currentServiceType}
            onChange={(item) => {
              setCurrentServiceType(item.value);
            }}
            renderItem={renderItem}
          />
        )}
        {currentServiceType == "Food" && (
          <FoodForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            editParams={route?.params?.editParam ?? null}
            checkFormError={checkFormError}
            submitForm={submitForm}
          />
        )}
        {currentServiceType == "Accommodation" && (
          <AccommodationForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            submitForm={submitForm}
            editParams={route?.params?.editParam ?? null}
          />
        )}
        {currentServiceType == "Vanue" && (
          <VanueForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            editParams={route?.params?.editParam ?? null}
            submitForm={submitForm}
          />
        )}
        {currentServiceType == "Beauty & Health" && (
          <BeautyHealthForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            submitForm={submitForm}
            editParams={route?.params?.editParam ?? null}
          />
        )}
        {currentServiceType == "Photographer" && (
          <PhotographerForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            submitForm={submitForm}
            editParams={route?.params?.editParam ?? null}
          />
        )}
        {currentServiceType == "Transportation/Logistic" && (
          <TransportationLogisticForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            submitForm={submitForm}
            editParams={route?.params?.editParam ?? null}
          />
        )}
        {currentServiceType == "Decoration" && (
          <DecorationForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            submitForm={submitForm}
            editParams={route?.params?.editParam ?? null}
          />
        )}
        {currentServiceType == "Designer" && (
          <DesignerForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            submitForm={submitForm}
            editParams={route?.params?.editParam ?? null}
          />
        )}
        {currentServiceType == "Multimedia" && (
          <MultimediaForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            submitForm={submitForm}
            editParams={route?.params?.editParam ?? null}
          />
        )}
        {currentServiceType == "Video Recorder" && (
          <VideoRecorderForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            editParams={route?.params?.editParam == undefined ? null : params}
            checkFormError={checkFormError}
            submitForm={submitForm}
          />
        )}
        {currentServiceType == "Others" && (
          <OthersForm
            location={markedCoordinate}
            mapOnPress={() => {
              navigation.navigate("MarkLocation", {
                updateLocation: locationCallback,
                markedCoordinate: markedCoordinate
              });
            }}
            updateParams={(res) => {
              setParams(res);
            }}
            checkFormError={checkFormError}
            submitForm={submitForm}
            editParams={route?.params?.editParam ?? null}
          />
        )}
        <CustomModal
          title={"Submit"}
          buttonText={"Ok"}
          subTitle={"Status"}
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
            <TouchableOpacity
              style={styles.summitButton}
              onPress={() => {
                setShowSubmitStatusModal({
                  show: false,
                  message: ""
                });
                if (serverError == true) {
                  setServerError(false);
                  return;
                }
                if (route?.params?.editParam != undefined) {
                  route.params.updateEditedList(route?.params?.API_SERVICE);
                  navigation.goBack();
                } else {
                  navigation.navigate("Home");
                }
              }}
            >
              <Text style={styles.summitText}>OK</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      </ScrollView>
    </View>
  );
};

export default AddService;
