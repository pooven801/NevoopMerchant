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
import MapView from "react-native-maps";

const AnimatedText = Animated.createAnimatedComponent(Text);

export default function MapCoordinateMarking(props) {
  const {} = props;

  return (
    <MapView
      style={{ height: "100%", width: "100" }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      onMapReady={(res) => {
        console.log(res);
      }}
    />
  );
}

MapCoordinateMarking.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

MapCoordinateMarking.defaultProps = {
  style: {},
  styleLeft: {}
};
