import ReactNative from "react-native";
import React from "react";

export default function Text(props) {
  // const fontName = "Poppins";
  return (
    <ReactNative.Text
      {...props}
      style={{
        ...props.style,
        // fontFamily: `${fontName}${
        //   props.fontWeight ? `-${props.fontWeight}` : ""
        // }`,
      }}
    >
      {props.children}
    </ReactNative.Text>
  );
}
