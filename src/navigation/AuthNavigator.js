import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import Start from "../screens/Satrt"
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainNavigation from "./MainNavigation";
import Loader from "../components/general/Loader";
const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  const [initialRouteName, setInitialRouteName] = React.useState("");
  React.useEffect(() => {
    authUser();
  }, []);
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName("MainNavigation");
        } else {
          setInitialRouteName("LoginScreen");
        }
      } else {
        setInitialRouteName("Start");
      }
    } catch (error) {
      setInitialRouteName("Start");
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="MainNavigation" component={MainNavigation} />
            <Stack.Screen name="Start" component={Start} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default AuthNavigator;
