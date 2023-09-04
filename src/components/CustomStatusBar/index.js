import React from "react";
import { View, StatusBar, SafeAreaView } from "react-native";
import styles from "./styles";

export default function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor }}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
}

CustomStatusBar.propTypes = {};

CustomStatusBar.defaultProps = {};
