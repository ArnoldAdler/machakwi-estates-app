import TMPFab from "@/components/TMPFab";
import { openMenuModal } from "@/plugins/modal";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  const router = useRouter();

  return (
    <>
      <TMPFab
        onPress={() => {
          openMenuModal(
            [
              {
                title: "Cattle",
                icon: (
                  <MaterialCommunityIcons name="cow" size={24} color="black" />
                ),
                onPress: () => {
                  router.push("/cattle_form");
                },
              },
              {
                title: "Report",
                icon: <AntDesign name="addfile" size={24} color="black" />,
                onPress: () => {
                  router.push("/report_form");
                },
              },
            ],
            "Add New"
          );
        }}
      />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 60,
            paddingTop: 7,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            headerTitle: "Machakwi Estates",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="cattle"
          options={{
            tabBarLabel: "Cattle",
            headerTitle: "All Cattle",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cow" size={size} color={color} />
            ),

            // headerShown: true,
          }}
        />
        <Tabs.Screen
          name="reports"
          options={{
            tabBarLabel: "Reports",
            headerTitle: "All Reports",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="notifications-outline"
                size={size}
                color={color}
              />
            ),
            // headerShown: true,
          }}
        />
      </Tabs>
    </>
  );
}
