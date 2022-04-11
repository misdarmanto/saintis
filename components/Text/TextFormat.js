import React from "react";
import { Text } from "react-native";
import { widthPercentage } from "../../Global/Dimensions";
import { colorDark } from "../../assets/Colors/Colors";

const TextFormat = ({ text }) => {
  let textResult = "";

  if (text < 0) textResult = "0";
  if (text.toString().length > 6) {
    textResult = text.toString().slice(0, text.toString().length - 6) + "M";
  } else if (text.toString().length > 3) {
    textResult = text.toString().slice(0, text.toString().length - 3) + "K";
  } else {
    textResult = text;
  }

  return (
    <Text
      style={{
        fontSize: 11,
        color: colorDark,
        paddingLeft: widthPercentage(1),
      }}
    >
      {textResult}
    </Text>
  );
};

export default TextFormat;
