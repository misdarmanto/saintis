import { Share } from "react-native";

const onShare = async () => {
  try {
    const result = await Share.share({
      message: "https://play.google.com/store/apps/details?id=com.misdar.saintis",
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
