/**
 * Color Palette Define
 */

let OrangeColor = {
  primaryColor: "#F18904",
  darkPrimaryColor: "#BDA589",
  lightPrimaryColor: "#F49F05",
  backgroundPrimaryColor: "#FFF2E9",
  basePrimaryColor: "#F1DEC5",
  accentColor: "#4A90A4"
};

let TurquoiseColor = {
  primaryColor: "#138D75",
  darkPrimaryColor: "#0E6655",
  lightPrimaryColor: "#A2D9CE",
  backgroundPrimaryColor: "#CADFDD",
  basePrimaryColor: "#E8F6F3",
  accentColor: "#CCD1D1"
};

let BlueColor = {
  primaryColor: "#5DADE2",
  darkPrimaryColor: "#1281ac",
  lightPrimaryColor: "#68c9ef",
  accentColor: "#FF8A65"
};

let PinkColor = {
  primaryColor: "#A569BD",
  darkPrimaryColor: "#C2185B",
  lightPrimaryColor: "#F8BBD0",
  accentColor: "#8BC34A"
};

let GreenColor = {
  primaryColor: "#58D68D",
  darkPrimaryColor: "#388E3C",
  lightPrimaryColor: "#C8E6C9",
  accentColor: "#607D8B"
};

let YellowColor = {
  primaryColor: "#FDC60A",
  darkPrimaryColor: "#FFA000",
  lightPrimaryColor: "#FFECB3",
  accentColor: "#795548"
};

/**
 * Main color use for whole application
 */
let BaseColor = {
  ...TurquoiseColor,
  ...{
    textPrimaryColor: "#212121", //#58595b
    textSecondaryColor: "#E0E0E1",
    grayColor: "#9B9B9B",
    shopBGGrayColor: "#F6F6F6",
    darkBlueColor: "#24253D",
    dividerColor: "#BDBDBD",
    whiteColor: "#FFFFFF",
    fieldColor: "#F5F5F5",
    yellowColor: "#FDC60A",
    navyBlue: "#3C5A99",
    googleRed: "#DE5246",
    facebookBlue: "#3B5998",
    kashmir: "#5D6D7E",
    successColor: "#00A651",
    errorColor: "#ED1C24",
    wordingColor: "#58595B",
    whatsappGreen: "#5FCE48",
    blueColor: "#1C75BC",
    purpleColor: "#915EBC",
    redColor: "#ED1C24",
    lightRedColor: "#FFE8E6",
    blackColor: "#000",
    lightGrayColor: "#EBEBEB"
  }
};

export {
  BaseColor,
  OrangeColor,
  BlueColor,
  PinkColor,
  GreenColor,
  YellowColor
};
