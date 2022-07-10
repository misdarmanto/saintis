import { AdMobInterstitial } from "expo-ads-admob";

export default function interstitialAdd() {
  const test = "ca-app-pub-3940256099942544/1033173712";
  const production = "ca-app-pub-8095237298596091/6268415321";
  AdMobInterstitial.setAdUnitID(production);
  AdMobInterstitial.requestAdAsync().then(() => {
    AdMobInterstitial.showAdAsync()
      .then(() => null)
      .catch((e) => console.log(e));
  });
}
