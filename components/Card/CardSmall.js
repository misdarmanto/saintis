import React from "react";
import { View } from "react-native";
import { colorSecondary } from "../../assets/Colors/Colors";

const CardSmall = ({ children, style }) => {
  return (
    <View
      style={[
        {
          backgroundColor: colorSecondary,
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
          borderRadius: 10,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default CardSmall;
