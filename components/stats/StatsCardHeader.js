import { StatsContext } from "@/contexts/StatsContext";
import { openMenuModal } from "@/plugins/modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function StatsCardHeader({ title, noHeader }) {
  const { statsPeriod, setstatsPeriod } = useContext(StatsContext);
  return (
    <View
      style={{
        marginBottom: 5,
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#BFC5C9",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 15, width: 180 }}>
        {title ? title : "Basic Stats"}
      </Text>
      {noHeader ? null : (
        <TouchableOpacity
          onPress={() => {
            openMenuModal(
              [
                {
                  title: "Today",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Today",
                      id: "today",
                      name: "Today",
                      value: "today",
                    });
                  },
                },
                {
                  title: "Yesterday",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Yesterday",
                      id: "yesterday",
                      name: "Yesterday",
                      value: "yesterday",
                    });
                  },
                },
                {
                  title: "This Week",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "This Week",
                      id: "this_week",
                      name: "This Week",
                      value: "this_week",
                    });
                  },
                },
                {
                  title: "Last Week",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Last Week",
                      id: "last_week",
                      name: "Last Week",
                      value: "last_week",
                    });
                  },
                },
                {
                  title: "This Month",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "This Month",
                      id: "this_month",
                      name: "This Month",
                      value: "this_month",
                    });
                  },
                },
                {
                  title: "This Year",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "This Year",
                      name: "This Year",
                      id: "this_year",
                      value: "this_year",
                    });
                  },
                },
                {
                  title: "Last Month",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Last Month",
                      id: "last_month",
                      name: "Last Month",
                      value: "last_month",
                    });
                  },
                },
                {
                  title: "Last 3 Month's",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Last 3 Months",
                      id: "last_3_months",
                      name: "Today",
                      value: "last_3_months",
                    });
                  },
                },

                {
                  title: "Last Year",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Last Year",
                      name: "Last Year",
                      id: "last_year",
                      value: "last_year",
                    });
                  },
                },
                {
                  title: "Last 5 Year's",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Last 5 Years",
                      name: "Last 5 Years",
                      id: "last_5_years",
                      value: "last_5_years",
                    });
                  },
                },
                {
                  title: "Last 10 Year's",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Last 10 Years",
                      name: "Last 10 Years",
                      id: "last_10_years",
                      value: "last_10_years",
                    });
                  },
                },
                {
                  title: "Last 30 Year's",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "Last 30 Years",
                      name: "Last 30 Years",
                      id: "last_30_years",
                      value: "last_30_years",
                    });
                  },
                },
                {
                  title: "All Time",
                  icon: (
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={24}
                      color="black"
                    />
                  ),
                  onPress: () => {
                    setstatsPeriod({
                      title: "All Time",
                      name: "All Time",
                      id: "all_time",
                      value: "all_time",
                    });
                  },
                },
              ],
              "Select Stats Period"
            );
          }}
          style={{
            marginRight: 10,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: "#0B79FC",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            {statsPeriod.title}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
