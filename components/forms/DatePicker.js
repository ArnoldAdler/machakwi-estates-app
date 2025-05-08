import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { text_color_primary } from "@/config/theme";
import TMPTextInput from "./TextInput";
const DatePicker = ({
  placeholder,
  leftIcon,
  value,
  onChange,
  disabled,
  type,
  label,
}) => {
  const [showDatePicker, setshowDatePicker] = useState(false);
  const color = disabled ? "grey" : text_color_primary;
  const onChangeLocal = (event, selectedDate) => {
    setshowDatePicker(false);
    const currentDate = selectedDate || value;
    if (onChange) onChange(currentDate);
  };
  return (
    <TouchableOpacity disabled={type == "view" ? true : false} style={{}}>
      <TMPTextInput
        type={type}
        disabled={disabled}
        label={label || "Date"}
        onFocus={() => {
          setshowDatePicker(true);
        }}
        onChangeText={() => {
          return;
        }}
        value={value}
        inputType="date"
      />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeLocal}
        />
      )}
    </TouchableOpacity>
  );
};

export default DatePicker;
