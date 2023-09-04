import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated
} from "react-native";
import { Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
// import Constants from "expo-constants";

export default function HomeHeader(props) {
  const {
    style,
    styleLeft,
    styleCenter,
    styleTitle,
    styleRight,
    styleRightSecond,
    renderCenter,
    subTitle,
    onPressLeft,
    onPressRight,
    renderRight,
    renderLeft,
    onPressRightSecond
  } = props;

  return (
    <View
      style={[
        styles.contain,
        // Platform.OS === "android" && { marginTop: Constants.statusBarHeight },
        style
      ]}
    >
      {Platform.OS == "ios" && <StatusBar barStyle="light-content" />}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[styles.contentLeft, styleLeft]}
          onPress={onPressLeft}
        >
          {renderLeft && renderLeft()}
        </TouchableOpacity>
      </View>
      <View style={[styles.contentCenter, styleCenter]}>
        {renderCenter && renderCenter()}
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[styles.contentRight, styleRight]}
          onPress={onPressRight}
        >
          {renderRight && renderRight()}
        </TouchableOpacity>
      </View>
    </View>
  );
}

HomeHeader.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  renderCenter: PropTypes.func,
  subTitle: PropTypes.string
};

HomeHeader.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  renderLeft: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  renderCenter: () => {},
  subTitle: ""
};
