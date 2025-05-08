import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// import { MainContext } from "@/context/MainContext";
// import TransactionCard from "../../Home/components/AccountingStats/components/RecentTransactions/components/TransactionCard";

import cow from "@/assets/images/cow_grey.png";
import { MainContext } from "@/contexts/MainContext";

import { stopLoadingIndicator } from "@/plugins/loadingIndicator";
import { openModal } from "@/plugins/modal";
import { firebaseDB } from "@/utils/ncodia-databases-dev/firebase/initFirebase";
import { format, isSameDay, isToday, isYesterday } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { FlatList } from "react-native";
import { getColor } from "../../components/CattleCard";
import QuickCattleViewModal from "../../components/CattleCard/QuickCattleViewModal";
import { checkTimeLapse } from "../../helperFunctions/Time/checkTimeLapse";

export default function Reports() {
  //////////////////////////
  const { reports } = useContext(MainContext);
  //////////////////////////

  /////////////
  const { width, height } = Dimensions.get("window");

  ///////////////////

  // db.get(
  //   "expenses",
  //   (v) => {
  //     setexpenses(v);
  //     setexpensesLocal(v);
  //   },
  //   undefined,
  //   {
  //     limit: 100,
  //     addKeys: {
  //       type: "expense",
  //     },
  //   }
  // );
  ///////////////////
  // const expensesFlatList_ref = useRef();

  // const searchText = (e) => {
  //   try {
  //     let text = e.toLowerCase();
  //     let reports = expenses;
  //     let filteredName = reports.filter((item) => {
  //       return item.clientName.toLowerCase().match(text);
  //     });
  //     if (!text || text === "") {
  //       setexpensesLocal(expenses);
  //     } else if (!Array.isArray(filteredName) && !filteredName.length) {
  //       // set no reports flag to true so as to render flatlist conditionally
  //       // setnoreportsFlag(true);
  //     } else if (Array.isArray(filteredName)) {
  //       setexpensesLocal(filteredName);
  //     }
  //     try {
  //       expensesFlatList_ref.current.scrollToOffset({
  //         animated: true,
  //         offset: 0,
  //       });
  //     } catch (error) {}
  //   } catch (error) {}
  // };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        // ref={expensesFlatList_ref}
        data={reports}
        renderItem={({ item, index }) => {
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
              style={{
                paddingHorizontal: 25,
              }}
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
                disabled={true}
                onPress={() => {
                  // startLoadingIndicator("");
                  const cattleRef = doc(firebaseDB, "cattles", item.cattleID);
                  getDoc(cattleRef)
                    .then((doc) => {
                      if (doc.exists()) {
                        const cattleData = doc.data();
                        openModal(
                          <QuickCattleViewModal cattle={cattleData} />,
                          <View
                            style={{
                              // backgroundColor: "#F0F2F5",
                              flex: 1,
                              alignItems: "center",
                              borderRadius: 5,
                              flexDirection: "row",
                            }}
                          >
                            {/* ICoN START */}
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
                                  tintColor: getColor(cattleData),
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
                                  {cattleData.id}{" "}
                                  {cattleData.earTagNumber &&
                                  cattleData.earTagNumber != cattleData.id
                                    ? `(Ear Tag No.  ${cattleData.earTagNumber})`
                                    : ""}
                                  {cattleData.isSold ? " (Sold)" : ""}
                                  {cattleData.isDead ? " (Dead)" : ""}
                                </Text>
                              </Text>
                            </View>
                          </View>
                        );
                        stopLoadingIndicator();
                      } else {
                        console.log("No such document!");
                        Alert.alert(
                          "Error",
                          `Cattle ${item.cattleID} not found`
                        );
                        stopLoadingIndicator();
                      }
                    })
                    .catch((error) => {
                      console.log("Error getting document:", error);
                      Alert.alert(
                        "Error",
                        `Can't fetch document with firestore`
                      );
                      stopLoadingIndicator();
                    });
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 5,
                  backgroundColor: "#FEFFFF",
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
        }}
        keyExtractor={(item, index) => index.toString()}
        // showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 22,
          paddingBottom: 300,
        }}
      ></FlatList>
    </View>
  );
}
