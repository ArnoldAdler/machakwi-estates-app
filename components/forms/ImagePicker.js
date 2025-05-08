import { AntDesign, Feather } from "@expo/vector-icons";
import H5 from "@/components/typography/H5";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as RNImagePicker from "expo-image-picker";
// import { storage } from "plugins/firebase";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Image, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import { danger_color, primary_color_blur } from "@/config/theme";
export default function ImagePicker({
  label,
  title,
  folder,
  storageName,
  onChange,
  fireUploadFuction,
  value,
  type,
}) {
  //////////////////////////////////////////////////////
  const [uploadProgress, setuploadProgress] = useState(null);
  const [image, setimage] = useState("");
  //////////////////////////////////////////////
  useEffect(() => {
    if (value) setimage(value);
    return () => {};
  }, [value]);

  ///////////////////////////////////////////
  const focusColor = useRef(new Animated.Value(0)).current;

  const focus = () => {
    Animated.timing(focusColor, {
      toValue: 1,
      duration: 16,
      useNativeDriver: false,
    }).start();
  };
  const unFocus = () => {
    Animated.timing(focusColor, {
      toValue: 0,
      duration: 16,
      useNativeDriver: false,
    }).start();
  };

  const focusColor2 = focusColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 0, 0, 0.3)", primary_color_blur],
  });
  const borderWidth = focusColor.interpolate({
    inputRange: [0, 1],
    outputRange: [1.5, 2],
  });
  /////////////////////////////////////////////////////////////
  const compressPhoto = async (uri) => {
    const manipResult = await manipulateAsync(uri, [], {
      compress: 0.3,
      format: SaveFormat.JPEG,
    });
    return manipResult;
  };
  const pickImage = async () => {
    let result = await RNImagePicker.launchImageLibraryAsync({
      mediaTypes: RNImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      //  aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      compressPhoto(result.uri).then((v) => {
        uploadImage(v.uri);
        setuploading(true);
      });
    }
  };

  //////////////////////////////////////////////////////////////

  async function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    //****************************************************Make unkown have a create id function for storage name to avoid overwritting files  */
    // storage.uploadFile(
    //   blob,
    //   `${folder ? folder : "Unknown"}/${storageName ? storageName : `Unknown`}`,
    //   (snapshot) => {
    //     const progress = Math.round(
    //       snapshot.bytesTransferred / snapshot.totalBytes
    //     );
    //     setuploadProgress(progress);
    //   },
    //   (v) => {
    //     recieptRef.getDownloadURL().then((imageURL) => {
    //       setuploading(false);
    //       console.log("File link", imageURL);
    //       setimage(imageURL);
    //       if (onChange) onChange(imageURL);
    //     });
    //   },
    //   (error) => {
    //     alert("File upload failed, Please try again");
    //     console.log("Upload Error 978", error);
    //     setuploading(false);
    //   }
    // );
  }

  //////////////////
  const [uploading, setuploading] = useState(false);

  //////////////////////////////////

  useEffect(() => {
    if (fireUploadFuction) pickImage();
    return () => {};
  }, [fireUploadFuction]);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        ref={(v) => {
          /*    try {
            setimageRef(v);
          } catch (error) {
            console.log("Error Set ref Image manupilator 567", error);
          } */
        }}
        disabled={type == "view" ? true : image ? true : false}
        onPress={() => {
          focus();
          pickImage();
        }}
        style={{
          height: 110,
          width: "80%",
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 3,
            borderWidth: borderWidth,
            borderColor: focusColor2,
            borderStyle: "dashed",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image ? (
            <View
              style={{
                paddingVertical: 10,
                maxHeight: 110,
                width: 100,
                justifyContent: "center",
              }}
            >
              <Image
                source={
                  image
                    ? {
                        uri: image,
                      }
                    : null
                }
                style={{
                  height: "100%",
                  width: "100%",
                  //  backgroundColor: "red",
                  position: "absolute",
                  resizeMode: "contain",
                }}
              ></Image>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  top: -5,
                  left: 5,
                }}
              >
                {type == "view" ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Delete Attachment",
                        "Are you sure you want to remove image?",
                        [
                          {
                            text: "No",
                            onPress: () => {},
                            style: "cancel",
                          },
                          {
                            text: "Yes, remove",
                            onPress: () => {
                              recieptRef.delete();
                              setimage("");
                              if (onChange) onChange("");
                            },
                          },
                        ]
                      );
                    }}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 50,
                    }}
                  >
                    <AntDesign
                      name="closecircle"
                      size={24}
                      color={danger_color}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null}

          {uploading == true && !image ? (
            <Progress.Circle
              animated={true}
              progress={uploadProgress ? uploadProgress : 0}
              size={50}
              showsText
              indeterminate={!uploadProgress}
              style={{
                position: "absolute",
              }}
            />
          ) : null}
          {!uploading && !image ? (
            type == "view" ? (
              <H5>No Image Uploaded</H5>
            ) : (
              <>
                <Feather name="upload" size={24} color="black" />
                <H5
                  style={{
                    marginTop: 10,
                  }}
                >
                  {title ? title : label ? label : "Upload Reciept"}
                </H5>
              </>
            )
          ) : null}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
