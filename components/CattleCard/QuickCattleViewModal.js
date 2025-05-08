import ScreenHeading from "@/components/ScreenHeading";
import Text from "@/components/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { format, isSameDay, isToday, isYesterday } from "date-fns";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { checkTimeLapse } from "../../helperFunctions/Time/checkTimeLapse";
import { firebaseDB } from "../../utils/ncodia-databases-dev/firebase/initFirebase";

export default function QuickCattleViewModal({ cattle }) {
  var data = [
    {
      name: "Aquisition Method",
      value: cattle.aquisationType,
    },
    {
      name: "Name",
      value:
        cattle.name || cattle.gender
          ? cattle.gender == "male"
            ? "Bull"
            : "Cow"
          : null,
    },

    {
      name: "Date Of Birth",
      value: format(cattle.dateOfBirth.toDate(), "do MMMM yyyy"),
    },
    {
      name: "Mother",
      value: cattle.mothersID,
    },
    {
      name: "Gender",
      value: cattle.description || (
        <Text style={{}}>
          {cattle.gender == "male" && "Male"}
          {cattle.gender == "female" && "Female"}
          {cattle.gender == "male" ? (
            <MaterialIcons name="male" size={18} color="#039DF6" />
          ) : (
            <MaterialIcons name="female" size={18} color="#E648A2" />
          )}
          {"\n"}
        </Text>
      ),
    },
    {
      name: "Breed",
      value: cattle.breed,
    },
    {
      name: "Color",
      value: cattle.color,
    },
  ];
  ////////////////
  const [reports, setreports] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  ////////////////
  var getData = async () => {
    try {
      const parentDocRef = doc(firebaseDB, "cattles", cattle.id);
      const subcollectionRef = collection(parentDocRef, "reports");
      const querySnapshot = await getDocs(subcollectionRef);
      return querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error("Error getting subcollection documents:", error);
      return [];
    }
  };
  useEffect(() => {
    getData().then((data) => {
      setreports(data);

      setTimeout(() => {
        setisLoading(false);
      }, 500);
    });
    return () => {};
  }, [cattle.id]);

  /////////////

  return (
    <View style={{}}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "black",
              fontSize: 14,
              width: 150,
            }}
          >
            {item.name} :
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 13,
            }}
          >
            {item.value}
          </Text>
        </View>
      ))}
      <ScreenHeading title="Historical Reports" />
      <View>
        {!isLoading ? (
          reports.length > 0 ? (
            reports.map((item, index) => {
              const getDate = () => {
                var date = item.createdAt?.toDate();
                if (
                  index != 0 &&
                  isSameDay(reports[index - 1].createdAt?.toDate(), date)
                )
                  return "";
                if (isToday(date)) {
                  return "Today";
                  // return `${format(date, "do MMM - EEE")} (Today)`;
                }
                if (isYesterday(date)) return "Yesterday";

                // return `${format(date, "do MMM")} (Yesterday)`;

                return format(item.createdAt?.toDate(), "EEE do MMM");
              };
              return (
                <View
                  key={index}
                  style={
                    {
                      // paddingHorizontal: 25,
                    }
                  }
                >
                  {getDate() && (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#49587B",
                        marginLeft: 16,
                        marginBottom: 15,
                        marginTop: 6,
                      }}
                    >
                      {getDate()}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      // openMenuModal(
                      //   [
                      //     {
                      //       title: "Start Working Timer",
                      //       icon: (
                      //         <MaterialIcons
                      //           name="timer"
                      //           size={24}
                      //           color="black"
                      //         />
                      //       ),
                      //       onPress: () => {},
                      //     },
                      //   ],
                      //   item.name
                      // );
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 5,
                      backgroundColor: "rgba(234, 228, 228, 0.94)",
                      paddingVertical: 10,
                      paddingHorizontal: 12,
                      height: "100%",
                      flex: 1,
                      marginBottom: 15,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#219241",
                        }}
                      >
                        #{item.cattleID}
                      </Text>{" "}
                      <Text
                        style={{
                          color: "#626068",
                        }}
                      >
                        {"\u2022 "}
                      </Text>
                      {item.title}
                    </Text>

                    <View
                      style={{
                        marginBottom: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        // marginLeft: 10,
                        height: 40,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13.5,
                        }}
                      >
                        {item.message}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 10,
                      }}
                    >
                      <Text>{checkTimeLapse(item.date?.toDate())} Ago</Text>
                      {" - "}
                      <Text
                        style={{
                          color: "#75737F",
                        }}
                      >
                        {format(item.date?.toDate(), "dd/MM/yy")}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                textAlign: "center",
                marginTop: 40,
                fontSize: 18,
                fontWeight: "bold",
                color: "black",
              }}
            >
              No Reports Found
            </Text>
          )
        ) : (
          <View
            style={{
              marginTop: 40,
            }}
          >
            <ActivityIndicator animating={true} color="#525252" size={40} />
          </View>
        )}
      </View>
    </View>
  );
}
