import React from "react";
import { Text } from "react-native";
import { colorDark } from "../../assets/Colors/Colors";

const TextParagraph = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          color: colorDark,
          fontSize: 15,
          lineHeight: 25,
          textAlign: "justify",
          flexWrap: "wrap",
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextParagraph

