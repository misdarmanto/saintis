import { TouchableOpacity } from "react-native";
import onShare from "../functions/shareFunction";
import { Entypo } from "@expo/vector-icons";
import { colorLight } from "../assets/Colors/Colors"
import { widthPercentage } from "../Global/Dimensions";

const HeaderRightComponent = () => {
  return (
    <TouchableOpacity onPress={onShare}>
      <Entypo
        name="share"
        size={30}
        color={colorLight}
        style={{ marginRight: widthPercentage(5) }}
      />
    </TouchableOpacity>
  );
};

const HeaderLeftComponent = () => {
  return (
    <TouchableOpacity>
      {/* <Image
          style={{
            width: widthPercentage(12),
            height: heightPercentage(6.3),
            borderRadius: 50,
            marginLeft: widthPercentage(2)
          }}
          source={require("../assets/icon.png")}
        /> */}
    </TouchableOpacity>
  );
};

export { HeaderRightComponent, HeaderLeftComponent };
