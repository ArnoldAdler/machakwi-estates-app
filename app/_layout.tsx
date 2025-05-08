import AppWrapper from "@/components/AppWrapper";
import { firebaseConfig, mode } from "@/config";
import { useColorScheme } from "@/hooks/useColorScheme";
import { initFirebase } from "@/utils/ncodia-databases-dev/firebase/initFirebase";
import * as Device from "expo-device";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Host } from "react-native-portalize";
import "react-native-reanimated";

/////////////////
////////
initFirebase(firebaseConfig, "machakwi-estates-app", {
  // dbPrefix: "developers.database",
  mode: mode,
});
// ///////////
// initSupabase(supabaseConfig, local_data_store, {
//   // mode: mode,
// });

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  ////////////////////
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-200": require("@/assets/fonts/Poppins-ExtraLight.ttf"),
  });
  /////////// ///
  useEffect(() => {
    var data = {
      brand: Device.brand,
      model: Device.modelName,
      osName: Device.osName,
      osVersion: Device.osVersion,
      isDevice: Device.isDevice, // true if running on a real device
      isEmulator: !Device.isDevice, // true if running in a simulator or emulator
      deviceType: Device.deviceType, // UNKNOWN, PHONE, TABLET, TV, DESKTOP
      totalMemory: Device.totalMemory, // Total device memory in bytes
      deviceName: Device.deviceName, // User-friendly device name (may be null or generic on iOS 16+)
    };
    // registerPushNotifications(
    //   (v: any) => {
    //     db.add(
    //       `notificationsRecievers.${v}`,
    //       data,
    //       (v: any) => {},
    //       (e: any) => {
    //         db.update(
    //           `notificationsRecievers.${v}`,
    //           data,
    //           (v: any) => {},
    //           (e: any) => {}
    //         );
    //       }
    //     );
    //   },
    //   (e: any) => {
    //     console.log("Push notification error", e);
    //   }
    // );

    return () => {};
  }, []);

  //////////////
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  /////////

  return (
    <GestureHandlerRootView>
      {/* <DatabaseProvider client={local_data_store}> */}
      <Host>
        <AppWrapper>
          {/* <AppHeader /> */}
          {/* <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme n: DefaultTheme}
              > */}
          <>
            <Stack>
              <Stack.Screen
                name="home"
                options={{
                  headerShown: false,
                  headerTitle: "Machakwi Estates",
                }}
              />
              <Stack.Screen
                name="index"
                options={{
                  headerTitle: "Login Starts",
                }}
              />

              <Stack.Screen
                name="cattle_form"
                options={{
                  headerTitle: "Add Cattle",
                }}
              />
              <Stack.Screen
                name="report_form"
                options={{
                  headerTitle: "New Report",
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </>
          {/* </ThemeProvider> */}
        </AppWrapper>
      </Host>
      {/* </DatabaseProvider> */}
    </GestureHandlerRootView>
  );
}
