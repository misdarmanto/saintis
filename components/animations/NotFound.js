import React from "react";
import { View } from "react-native";
import { heightPercentage, widthPercentage } from "../../Global/Dimensions";
import TextSmall from "../Text/TextSmall";
import { TextColorDark } from "../../Global/Color";

export default function NotFoundAnimation({massage="maaf saat ini belum tersedia"}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FCFE",
      }}
    >
     
      <TextSmall style={{ fontSize: 20, color: TextColorDark }}>
        {massage}
      </TextSmall>
    </View>
  );
}
