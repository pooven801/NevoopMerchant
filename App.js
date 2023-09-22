import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Entry from "./src/navigation/Entry";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store";
import { Provider } from "react-redux";

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <StatusBar backgroundColor="#595959" barStyle="light-content" />
        <Entry />
      </NavigationContainer>
    </PersistGate>
  );
}

export default AppWrapper;
