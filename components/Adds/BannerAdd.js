import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import { View } from "react-native";

function BannerAdd({ size, styles }) {
  const test = "ca-app-pub-3940256099942544/6300978111"; //test ad
  const production = "ca-app-pub-8095237298596091/7360390749";
  return (
    <View style={[{ justifyContent: "center", alignItems: "center" }, styles]}>
      <AdMobBanner
        adUnitID={production}
        bannerSize={size ? size : "largeBanner"}
        onDidFailToReceiveAdWithError={() => console.log("error")}
      />
    </View>
  );
}

export default BannerAdd;
