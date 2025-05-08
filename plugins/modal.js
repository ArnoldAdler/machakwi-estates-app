import { EventRegister } from "react-native-event-listeners";

export const openModal = (comp, title) => {
  if (!comp) {
    alert("Modal does not have display component");
    return;
  }
  EventRegister.emit("openModal", { comp, title });
};

export const closeModal = () => {
  EventRegister.emit("closeModal");
};

export const openMenuModal = (data, title) => {
  EventRegister.emit("openMenuModal", { data, title });
};

export const closeMenuModal = () => {
  EventRegister.emit("closeMenuModal");
};
