import React from "react";
import { TouchableOpacity, View } from "react-native";
import { colorSecondary } from "../assets/Colors/Colors";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";
import TextSmall from "./Text/TextSmall";

const IconCricle = ({ children, onPress, text, styles }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            backgroundColor: colorSecondary,
            minHeight: heightPercentage(10),
            minWidth: widthPercentage(19),
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: widthPercentage(2),
            marginVertical: heightPercentage(1),
          },
          styles,
        ]}
      >
        {children}
      </TouchableOpacity>
      {text && <TextSmall>{text}</TextSmall>}
    </View>
  );
};

export default IconCricle;
