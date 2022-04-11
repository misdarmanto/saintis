import React from "react";
import { Text } from "react-native";
import { TextColorDark } from "../../Global/Color";

const TextSmall = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          padding: 5,
          fontSize: 13,
          color: TextColorDark,
          fontFamily: "lato"
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextSmall;
