import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MarketCoin from "../screens/MarketCoin";
const Stack = createNativeStackNavigator();
export default function () {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen
          name="MarketCoin"
          component={MarketCoin}
          options={{ headerShown: false, tabBarStyle: { display: "none" } }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
