import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import navigation from "./navigation";
import profileNavigation from "./profileNavigation";
import navigationHomeMarket from "./navigationHomeMarket";
import IonIcon from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import Transactions from "../screens/Transactions";
import COLORS from "../conts/colors";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  const [loaded] = useFonts({
    Mulish_400Regular,
    Mulish_700Bold,
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={"navigationHomeMarket"}
        screenOptions={({ route }) => ({
          // tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.blue,
          tabBarInactiveTintColor: COLORS.grey,
          tabBarHideOnKeyboard: "true",
          tabBarLabelStyle: {
            marginBottom: 12,
            fontFamily: "Mulish_400Regular",
            fontSize: 12,
            letterSpacing: 1,
          },
          tabBarStyle: {
            height: "8%",
          },
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === "Home") {
              iconName = focused ? "home" : "home-outline";
              return (
                <IonIcon name={iconName} size={size} color={color}></IonIcon>
              );
            } else if (rn === "Market") {
              iconName = "coins";
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            } else if (rn === "Profile") {
              iconName = focused ? "person" : "person-outline";
              return (
                <IonIcon name={iconName} size={size} color={color}></IonIcon>
              );
            }
          },
        })}
      >
        <Tab.Screen
          name={"Home"}
          component={navigationHomeMarket}
          options={{ headerShown: false}}
        />
        <Tab.Screen
          name={"Market"}
          component={navigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={"Profile"}
          component={profileNavigation}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
