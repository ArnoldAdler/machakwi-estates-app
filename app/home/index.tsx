import ScreenHeading from "@/components/ScreenHeading";
import { MainContext } from "@/contexts/MainContext";
import BasicStats from "@/screens/Home/BasicStats";
import FinancialStats from "@/screens/Home/FinancialStats";
import HerdOverview from "@/screens/Home/HerdOverview";
import ReportsPieChart from "@/screens/Home/ReportsPieChart";
import { useContext } from "react";
import { ScrollView } from "react-native";

/////////////////////////

export default function Home() {
  const { stats } = useContext(MainContext);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      style={{ flex: 1, paddingHorizontal: 30 }}
    >
      {/* <Button
        title="BTN"
        onPress={() => {
          console.log("bbbbbbbbbbbb", stats);
        }}
      ></Button> */}
      <ScreenHeading title="Herd Overview" />
      <HerdOverview />
      <ScreenHeading title="Herd Management" />
      <BasicStats />

      <FinancialStats />
      <ScreenHeading title="Reports Overview" />
      <ReportsPieChart />
    </ScrollView>
  );
}
