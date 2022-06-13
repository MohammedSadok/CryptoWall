import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import Start from "../screens/Satrt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/general/Loader";
import "react-native-gesture-handler";
import MainNavigation from "./mainNavigation";
import AuthContext from "../context/authoContext";
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  const { login } = useContext(AuthContext);
  const [initial, setInitial] = useState(login);
  useEffect(() => {
    const authUser = async () => {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitial(true);
        } else {
          setInitial(false);
        }
      } else {
        setInitial(-1);
      }
    };
    authUser();
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={initial == -1 ? "Start" : "LoginScreen"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ tabBarStyle: { display: "none" } }}
        />
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ tabBarStyle: { display: "none" } }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AuthNavigator;
