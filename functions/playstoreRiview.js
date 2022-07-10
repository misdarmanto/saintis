import * as Linking from "expo-linking";
import * as StoreReview from "expo-store-review";
import { packageName } from "../Global/packageName";

export default async function playStoreRiview() {
  if (await StoreReview.hasAction()) {
    Linking.openURL(`market://details?id=${packageName}&showAllReviews=true`);
    StoreReview.requestReview();
  }
}
