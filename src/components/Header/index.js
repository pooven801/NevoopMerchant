import React, { Component } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  Platform
} from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "@config";

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function Header(props) {
  const {
    style,
    styleLeft,
    styleCenter,
    styleTitle,
    styleRight,
    styleRightSecond,
    styleRightThird,
    title,
    subTitle,
    onPressLeft,
    onPressRight,
    onPressRightSecond,
    onPressRightThird,
    renderLeft,
    renderRightThird,
    renderRightSecond,
    renderRight,
    ignoreBottomBorder
  } = props;

  return (
    <Animated.View
      style={[
        styles.contain,
        !ignoreBottomBorder && {
          borderColor: BaseColor.textSecondaryColor,
          borderBottomWidth: 1
        },
        style
        // Platform.OS === "android" && { marginTop: StatusBar.currentHeight }
      ]}
    >
      {Platform.OS == "ios" && <StatusBar barStyle="dark-content" />}
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[styles.contentLeft, styleLeft]}
          onPress={onPressLeft}
        >
          {renderLeft()}
        </TouchableOpacity>
      </View>
      <View style={[styles.contentCenter, styleCenter]}>
        <Text
          style={[{ fontSize: 18, color: "white" }, styleTitle]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subTitle != "" && (
          <Text caption2 light>
            {subTitle}
          </Text>
        )}
      </View>
      <View style={styles.right}>
        <TouchableOpacity
          style={[styles.contentRightThird, styleRightThird]}
          onPress={onPressRightThird}
        >
          {renderRightThird()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentRightSecond, styleRightSecond]}
          onPress={onPressRightSecond}
        >
          {renderRightSecond()}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.contentRight, styleRight]}
          onPress={onPressRight}
        >
          {renderRight()}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightThird: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  renderRightThird: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressRightThird: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
  ignoreBottomBorder: PropTypes.bool
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  styleRightThird: {},
  renderLeft: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  renderRightThird: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  onPressRightThird: () => {},
  title: "",
  subTitle: "",
  barStyle: "dark-content",
  ignoreBottomBorder: false
};
