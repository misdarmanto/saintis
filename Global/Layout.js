import React from "react";
import { StyleSheet, View } from "react-native";
import { heightPercentage, widthPercentage } from "./Dimensions";

export default function Layout({ style, children }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: widthPercentage(2),
    backgroundColor: "#F8FCFE",
  },
});
