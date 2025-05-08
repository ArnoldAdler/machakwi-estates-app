import React from "react";
import { FlatList, View, Text } from "react-native";
export default function Table({ columns, data }) {
  const border_color = "#565656";
  const border_width = 0.3;
  var hasError = false;
  return (
    <View>
      <View
        style={{
          width: "100%",
          backgroundColor: "#007ACC",
          display: "flex",
          flexDirection: "row",
          borderWidth: border_width,
          borderColor: border_color,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      >
        {columns.map((column, i) => {
          return (
            <View
              style={{
                width: column.width,
                padding: 4.9,
                flex: 1,
                minWidth: column.width,
                borderRightWidth: border_width,
                borderColor: "rgba(255,255,255, 0.5)",
                textAlign: column.textAlign,
              }}
              key={i.toString()}
            >
              <Text fontWeight={600} style={{ fontSize: 9, color: "white" }}>
                {column.Header}
              </Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          width: "100%",
          backgroundColor: "#F4F8F9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FlatList
          contentContainerStyle={
            {
              // paddingBottom: 80,
            }
          }
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottomWidth:
                    index != data.length - 1 ? border_width : 0,
                  borderColor: "#C1C1C1",
                }}
                key={index.toString()}
              >
                {columns.map((column, i) => {
                  //***************************Meant to avoid errors for accessing objects, buy code does not work because dates come as objects too */
                  // if (hasError)
                  //   return <Text key={i.toString()}>'Table Has Error'</Text>;

                  // if (typeof dataItem[column.accessor] == "object") {
                  //   alert(
                  //     `ERROR IN TABLE: Supplied a object as a accessor for "${column.Header}". Please use a string as accessor.`
                  //   );
                  //   hasError = true;
                  // }

                  var value = () => {
                    if (column.Cell) {
                      return column.Cell(
                        {
                          value: item[column.accessor],
                          data: item,
                          cell: { row: { original: item } },
                        },
                        index
                      );
                    }
                    return item[column.accessor];
                  };

                  return (
                    <View
                      style={{
                        flex: 1,
                        minWidth: column.width,
                        padding: 5,
                        borderRightWidth: border_width,
                        borderColor: border_color,
                        height: 30,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                      key={i.toString()}
                    >
                      <Text
                        style={{
                          fontSize: column.fontSize ? column.fontSize : 10,
                          textAlign: column.textAlign,
                        }}
                      >
                        {value()}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
      </View>

      {/* <View
              style={{
                flexDirection: "row",in will you will you and you and you
              }}
            >
         
            </View> */}
    </View>
  );
}
