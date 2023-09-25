import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Login from "@screens/Login";
import Loading from "@screens/Loading";
import Registration from "@screens/Registration";
import Home from "@screens/Home";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Registration" component={Registration} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Loading"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  );
}

export default function Entry() {
  const navigation = useNavigation();
  const [updateDelay, setUpdateDelay] = useState(10000);

  return <TabNavigator />;
}
