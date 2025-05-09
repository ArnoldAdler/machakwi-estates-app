import cow from "@/assets/images/cow_grey.png";
import Text from "@/components/Text";
import { openModal } from "@/plugins/modal";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import QuickCattleViewModal from "./QuickCattleViewModal";
export const getColor = (data) => {
  if (data.isSold) return "#2F2441";
  if (data.isDead) return "#E74032";
  // if (data.id == "S29") console.log(data);
  return "#5CB591";
};
export default function CattleCard({ data, navigation, style, color }) {
  // const { getAccountColor } = useContext(MainContext);
  const { width, height } = Dimensions.get("window");

  function getAge(timestamp) {
    // Check if the timestamp is valid.
    if (typeof timestamp !== "number" || isNaN(timestamp)) {
      return "Invalid timestamp";
    }

    const now = new Date();
    const birthDate = new Date(timestamp);

    const years = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    const dayDiff = now.getDate() - birthDate.getDate();

    let ageInYears = years;
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      ageInYears--;
    }

    if (ageInYears > 1) {
      return `${ageInYears} Years`;
    } else if (ageInYears === 1) {
      return `1 Year`;
    }

    const totalMonths = years * 12 + monthDiff;
    let ageInMonths = totalMonths;
    if (dayDiff < 0) {
      ageInMonths--;
    }

    if (ageInMonths > 1) {
      return `${ageInMonths} Months`;
    } else if (ageInMonths === 1) {
      return `1 Month`;
    }

    const ageInDays = Math.floor((now - birthDate) / (24 * 60 * 60 * 1000));
    if (ageInDays > 1) {
      return `${ageInDays} Days`;
    } else if (ageInDays === 1) {
      return `1 Day`;
    }
    return "0 Days";
  }
  ///////
  ////////
  return (
    <TouchableOpacity
      onPress={() => {
        openModal(
          <QuickCattleViewModal cattle={data} />,
          <View
            style={{
              // backgroundColor: "#F0F2F5",
              flex: 1,
              alignItems: "center",
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: 70,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 15,
              }}
            >
              <Image
                source={cow}
                style={{
                  resizeMode: "contain",
                  width: 75,
                  height: 65,
                  tintColor: getColor(data),
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 5,
              }}
            >
              <Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 19,
                  }}
                >
                  {data.id}{" "}
                  {data.earTagNumber && data.earTagNumber != data.id
                    ? `(Ear Tag No.  ${data.earTagNumber})`
                    : ""}
                  {data.isSold ? " (Sold)" : ""}
                  {data.isDead ? " (Dead)" : ""}
                </Text>
              </Text>
            </View>
          </View>
        );
      }}
      style={{
        height: 85,
        width: "100%",
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        ...style,
      }}
    >
      <View
        style={{
          // backgroundColor: "#F0F2F5",
          flex: 1,
          alignItems: "center",
          marginBottom: 7,
          borderRadius: 5,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 70,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 15,
          }}
        >
          <Image
            source={cow}
            style={{
              resizeMode: "contain",
              width: 75,
              height: 75,
              tintColor: getColor(data),
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginTop: 5,
          }}
        >
          <Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: 19,
              }}
            >
              {data.id}{" "}
              {data.earTagNumber && data.earTagNumber != data.id
                ? `(Ear Tag No.  ${data.earTagNumber})`
                : ""}
              {data.isSold ? " (Sold)" : ""}
            </Text>
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 13,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {data.gender && (
              <Text style={{}}>
                {data.gender == "male" && "Bull"}
                {data.gender == "female" && "Cow"}
                {data.gender == "male" && (
                  <MaterialIcons
                    name="male"
                    size={18}
                    color="#039DF6"
                    style={{
                      marginTop: 10,
                    }}
                  />
                )}
                {data.gender == "female" && (
                  <MaterialIcons name="female" size={18} color="#E648A2" />
                )}
                {"\n"}
              </Text>
            )}
            {data.dateOfBirth && (
              <Text style={{}}>
                {getAge(new Date(data.dateOfBirth.toDate()).getTime())}
                {" Old"}
              </Text>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
