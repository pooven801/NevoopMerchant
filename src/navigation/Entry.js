import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "@screens/Login";
import Loading from "@screens/Loading";
import Registration from "@screens/Registration";
import Home from "@screens/Home";
import AddService from "@screens/AddService";
import MarkLocation from "@screens/MarkLocation";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
      // tabBarOptions={{
      //   activeTintColor: "#fff",
      //   inactiveTintColor: "lightgray",
      //   activeBackgroundColor: "#c4461c",
      //   inactiveBackgroundColor: "#b55031",
      //   style: {
      //     backgroundColor: "#CE4418",
      //     paddingBottom: 3
      //   }
      // }}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="AddService" component={AddService} /> */}
    </Tab.Navigator>
  );
}

export default function Entry() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Loading"
    >
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="AddService" component={AddService} />
      <Stack.Screen name="MarkLocation" component={MarkLocation} />
    </Stack.Navigator>
  );
}
