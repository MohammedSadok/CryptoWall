import navigation from "./navigation";
import navigationHomeMarket from "./navigationHomeMarket";
import IonIcon from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Transactions from "../screens/Transactions";
import PortfolioScreen from "../screens/PortfolioScreen";
import COLORS from "../conts/colors";
import {
  useFonts,
  Mulish_400Regular,
  Mulish_700Bold,
} from "@expo-google-fonts/mulish";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"Profile"}>
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PortfolioScreen"
          component={PortfolioScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const MainNavigation = () => {
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
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={"Market"}
          component={navigation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={"Profile"}
          component={ProfileNavigation}
          options={{ headerShown: false, tabBarVisible: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;