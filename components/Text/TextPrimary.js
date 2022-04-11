import React from "react";
import { Text } from "react-native";
import { colorLight, TextDark } from "../../assets/Colors/Colors";

const TextPrimary = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontSize: 18,
          fontWeight: "bold",
          color: colorLight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextPrimary;
