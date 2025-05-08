import AppLoadingIndicator from "@/components/AppLoadingIndicator";
import LoaingIndicator from "@/components/LoaingIndicator";
import TMPMenuModal from "@/components/TMPMenuModal";
import TMPModal from "@/components/TMPModal";
import { MainProvider } from "@/contexts/MainContext";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

// import { Host } from "react-native-portalize";
// import LoaingIndicator from "Components/LoaingIndicator";
// import { ModalPortal } from "react-native-modals";
import StatsContextProvider from "@/contexts/StatsContext";
export default function AppWrapper({ children }) {
  /////////////////////////////////////////////
  /////////////////////
  const [appIsReady, setappIsReady] = useState(false);
  async function prepare() {
    try {
      await SplashScreen.preventAutoHideAsync();
      // await Font.loadAsync({
      //   Poppins: require("Assets/fonts/Poppins-Regular.ttf"),
      //   "Poppins-100": require("Assets/fonts/Poppins-Thin.ttf"),
      //   "Poppins-200": require("Assets/fonts/Poppins-ExtraLight.ttf"),
      //   "Poppins-300": require("Assets/fonts/Poppins-Light.ttf"),
      //   "Poppins-400": require("Assets/fonts/Poppins-Regular.ttf"),
      //   "Poppins-500": require("Assets/fonts/Poppins-Medium.ttf"),
      //   "Poppins-600": require("Assets/fonts/Poppins-SemiBold.ttf"),
      //   "Poppins-700": require("Assets/fonts/Poppins-Bold.ttf"),
      //   "Poppins-800": require("Assets/fonts/Poppins-ExtraBold.ttf"),
      //   "Poppins-900": require("Assets/fonts/Poppins-Black.ttf"),
      // });
    } catch (e) {
      console.warn(e);
    } finally {
      setappIsReady(true);
    }
  }

  /////////////////////////////////////////
  /////////////////////////////////////////
  //////////////////************************ */
  useEffect(() => {
    prepare();
    return () => {};
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }
  ////////// /******************************* */
  return (
    // <Host>
    <MainProvider>
      <StatsContextProvider>
        <View
          onLayout={onLayoutRootView}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#F0F2F5",

            // paddingHorizontal: 30,
            // paddingVertical: 20,
          }}
        >
          {children}
          {/* <LoaingIndicator /> */}
          {/* <ModalPortal /> */}
        </View>
        <AppLoadingIndicator />
        <LoaingIndicator />
        <TMPMenuModal />
        <TMPModal />
      </StatsContextProvider>
    </MainProvider>
    // </Host>
  );
}
