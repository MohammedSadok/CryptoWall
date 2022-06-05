import React from "react";
import { TouchableOpacity, Text } from "react-native";
import COLORS from "../../conts/colors";
const Button = ({ title, color, textColor, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: color,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <Text style={{ color: textColor, fontWeight: "bold", fontSize: 18 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
