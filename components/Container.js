import React from "react";
import { View } from "react-native";
import { heightPercentage, widthPercentage } from "../Global/Dimensions";

const Container = ({ children, styles }) => {
  return (
    <View
      style={[
        {
          backgroundColor: "#FFF",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          borderRadius: 10,
          minHeight: heightPercentage(10),
          paddingHorizontal: widthPercentage(3),
          paddingVertical: heightPercentage(2)
        },
        styles,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;
