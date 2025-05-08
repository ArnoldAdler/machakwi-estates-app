import { Ionicons } from "@expo/vector-icons";
import image from "@/assets/logo_green.png";
import Text from "@/components/Text";
import React, { useContext } from "react";
import {
  AlertIOS,
  Image,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { text_color_primary } from "@/config/theme";
import { isDev } from "@/config";
import { stopLoadingIndicator } from "@/plugins/loadingIndicator";
import { MainContext } from "@/contexts/MainContext";
import { openMenuModal } from "@/plugins/modal";
import placeholder_image from "@/assets/images/placeholders/user.png";
export default function AppHeader({ backAction, menuAction, title, name }) {
  const { user } = useContext(MainContext);

  /////////////////
  const icon_size = 18;
  const font_color = text_color_primary;
  const image_size = 35;
  stopLoadingIndicator();

  return (
    <View
      style={{
        marginBottom: 10,
        paddingHorizontal: 30,
        marginTop: 25,
        backgroundColor: "#39435A",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        height: 80,
      }}
    >
      <View
        style={{
          // paddingTop: 15,
          flexDirection: "row",
          // height: 40,
          // alignItems: "center",
          // backgroundColor: "#007ACC",
        }}
      >
        <View
          style={{
            // height: "100%",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              height: 40,
              width: 90,
              resizeMode: "cover",
            }}
            source={image}
          ></Image>
        </View>
        <Text
          style={{
            paddingTop: 15,
            fontWeight: "bold",
            fontSize: 16,
            // color: "red",
            // backgroundColor: "blue",
            width: "55%",
            marginLeft: 10,
            paddingLeft: 15,
            bottom: 5,
            textAlign: "left",
          }}
        >
          {/* {title || name || (
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {"PERFORMANCE\n"}
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "bold",
                }}
              >
                APP
              </Text>
            </Text>
          )} */}
          {isDev ? (
            <Text
              style={{
                color: "#FF0000",
              }}
            >
              DEV MODE
            </Text>
          ) : (
            ""
          )}
        </Text>
        {/*    <TouchableOpacity
          disabled
          onPress={() => {
            openMenuModal(
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    height: image_size,
                    width: image_size,
                    borderRadius: image_size,
                    borderWidth: 1,
                    borderColor: "grey",
                    marginRight: 20,
                  }}
                  source={
                    user.profilePhoto
                      ? { uri: user.profilePhoto }
                      : placeholder_image
                  }
                ></Image>
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  Arnold Gwatidzo
                </Text>
              </View>,
              [
                {
                  title: "Your Profile",
                  icon: (
                    <Ionicons name="person-outline" size={24} color="black" />
                  ),
                },
                {
                  title: "Notifications",
                  icon: (
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color="black"
                    />
                  ),
                },
                {
                  title: "App Settings",
                  icon: (
                    <Ionicons name="settings-outline" size={24} color="black" />
                  ),
                },
                {
                  title: "About App",
                  icon: (
                    <Ionicons
                      name="information-circle-outline"
                      size={24}
                      color="black"
                    />
                  ),
                },
              ]
            );
            // notifyMessage("This is a test message");
          }}
          style={{
            width: 50,
            //flexDirection: 'row',
            alignItems: "flex-end",
            justifyContent: "center",

            paddingRight: 5,
            // paddingTop: 23,
          }}
        >
          <Image
            style={{
              height: image_size,
              width: image_size,
              borderRadius: image_size,
              borderWidth: 0.5,
              borderColor: "#C3C2C2",
            }}
            source={
              user.profilePhoto ? { uri: user.profilePhoto } : placeholder_image
            }
          ></Image>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          marginTop: 5,
          backgroundColor: "#626068",
          height: 1,
          width: "100%",
        }}
      ></View>
    </View>
  );
}
