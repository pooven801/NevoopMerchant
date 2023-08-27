import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Entry from "./src/navigation/Entry";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor, store } from "./src/store";
// import { Provider, useDispatch } from "react-redux";
// import { Camera } from "react-native-vision-camera";

// const AppWrapper = () => {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// };

function App() {
  const [updateDelay, setUpdateDelay] = useState(10000);
  // const dispatch = useDispatch();
  // const authUser = store.getState()?.auth?.data;

  // useEffect(() => {
  //   cameraPermission();
  // }, []);

  // async function cameraPermission() {
  //   const cameraPermission = await Camera.getCameraPermissionStatus();
  //   if (cameraPermission != "authorized") {
  //     const newCameraPermission = await Camera.requestCameraPermission();
  //   }
  //   console.log("Camera Permission " + cameraPermission);
  // }

  return (
    // <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <StatusBar backgroundColor="#595959" barStyle="light-content" />
      <Entry />
    </NavigationContainer>
    // </PersistGate>
  );
}

export default App;
