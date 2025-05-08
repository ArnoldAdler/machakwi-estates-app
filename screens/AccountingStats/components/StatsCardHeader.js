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
                      name: "This Month",
                      value: "this_month",
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
                      name: "Today",
                      value: "last_3_months",
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
                      value: "this_year",
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
                      value: "last_year",
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
