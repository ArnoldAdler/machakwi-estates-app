import React, { useContext } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

import Card from "@/components/Card";
// import { db } from "@/utils/ncodia-databases-dev";
import StatsCardHeader from "@/components/stats/StatsCardHeader";
import { MainContext } from "@/contexts/MainContext";
import { StatsContext } from "@/contexts/StatsContext";
import {
  isSameDay,
  isSameISOWeek,
  isSameMonth,
  isSameYear,
  sub,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";

export const isSamePeriodTransaction = (periodIdName, transaction, date) => {
  if (periodIdName == "today" && isSameDay(new Date(), date))
    return transaction;
  if (periodIdName == "yesterday" && isSameDay(subDays(new Date(), 1), date))
    return transaction;
  if (periodIdName == "this_week" && isSameISOWeek(new Date(), date))
    return transaction;
  if (
    periodIdName == "last_week" &&
    isSameISOWeek(subWeeks(new Date(), 1), date)
  )
    return transaction;
  if (periodIdName == "this_month" && isSameMonth(new Date(), date))
    return transaction;
  if (
    periodIdName == "last_month" &&
    isSameMonth(subMonths(new Date(), 1), date)
  )
    return transaction;
  ///
  ///////////////////////

  var last3monthsDate = sub(new Date(), { months: 3 });

  if (periodIdName == "last_3_months" && last3monthsDate <= date)
    return transaction;
  if (periodIdName == "this_year" && isSameYear(new Date(), date))
    return transaction;
  if (periodIdName == "last_year" && isSameYear(subYears(new Date(), 1), date))
    return transaction;

  return false;
};

export default function BasicStats({ navigation }) {
  const { width, height } = Dimensions.get("window");
  //////
  const { stats } = useContext(MainContext);
  const { statsPeriod } = useContext(StatsContext);
  var periodIdName = statsPeriod.value;
  ////////////
  /////////////
  var getTotal = (statName) => {
    if (stats[periodIdName] && stats[periodIdName][statName])
      return stats[periodIdName][statName];
    else return 0;
  };
  return (
    <Card>
      <StatsCardHeader title={"Basic Stats"} />
      <View style={{ paddingTop: 5 }}>
        <View>
          <View style={{}}>
            {[
              // { name: "Total Invoices", value: totalIncome, color: "#23AAF2" },
              {
                name: "Total Births",
                value: getTotal("totalBirths"),
                // onClick: () => {
                // },
                // color: "#23AAF2",
                color: "#33AD7A",
              },
              {
                name: "Total Deaths",
                value: getTotal("totalDeaths"),
                // onClick: () => {
                // },
                color: "#F44336",
              },
              // {
              //   name: "Total Reports",
              //   value: 9,
              //   // onClick: () => {
              //   // },
              //   color: "#33AD7A",
              // },
            ].map((item, i) => {
              return (
                <TouchableOpacity
                  // onPress={item.onClick}
                  key={i.toString()}
                  style={{
                    height: 40,
                    backgroundColor: "#F0F2F5",
                    width: width - 80,
                    alignItems: "center",
                    marginRight: 30,
                    marginBottom: 7,
                    borderRadius: 5,
                    flexDirection: "row",
                    paddingHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "black",
                        color: item.color,

                        fontSize: 16,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingRight: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: item.color,

                        fontSize: 16,
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Card>
  );
}
