import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Market from "../screens/Market";
import MarketCoin from "../screens/MarketCoin";
const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"Market"}>
        <Stack.Screen
          name="Market"
          component={Market}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MarketCoin"
          
          component={MarketCoin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
