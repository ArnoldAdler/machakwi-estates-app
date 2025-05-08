import React, { useContext } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

export default function QuickViewCard({ data }) {
  ///////////////////////
  if (!data) data = [];

  //////////////////////////////////
  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ paddingTop: 5 }}>
      <View>
        <View style={{}}>
          {data.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={item.onClick}
                key={i.toString()}
                style={{
                  height: 40,
                  backgroundColor: "#F0F2F5",

                  width: width - 80,
                  flex: 1,
                  alignItems: "center",
                  marginRight: 30,
                  marginBottom: 7,
                  borderRadius: 5,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 16,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    paddingRight: 15,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: 16,
                    }}
                  >
                    {item.value}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
