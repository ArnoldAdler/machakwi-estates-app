import Text from "@/components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Button, Dimensions, View } from "react-native";
/////////////////////////

export default function Login() {
  var deviceWidth = Dimensions.get("window").width;
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
    return () => {};
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        onPress={() => {
          router.push("/home");
        }}
        title="sign in"
        color="#841584"
      >
        <MaterialCommunityIcons name="cow" size={50} color="black" style={{}} />
        <Text>Login</Text>
      </Button>
    </View>
  );
}
