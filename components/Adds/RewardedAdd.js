import { AdMobRewarded } from "expo-ads-admob";

const production = "ca-app-pub-8095237298596091/6620603268"
const test = "ca-app-pub-3940256099942544/5224354917";

function RewardedAdd() {
  AdMobRewarded.setAdUnitID(production);
  AdMobRewarded.requestAdAsync().then(() => {
    AdMobRewarded.showAdAsync()
      .then(() => console.log("ok"))
      .catch((e) => console.log(e.message));
  });
}

export default RewardedAdd;
