import React from "react";
import {
  Modal,
  Text as RNText,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
import { Images } from "@config/images";
import Text from "./../Text";
import Button from "./../Button";

export default function CustomModal(props) {
  const {
    show = false,
    color = "black",
    backgroundColor = "white",
    dimLights = 0.8,
    //loadingMessage = "Loading..."
    title,
    modalStyle,
    mainContentStyle,
    layout,
    subTitle,
    message,
    error,
    success,
    buttonText,
    buttonOnPress,
    buttonDisabled = false,
    buttonLoading = false,
    cancelOnPress,
    cancelOnPressNew,
    dialogWidth,
    dialogPadding,
    mainContainerStyle,
    cancelOnPressStyle,
    style
  } = props;

  renderChildContent = () => {
    return (
      <View
        style={[
          {
            width: "90%",
            padding: mainContainerStyle ? mainContainerStyle : 20,
            backgroundColor: `${backgroundColor}`,
            borderRadius: 13
          },
          mainContentStyle
        ]}
      >
        {cancelOnPress && !layout && (
          <TouchableOpacity
            style={{
              height: 20,
              width: 20,
              alignItems: "center",
              backgroundColor: "transparent",
              position: "absolute",
              top: 20,
              right: 15,
              zIndex: 9
            }}
            onPress={() => cancelOnPress && cancelOnPress()}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={Images.icons.close}
            />
          </TouchableOpacity>
        )}
        {title && (
          <Text wordingColor medium title2>
            {title}
          </Text>
        )}
        {subTitle && (
          <Text
            bold
            header
            style={[
              error && StyleSheet.flatten({ color: BaseColor.errorColor }),
              success && StyleSheet.flatten({ color: BaseColor.successColor })
            ]}
          >
            {subTitle}
          </Text>
        )}
        {props.children || (
          <View style={{ paddingVertical: 20 }}>
            <Text wordingColor body1>
              {message}
            </Text>
          </View>
        )}
        {buttonText && (
          <View style={{ width: "100%" }}>
            {/* <Button
                disabled={buttonDisabled}
                loading={buttonLoading}
                round
                full
                style={[
                  { marginTop: 25 },
                  buttonDisabled && { backgroundColor: BaseColor.grayColor },
                ]}
                onPress={() => {
                  buttonOnPress && buttonOnPress();
                }}
              >
                {buttonText}
              </Button> */}
          </View>
        )}
      </View>
    );
  };

  renderContent = () => {
    return (
      <View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: `rgba(0,0,0,${dimLights})`
          },
          modalStyle
        ]}
      >
        {cancelOnPressNew ? (
          <TouchableWithoutFeedback>
            {renderChildContent()}
          </TouchableWithoutFeedback>
        ) : (
          renderChildContent()
        )}
      </View>
    );
  };

  return (
    <Modal
      transparent={true}
      onRequestClose={() => {
        cancelOnPressNew && cancelOnPressNew();
      }}
      animationType="none"
      visible={show}
    >
      {cancelOnPressNew ? (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            cancelOnPressNew && cancelOnPressNew();
          }}
        >
          {renderContent()}
        </TouchableOpacity>
      ) : (
        renderContent()
      )}
    </Modal>
  );
}

CustomModal.propTypes = {
  //define style
  error: PropTypes.bool,
  success: PropTypes.bool
};
CustomModal.defaultProps = {
  //props for style
  error: false,
  success: false
};
