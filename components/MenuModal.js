import { Ionicons } from "@expo/vector-icons";
import H2 from "@/components/typography/H2";
import React, { useRef, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { disabled_color } from "theme/colors";
//////////
import {
  BottomModal,
  ModalContent,
  ModalPortal,
  SlideAnimation,
} from "react-native-modals";
////////
var disabled_color = "grey";
///
export default function MenuModal({ menu, id, title }) {
  const modal_ref = useRef(null);
  //////
  const [visible, setvisible] = useState(true);
  const getModalHeight = () => {
    if (menu.length > 3) {
      var height = 0.15 * menu.length + 0.5;
      if (height > 0.9) return 0.9;
      return height;
    } else {
      return 0.5;
    }
  };
  return (
    <BottomModal
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
      height={getModalHeight()}
      width={1}
      containerStyle={{}}
    >
      <ModalContent>
        <ScrollView>
          <View
            style={{
              paddingHorizontal: 10,
              marginBottom: 30,
              paddingTop: 10,
            }}
          >
            {menu
              ? menu.map((item, i) => {
                  const button_size = 50;
                  return (
                    <TouchableOpacity
                      disabled={item.disabled}
                      onPress={() => {
                        setvisible(false);
                        ModalPortal.dismiss(id);
                        if (item.onPress) item.onPress();
                      }}
                      key={i.toString()}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 30,
                      }}
                    >
                      <View
                        style={{
                          marginRight: 15,
                          height: button_size,
                          width: button_size,
                          borderRadius: 5,

                          backgroundColor: "#EDEBEB",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </View>

                      <Text
                        style={{
                          fontSize: 18,
                          // fontFamily: "Poppins",
                          color: item.disabled
                            ? disabled_color
                            : item.titleColor
                            ? item.titleColor
                            : "black",
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        </ScrollView>
      </ModalContent>
    </BottomModal>
    //   <Portal>
    //     <View adjustToContentHeight ref={modal_ref}>

    //     </View>
    //   </Portal>
  );
}
