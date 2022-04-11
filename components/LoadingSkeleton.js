import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingSkeleton() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <LottieView
        style={{ width: 200, height: 200 }}
        source={require("../assets/85646-loading-dots-blue.json")}
        autoPlay
        loop={true}
      />
    </View>
  );
}
