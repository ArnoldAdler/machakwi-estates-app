// import AudioPicker from "@/components/forms/AudioPicker";
import Button from "@/components/forms/Button";
import DatePicker from "@/components/forms/DatePicker";
import DropDownPicker from "@/components/forms/DropDownPicker";
import ImagePicker from "@/components/forms/ImagePicker";
import InputSearch from "@/components/forms/InputSearch";
import Slider from "@/components/forms/Slider";
import Switch from "@/components/forms/Switch";
import TextField from "@/components/forms/TextField";
import TextInput from "@/components/forms/TextInput";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function FormFields({
  data,
  fireUploadFuction,
  formType,
  style,
  onSave,
}) {
  const getComponent = (item, i) => {
    var componentName = item.component;

    if (componentName == "audio_picker") {
      return (
        <Text>Wire Comp</Text>
        // <AudioPicker
        //   value={item.value}
        //   type={item.type || formType}
        //   storagePath={item.storagePath}
        //   storageName={item.storageName}
        //   fireUploadFuction={fireUploadFuction}
        //   disabled={item.disabled}
        //   label={item.name}
        //   onChange={item.onChange}
        // />
      );
    }
    if (componentName == "image_picker") {
      return (
        <ImagePicker
          value={item.value}
          type={item.type || formType}
          storagePath={item.storagePath}
          storageName={item.storageName}
          fireUploadFuction={fireUploadFuction}
          disabled={item.disabled}
          label={item.name}
          onChange={item.onChange}
          aspectRatio={item.aspectRatio}
          compress={item.compress}
        />
      );
    }
    if (componentName == "switch") {
      return (
        <Switch
          type={item.type || formType}
          value={item.value}
          disabled={item.disabled}
          label={item.name}
          trueText="Yes"
          falseText={"No"}
          onChange={item.onChange}
        />
      );
    }
    if (componentName == "date_picker") {
      return (
        <DatePicker
          type={item.type || formType}
          disabled={item.disabled}
          label={item.name}
          value={item.value}
          onChange={item.onChange}
        />
      );
    }
    if (componentName == "drop_down_picker") {
      return (
        <DropDownPicker
          value={item.value}
          type={item.type || formType}
          key={i.toString()}
          disabled={item.disabled}
          size={15}
          label={item.name}
          onChange={item.onChange}
          data={item.data}
        />
      );
    }
    if (componentName == "input_field") {
      return (
        <TextField
          type={item.type || formType}
          disabled={item.disabled}
          placeholder={item.placeholder ? item.placeholder : item.name}
          leftIcon={item.icon}
          value={item.value}
          label={item.name}
          onChangeText={item.onChange}
          keyboardType={item.keyboardType}
        />
      );
    }
    if (componentName == "slider") {
      return (
        <Slider
          type={item.type || formType}
          disabled={item.disabled}
          placeholder={item.name}
          value={item.value}
          label={item.name}
          onChange={item.onChange}
        />
      );
    }
    if (componentName == "input_search") {
      return (
        <InputSearch
          emptyValueText={item.emptyValueText}
          data={item.data || []}
          onFocus={item.onFocus}
          type={item.type || formType}
          onChange={item.onChange}
          disabled={item.disabled}
          placeholder={item.name}
          leftIcon={item.icon}
          value={item.value}
          label={item.name}
          onChangeText={item.onChange}
          onBlur={item.onBlur}
          icon={item.icon}
          keyboardType={item.keyboardType}
        />
      );
    }
    if (item.component) {
      return (
        <View style={{}} key={i.toString()}>
          {typeof item.component == "string" ? (
            <Text>{item.component}</Text>
          ) : (
            item.component
          )}
        </View>
      );
    }
    if (!item.component) {
      return (
        <TextInput
          type={item.type || formType}
          disabled={item.disabled}
          placeholder={item.name}
          leftIcon={item.icon}
          value={item.value}
          label={item.name}
          onChangeText={item.onChange}
          onBlur={item.onBlur}
          icon={item.icon}
          keyboardType={item.keyboardType}
        />
      );
    }
  };
  return (
    <View style={{}}>
      <ScrollView
        contentContainerStyle={{
          ...style,
          paddingBottom: 60,
        }}
      >
        {data.map((item, i) => {
          if (item.isVisible === false) return null;

          return (
            <View key={i.toString()} style={{ marginBottom: 27 }}>
              {getComponent(item, i)}
            </View>
          );
        })}
        {onSave && formType != "view" ? (
          <Button
            title="Save"
            onPress={() => {
              onSave();
            }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}
