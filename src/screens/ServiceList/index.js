import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  FlatList
} from "react-native";
import styles from "./styles";
import { useSelector } from "react-redux";
import { CustomStatusBar, Header } from "@components";
import { BaseColor, Images } from "@config";
import * as Services from "@services";
import { Dropdown } from "react-native-element-dropdown";

const ServiceList = ({ navigation }) => {
  const [currentServiceType, setCurrentServiceType] = useState("Food");
  const [serviceList, setServiceList] = useState(null);
  const [pagination, setPagination] = useState({
    pagination: { pageNum: 0, docPerPage: 10 }
  });
  const authUser = useSelector((state) => state?.auth?.data);
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
  if (currentServiceType == "Food") {
    API_SERVICE_TYPE = "foodServiceList";
  } else if (currentServiceType == "Vanue") {
    API_SERVICE_TYPE = "vanueServiceList";
  } else if (currentServiceType == "Accommodation") {
    API_SERVICE_TYPE = "accommandationServiceList";
  } else if (currentServiceType == "Transportation/Logistic") {
    API_SERVICE_TYPE = "transportationLogisticServiceList";
  } else if (currentServiceType == "Designer") {
    API_SERVICE_TYPE = "designerServiceList";
  } else if (currentServiceType == "Photographer") {
    API_SERVICE_TYPE = "photographerServiceList";
  } else if (currentServiceType == "Video Recorder") {
    API_SERVICE_TYPE = "videoRecorderServiceList";
  } else if (currentServiceType == "Multimedia") {
    API_SERVICE_TYPE = "multimediaServiceList";
  } else if (currentServiceType == "Decoration") {
    API_SERVICE_TYPE = "decorationServiceList";
  } else if (currentServiceType == "Beauty & Health") {
    API_SERVICE_TYPE = "beautyHealthServiceList";
  } else {
    API_SERVICE_TYPE = "othersServiceList";
  }

  useEffect(() => {
    call_API();
  }, [currentServiceType]);

  useEffect(() => {
    if (serviceList !== null) updateListing();
  }, [pagination]);

  const call_API = () => {
    Services.getServiceList(
      pagination,
      API_SERVICE_TYPE,
      (merchantId = authUser?._id)
    ).then((res) => {
      setServiceList(res);
    });
  };

  const updateListing = () => {
    Services.getServiceList(
      pagination,
      API_SERVICE_TYPE,
      (merchantId = authUser?._id)
    ).then((res) => {
      setServiceList([...serviceList, ...res]);
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
      <CustomStatusBar
        backgroundColor={BaseColor.primaryColor}
        barStyle="light-content"
      />
      <Header
        ignoreBottomBorder={true}
        style={{
          backgroundColor: BaseColor.primaryColor
        }}
        title={"Service List"}
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
      />
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
          setPagination({
            pagination: {
              pageNum: 0,
              docPerPage: 10
            }
          });
          setCurrentServiceType(item.value);
        }}
        renderItem={renderItem}
      />
      <FlatList
        style={{ marginTop: 15 }}
        data={serviceList}
        keyExtractor={(item, index) => index + "_" + item}
        onEndReached={() => {
          setPagination({
            pagination: {
              pageNum: pagination.pagination.pageNum + 1,
              docPerPage: 10
            }
          });
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "95%",
              height: 100,
              backgroundColor: "white",
              alignSelf: "center",
              borderRadius: 10,
              marginTop: 10
            }}
            key={index}
            onPress={() => {}}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "center"
              }}
            >
              {item?.images[0] == undefined ? (
                <View style={styles.emptyImageContainer}>
                  <Image
                    source={Images.icons.imageIcon}
                    style={styles.emptyImage}
                  />
                </View>
              ) : (
                <Image src={item?.images[0]} style={styles.imageStyle} />
              )}
              {currentServiceType == "Food" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.pricePerPlate}
                  </Text>
                  <Text>{item?.menuType}</Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Vanue" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>Price Per {item?.pricePerDayHour}</Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Accommodation" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>Price Per {item?.pricePerDayHour}</Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Transportation/Logistic" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Designer" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Photographer" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Video Recorder" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Multimedia" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Decoration" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Beauty & Health" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
              {currentServiceType == "Others" && (
                <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 16 }}>{item?.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    RM {item?.price}
                  </Text>
                  <Text>
                    Status : {item?.status == "New" ? "Pending" : item?.status}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ServiceList;
