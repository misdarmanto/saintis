import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import React from "react";
import { TextColorDark } from "../Global/Color";
import { heightPercentage } from "../Global/Dimensions";

export default function MathSymbol({ symbol, color }) {
  return (
    <MathJaxSvg
      fontSize={16}
      color={color || TextColorDark}
      fontCache={true}
      style={{
        
        color: TextColorDark,
        fontSize: 15,
        lineHeight: 25,
        textAlign: "justify",
        flexWrap: "wrap",
        paddingVertical: heightPercentage(2)
      }}
    >
      {symbol}
    </MathJaxSvg>
  );
}
