import cow from "@/assets/images/cow_grey.png";
import Card from "@/components/Card";
import Text from "@/components/Text";
import { MainContext } from "@/contexts/MainContext";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Dimensions, Image, View } from "react-native";
export default function HerdOverview() {
  const { cattles, maleCattlesNumber, femaleCattlesNumber } =
    useContext(MainContext);
  var deviceWidth = Dimensions.get("window").width;

  return (
    <>
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={cow}
            style={{
              // width: "40%",
              height: 65,
              width: "50%",
              borderRadius: 10,
              resizeMode: "contain",
              right: 10,
              // backgroundColor: "#f0f0f0",
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: "#000",
                textAlign: "center",
              }}
            >
              {cattles.length || 0}
            </Text>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                left: 5,
              }}
            >
              Total Cattle
            </Text>
          </View>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {[
          {
            gender: "Bulls",
            amount: maleCattlesNumber,
            icon: <MaterialIcons name="male" size={30} color="#039DF6" />,
          },
          {
            gender: "Cows",
            amount: femaleCattlesNumber,
            icon: <MaterialIcons name="female" size={30} color="#E648A2" />,
          },
        ].map((item, index) => (
          <Card style={{ width: deviceWidth / 2 - 38 }} key={index}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {item.icon}
            </View>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 10,
                flexdirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "right",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {item.amount}
              </Text>
              <Text
                style={{
                  fontWeight: "normal",

                  fontSize: 12,
                  marginLeft: 10,
                  flexdirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {item.gender}
              </Text>
            </Text>
          </Card>
        ))}
      </View>
    </>
  );
}
