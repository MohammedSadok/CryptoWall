import React, { useContext } from "react";
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
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={login == -1 ? "Start" : "LoginScreen"}
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
        <Stack.Screen name="Start" component={Start} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AuthNavigator;
