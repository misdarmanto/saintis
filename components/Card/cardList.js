import React from "react";
import { View } from "react-native";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";


const CardList = ({ children, style }) => {
  return (
    <View
      style={[
        {
          height: heightPercentage(20),
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: widthPercentage(2),
          marginVertical: heightPercentage(1),
          justifyContent: "center",
          backgroundColor: "#FFF"
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default CardList;
