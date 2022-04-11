import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ColorLinierGradient } from "../../assets/Colors/Colors";
import { heightPercentage } from "../../Global/Dimensions";
import TextPrimary from "../Text/TextPrimary";

export default function ButtonStyle({ onPress, title, style }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ColorLinierGradient styles={styles.containerStyle}>
        <TextPrimary style={{ color: "#FFF" }}>{title}</TextPrimary>
      </ColorLinierGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    height: heightPercentage(7),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
