import { EventRegister } from "react-native-event-listeners";

export const startLoadingIndicator = (title, options) => {
  if (options) {
    const { backgroundColor } = options;
    if (backgroundColor)
      document.getElementById("loading-indicator").style.backgroundColor =
        backgroundColor;
  }

  EventRegister.emit("startLoadingIndicator", { title, options });
};

export const stopLoadingIndicator = () => {
  EventRegister.emit("stopLoadingIndicator");
};

export const startAppLoadingIndicator = (title, options) => {
  EventRegister.emit("startLoadingIndicator", { title, options });
};

export const stopAppLoadingIndicator = () => {
  EventRegister.emit("stopAppLoadingIndicator");
};
