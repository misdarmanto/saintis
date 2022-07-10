import { Share } from "react-native";
import { packageName } from "../Global/packageName";

const onShare = async () => {
  try {
    const result = await Share.share({
      message: `https://play.google.com/store/apps/details?id=${packageName}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default onShare;
