import React, { createContext, useEffect, useState } from "react";

import { firebaseDB } from "@/utils/ncodia-databases-dev/firebase/initFirebase";
import {
  collection,
  collectionGroup,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { checkAcceptedTimeFrames } from "@/helperFunctions/Time/checkAcceptedTimeFrames";

const MainContext = createContext();

export default function MainProvider(props) {
  const [cattles, setcattles] = useState([]);
  const [maleCattlesNumber, setmaleCattlesNumber] = useState(0);
  const [femaleCattlesNumber, setfemaleCattlesNumber] = useState(0);
  const [notificationRecievers, setnotificationRecievers] = useState([]);
  const [reports, setreports] = useState([]);
  const [stats, setstats] = useState({});
  ////
  const [dataLoaded, setdataLoaded] = useState(false);
  var stats_ = {};

  /////////////
  useEffect(() => {
    const q = query(
      collection(firebaseDB, "cattles"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("eeeeeeeeeeeeeeeeeee", stats_);
      stats_ = {};
      const cattles = [];

      var maleCattlesNumber = 0;
      var femaleCattlesNumber = 0;
      querySnapshot.forEach((doc) => {
        var id = doc.id;
        var cattle = doc.data();
        if (cattle.gender == "male") maleCattlesNumber++;
        if (cattle.gender == "female") femaleCattlesNumber++;
        //////////////// Update Birth Stats
        var acceptedDateOfBirthTimeFramesArray = checkAcceptedTimeFrames(
          cattle.dateOfBirth?.toDate()
        );

        acceptedDateOfBirthTimeFramesArray.map((period_id) => {
          if (!stats_[period_id]) {
            stats_[period_id] = {};
          }
          stats_[period_id]["totalBirths"] =
            (stats_[period_id]["totalBirths"] || 0) + 1;
        });
        ///////////////////
        //////////////// Update Death Stats
        var acceptedDateOfDeathTimeFramesArray = checkAcceptedTimeFrames(
          cattle.dateOfDeath?.toDate()
        );
        acceptedDateOfDeathTimeFramesArray.map((period_id) => {
          if (!stats_[period_id]) {
            stats_[period_id] = {};
          }
          stats_[period_id]["totalDeaths"] =
            (stats_[period_id]["totalDeaths"] || 0) + 1;
        });
        ///////////////////
        //////////////// Update Sold Stats
        var acceptedDateOfSaleTimeFramesArray = checkAcceptedTimeFrames(
          cattle.saleDate?.toDate()
        );
        acceptedDateOfSaleTimeFramesArray.map((period_id) => {
          if (!stats_[period_id]) {
            stats_[period_id] = {};
          }
          stats_[period_id]["totalSold"] =
            (stats_[period_id]["totalSold"] || 0) + 1;
          stats_[period_id]["totalSoldAmount"] =
            (stats_[period_id]["totalSoldAmount"] || 0) +
            Number(cattle.salePrice);
        });
        ///////////////////
        //////////////// Update Purchased Stats
        var acceptedDateOfPurchaseTimeFramesArray = checkAcceptedTimeFrames(
          cattle.purchaseDate?.toDate()
        );
        acceptedDateOfPurchaseTimeFramesArray.map((period_id) => {
          if (!stats_[period_id]) {
            stats_[period_id] = {};
          }
          stats_[period_id]["totalPurchased"] =
            (stats_[period_id]["totalPurchased"] || 0) + 1;
          stats_[period_id]["totalPurchasedAmount"] =
            (stats_[period_id]["totalPurchasedAmount"] || 0) +
            Number(cattle.purchasePrice);
        });
        ///////////////////
        cattles.push({
          id,
          ...cattle,
        });
      });

      setstats(stats_);
      setcattles(cattles);
      setmaleCattlesNumber(maleCattlesNumber);
      setfemaleCattlesNumber(femaleCattlesNumber);
      setdataLoaded(true);
    });
    const notificationsQuery = query(
      collection(firebaseDB, "notificationsRecievers")
    );

    /////////////////// /

    const commentsGroup = collectionGroup(firebaseDB, "reports");
    const reportsQuery = query(commentsGroup, orderBy("createdAt", "desc"));

    const reportsUnsubscribe = onSnapshot(reportsQuery, (querySnapshot) => {
      console.log("kkkkkkkkkkkkkkkkkkkkk", stats_);

      const reports_ = [];
      querySnapshot.forEach((doc) => {
        var id_ = doc.id;
        var report_ = doc.data();
        /////////////////// Stats

        var updateStats = (reportName) => {
          ////
          var acceptedTimeFramesArray = checkAcceptedTimeFrames(
            report_.date?.toDate()
          );
          acceptedTimeFramesArray.map((period_id) => {
            if (!stats_[period_id]) {
              stats_[period_id] = {};
            }
            stats_[period_id][reportName] =
              (stats_[period_id][reportName] || 0) + 1;
          });
        };
        if (report_.type == "vaccination") updateStats("totalVaccinations");
        if (report_.type == "treatment") updateStats("totalTreatments");
        if (report_.type == "illness") updateStats("totalIllnesses");
        if (report_.type == "injury") updateStats("totalInjuries");
        if (report_.type == "other") updateStats("totalOtherReports");
        ///////////////////
        reports_.push({
          id: id_,
          ...report_,
        });
      });
      setstats(stats_);

      setreports(reports_);
    });
    //////////////////// /
    const notificationsRecieversUnsubscribe = onSnapshot(
      notificationsQuery,
      (querySnapshot) => {
        const notificationRecievers = [];
        querySnapshot.forEach((doc) => {
          var id = doc.id;
          // var notificationReciever = doc.data();
          notificationRecievers.push(id);
        });
        setnotificationRecievers(notificationRecievers);
      }
    );
    /////////////////////

    return () => {
      unsubscribe();
      notificationsRecieversUnsubscribe();
      reportsUnsubscribe();
    };
  }, []);

  ///////////////////////////////////////////
  const reportTypes = [
    {
      id: "vaccination",
      name: "Vaccination",
      color: "#164843",
      dataID: "totalVaccinations",
    },
    {
      id: "treatment",
      name: "Treatment",
      color: "#879673",
      dataID: "totalTreatments",
    },
    {
      id: "illness",
      name: "Illness",
      color: "#FFCD29",
      dataID: "totalIllnesses",
    },
    {
      id: "injury",
      name: "Injury",
      color: "#F97E72",
      dataID: "totalInjuries",
    },
    {
      id: "births",
      name: "Births",
      color: "rgb(8, 165, 66)",
      dataID: "totalBirths",
    },
    {
      id: "deaths",
      name: "Deaths",
      color: "#F00",
      dataID: "totalDeaths",
    },
    {
      id: "purchased",
      name: "Purchased",
      color: "#419BD2",
      dataID: "totalPurchased",
    },
    {
      id: "sale",
      name: "Sold",
      color: "#2F2441",
      dataID: "totalSold",
    },

    {
      id: "other",
      name: "Other",
      color: "#6A2F4D",
      dataID: "totalOtherReports",
    },
  ];

  ////////////////////////////////////////////////

  // ///////////////
  // const getAccountColor = (accountName) => {
  //   var account = bankAccounts.find((item) => {
  //     return item.idName == accountName;
  //   });
  //   if (account) {
  //     console.log("account", account);
  //     return account.textColor;
  //   }
  //   return "rgba(131, 167, 234, 1)";
  // };
  // const getAccountTextColor = (idName) => {
  //   if (idName == "allan") return "#0088DC";
  //   if (idName == "arnold") return "#0FB703";
  //   if (idName == "ashley") return "#8E6137";
  //   if (idName == "dad") return "#581E83";
  //   if (idName == "mum") return "#F60000";
  //   if (idName == "shamiso") return "";
  //   return "#F0F2F5";
  // };
  return (
    <MainContext.Provider
      value={{
        cattles,
        maleCattlesNumber,
        femaleCattlesNumber,
        reportTypes,
        ///
        notificationRecievers,
        reports,
        stats,
        ///
        dataLoaded,
        setdataLoaded,
        //
        // getAccountColor,
        // getAccountTextColor,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
export { MainContext, MainProvider };
