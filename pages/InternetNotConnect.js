import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

function InternetNotConnect() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFF" }}>
      <LottieView
        style={{ width: 400, height: 400 }}
        source={require("../assets/no-internet.json")}
        autoPlay
        loop={true}
      />
    </View>
  );
}

export default InternetNotConnect;
