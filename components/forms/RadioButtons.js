import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { primary_color } from "@/config/theme";

export default function RadioButtons({ options, onChange, label }) {
  const button_size = 25;
  const [active, setactive] = useState(0);
  const [optionsLocal, setoptionsLocal] = useState([
    { label: "Option 1" },
    { label: "Option 2" },
  ]);
  useEffect(() => {
    if (options) setoptionsLocal(options);
    return () => {};
  }, []);
  return (
    <View style={{ marginVertical: 0 }}>
      {label && (
        <Text style={{ marginBottom: 7, fontSize: 15, fontWeight: "bold" }}>
          {label}
        </Text>
      )}
      <View style={{ flexDirection: "row" }}>
        {optionsLocal.map((item, i) => {
          return (
            <View
              key={i.toString()}
              style={{
                flexDirection: "row",
                height: button_size,
                marginRight: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setactive(i);
                  onChange(item);
                }}
                style={{
                  height: button_size,
                  width: button_size,
                  borderWidth: 2.5,
                  borderRadius: button_size,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 4,
                  borderColor: primary_color,
                }}
              >
                {active == i ? (
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      backgroundColor: primary_color,

                      borderRadius: button_size,
                    }}
                  ></View>
                ) : null}
              </TouchableOpacity>
              <View style={{ height: "100%", justifyContent: "center" }}>
                <Text
                  style={{ marginLeft: 5, fontSize: 18, fontWeight: "500" }}
                >
                  {item.label || item.name}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
