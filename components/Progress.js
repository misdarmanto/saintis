import React, { memo } from "react";
import { View } from "react-native";
import { Bar } from "react-native-progress";
import { colorPrimary } from "../assets/Colors/Colors";

function ProgressBar({ progress }) {
  return (
    <View style={{ flex: 2 }}>
      <Bar
        progress={progress}
        width={null}
        height={15}
        color={colorPrimary}
        borderRadius={20}
      />
    </View>
  );
}

export default memo(ProgressBar);
