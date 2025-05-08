import Card from "@/components/Card";
import StatsCardHeader from "@/components/stats/StatsCardHeader";
import { MainContext } from "@/contexts/MainContext";
import { StatsContext } from "@/contexts/StatsContext";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function ReportsPieChart({ periodIdName }) {
  const { reportTypes, expenses, stats } = useContext(MainContext);
  const { statsPeriod } = useContext(StatsContext);
  var periodIdName = statsPeriod.value;
  ////////////
  /////////////
  var getTotal = (statName) => {
    if (stats[periodIdName] && stats[periodIdName][statName])
      return stats[periodIdName][statName];
    else return 0;
  };

  const { width, height } = Dimensions.get("window");

  const [dataLocal, setdataLocal] = useState([]);

  useEffect(() => {
    var data = reportTypes
      .filter((category) => {
        var total = getTotal(category.dataID);
        if (total) return true;
        else return false;
      })
      .map((category, i) => {
        if (category.dataID)
          return {
            ...category,
            name: `${category.name}`,
            amount: getTotal(category.dataID),
          };
      });
    setdataLocal(data);
    return () => {};
  }, [periodIdName, stats]);
  return (
    <Card>
      <StatsCardHeader title={"Reports Submitted"} />
      <View style={{ overflow: "hidden" }}>
        <PieChart
          data={dataLocal}
          width={width - 80}
          height={200}
          hasLegend={false}
          chartConfig={{
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          accessor="amount"
          backgroundColor="transparent"
          center={[70, 0]}
        />
        <View style={{ paddingRight: 10, paddingTop: 10 }}>
          {dataLocal.map((item, i) => {
            const dot_size = 15;
            const font_color = "#7F7F7F";
            const getPercentage = () => {
              var amount = 0;
              dataLocal.map((item, i) => {
                amount = amount + item.amount;
              });

              var percentage = (item.amount / amount) * 100;

              return `${percentage.toFixed()}%`;
            };
            return (
              <TouchableOpacity
                onPress={() => {}}
                key={i.toString()}
                style={{
                  flexDirection: "row",
                  marginBottom: 8,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    height: dot_size,
                    width: dot_size,
                    borderRadius: dot_size,
                    backgroundColor: item.color,
                  }}
                ></TouchableOpacity>
                <Text style={{ width: 35, color: font_color }}>
                  {getPercentage()}
                </Text>

                <View
                  style={{
                    flex: 1,
                    color: font_color,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ marginRight: 5 }}>{item.name}</Text>
                  {/* <View
                  style={{
                    marginRight: 5,
                    borderRadius: 2,
                    paddingVertical: 2,
                    paddingHorizontal: 5,
                    // backgroundColor: graphShowInvoices ? "#0B79FC" : "#525252",
                    backgroundColor: "#38394D",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 6,
                    }}
                  >
                    View
                  </Text>
                </View> */}
                </View>

                <Text style={{ fontWeight: "bold", color: font_color }}>
                  {item.amount}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Card>
  );
}
