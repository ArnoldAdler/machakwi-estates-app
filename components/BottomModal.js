import { Ionicons } from "@expo/vector-icons";
import H2 from "@/components/typography/H2";
import React, { useRef, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
//////////
import {
  BottomModal as BModal,
  ModalContent,
  ModalPortal,
  SlideAnimation,
} from "react-native-modals";
////////
export default function BottomModal({ component, id, title }) {
  const modal_ref = useRef(null);
  //////
  const [visible, setvisible] = useState(true);

  return (
    <BModal
      modalAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      swipeDirection={["up", "down"]}
      modalTitle={
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(0,0,0,0.1)",
            marginBottom: 20,
            padding: 20,
            paddingBottom: 15,
          }}
        >
          <H2>{title ? title : "Title"}</H2>
          <TouchableOpacity
            onPress={() => {
              setvisible(false);
              ModalPortal.dismiss(id);
            }}
            style={{}}
          >
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      }
      swipeThreshold={130} // default 100
      onSwipeOut={(event) => {
        setvisible(false);
        ModalPortal.dismiss(id);
      }}
      visible={visible}
      onTouchOutside={() => {
        setvisible(false);
        ModalPortal.dismiss(id);
      }}
      height={0.94}
      width={1}
      containerStyle={{}}
    >
      <ModalContent>
        <ScrollView nestedScrollEnabled>
          <View
            style={{
              marginBottom: 130,
            }}
          >
            {component && component}
          </View>
        </ScrollView>
      </ModalContent>
    </BModal>
  );
}
