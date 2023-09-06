import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Typography, BaseColor, FontFamily } from "@config";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      //props style
      header,
      title1,
      title2,
      title3,
      headline,
      body1,
      body2,
      body3,
      callout,
      subhead,
      footnote,
      caption1,
      caption2,
      overline,
      // props font
      thin,
      ultraLight,
      light,
      regular,
      medium,
      semibold,
      bold,
      heavy,
      black,
      italic,
      //custom color
      primaryColor,
      darkPrimaryColor,
      lightPrimaryColor,
      accentColor,
      textSecondaryColor,
      grayColor,
      darkBlueColor,
      dividerColor,
      whiteColor,
      fieldColor,
      successColor,
      errorColor,
      wordingColor,
      //numberOfLines
      numberOfLines,
      onPress,
      //custom
      style
    } = this.props;
    return (
      <Text
        style={StyleSheet.flatten([
          header && Typography.header,
          title1 && Typography.title1,
          title2 && Typography.title2,
          title3 && Typography.title3,
          headline && Typography.headline,
          body1 && Typography.body1,
          body2 && Typography.body2,
          body3 && Typography.body3,
          callout && Typography.callout,
          subhead && Typography.subhead,
          footnote && Typography.footnote,
          caption1 && Typography.caption1,
          caption2 && Typography.caption2,
          overline && Typography.overline,
          //custom for font
          // thin && StyleSheet.flatten({ fontWeight: FontWeight.thin }),
          // ultraLight &&
          //     StyleSheet.flatten({
          //         fontWeight: FontWeight.ultraLight
          //     }),
          light && StyleSheet.flatten({ fontFamily: FontFamily.light }),
          regular && StyleSheet.flatten({ fontFamily: FontFamily.default }),
          medium && StyleSheet.flatten({ fontFamily: FontFamily.medium }),
          semibold && StyleSheet.flatten({ fontFamily: FontFamily.medium }),
          bold && StyleSheet.flatten({ fontFamily: FontFamily.bold }),
          (black || heavy) &&
            StyleSheet.flatten({ fontFamily: FontFamily.black }),

          light &&
            italic &&
            StyleSheet.flatten({ fontFamily: FontFamily.lightItalic }),
          regular &&
            italic &&
            StyleSheet.flatten({ fontFamily: FontFamily.defaultItalic }),
          medium &&
            italic &&
            StyleSheet.flatten({ fontFamily: FontFamily.mediumItalic }),
          semibold &&
            italic &&
            StyleSheet.flatten({ fontFamily: FontFamily.mediumItalic }),
          bold &&
            italic &&
            StyleSheet.flatten({ fontFamily: FontFamily.boldItalic }),
          (black || heavy) &&
            italic &&
            StyleSheet.flatten({ fontFamily: FontFamily.blackItalic }),
          // default color
          StyleSheet.flatten({
            color: BaseColor.wordingColor
            // ...Platform.select({
            //     android: {fontFamily: FontFamily.default},
            // }),
          }),
          //custom for color
          primaryColor && StyleSheet.flatten({ color: BaseColor.primaryColor }),
          darkPrimaryColor &&
            StyleSheet.flatten({
              color: BaseColor.darkPrimaryColor
            }),
          lightPrimaryColor &&
            StyleSheet.flatten({
              color: BaseColor.lightPrimaryColor
            }),
          accentColor && StyleSheet.flatten({ color: BaseColor.accentColor }),
          textSecondaryColor &&
            StyleSheet.flatten({
              color: BaseColor.textSecondaryColor
            }),
          grayColor && StyleSheet.flatten({ color: BaseColor.grayColor }),
          darkBlueColor &&
            StyleSheet.flatten({ color: BaseColor.darkBlueColor }),
          dividerColor && StyleSheet.flatten({ color: BaseColor.dividerColor }),
          whiteColor && StyleSheet.flatten({ color: BaseColor.whiteColor }),
          fieldColor && StyleSheet.flatten({ color: BaseColor.fieldColor }),
          successColor && StyleSheet.flatten({ color: BaseColor.successColor }),
          errorColor && StyleSheet.flatten({ color: BaseColor.errorColor }),
          wordingColor && StyleSheet.flatten({ color: BaseColor.wordingColor }),
          style && style
        ])}
        numberOfLines={numberOfLines}
        onPress={onPress}
      >
        {typeof this.props.children == "string" && this.props.children}
      </Text>
    );
  }
}

// Define typechecking
Index.propTypes = {
  //define style
  header: PropTypes.bool,
  title1: PropTypes.bool,
  title2: PropTypes.bool,
  title3: PropTypes.bool,
  headline: PropTypes.bool,
  body1: PropTypes.bool,
  body2: PropTypes.bool,
  body3: PropTypes.bool,
  callout: PropTypes.bool,
  subhead: PropTypes.bool,
  footnote: PropTypes.bool,
  caption1: PropTypes.bool,
  caption2: PropTypes.bool,
  overline: PropTypes.bool,
  //define font custom
  thin: PropTypes.bool,
  ultraLight: PropTypes.bool,
  light: PropTypes.bool,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
  semibold: PropTypes.bool,
  bold: PropTypes.bool,
  heavy: PropTypes.bool,
  black: PropTypes.bool,
  italic: PropTypes.bool,
  //custon for text color
  primaryColor: PropTypes.bool,
  darkPrimaryColor: PropTypes.bool,
  lightPrimaryColor: PropTypes.bool,
  accentColor: PropTypes.bool,
  textSecondaryColor: PropTypes.bool,
  grayColor: PropTypes.bool,
  darkBlueColor: PropTypes.bool,
  dividerColor: PropTypes.bool,
  whiteColor: PropTypes.bool,
  fieldColor: PropTypes.bool,
  successColor: PropTypes.bool,
  errorColor: PropTypes.bool,
  wordingColor: PropTypes.bool,
  //numberOfLines
  numberOfLines: PropTypes.number,
  //custom style
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node // plain text
};

Index.defaultProps = {
  //props for style
  header: false,
  title1: false,
  title2: false,
  title3: false,
  headline: false,
  body1: false,
  body2: false,
  body3: false,
  callout: false,
  subhead: false,
  footnote: false,
  caption1: false,
  caption2: false,
  overline: false,
  //props for font
  thin: false,
  ultraLight: false,
  light: false,
  regular: false,
  medium: false,
  semibold: false,
  bold: false,
  heavy: false,
  black: false,
  italic: false,
  //custon for text color
  primaryColor: false,
  darkPrimaryColor: false,
  lightPrimaryColor: false,
  accentColor: false,
  textSecondaryColor: false,
  grayColor: false,
  darkBlueColor: false,
  dividerColor: false,
  whiteColor: false,
  fieldColor: false,
  successColor: false,
  errorColor: false,
  wordingColor: false,
  //numberOfLines
  numberOfLines: 10,
  //custom style
  style: {},
  children: ""
};
