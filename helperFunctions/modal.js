import { ModalPortal } from "react-native-modals";
import MenuModal from "@/components/MenuModal";
import { Text } from "react-native";
import BottomModal from "@/components/BottomModal";

class Modal {
  constructor() {}
  show = (id, title) => {
    if (!id) {
      alert("Id for modal not passed.");
      return;
    }
  };
  open = (id, title) => {
    if (!id) {
      alert("Id for modal not passed.");
      return;
    }
  };
  openBottomModal = (title, component) => {
    if (!component) {
      alert("Component for modal not passed.");
      return;
    }
    const id = ModalPortal.show(
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Loading...
      </Text>
    );
    setTimeout(() => {
      ModalPortal.update(id, {
        children: (
          <BottomModal
            title={title}
            component={component}
            id={id}
          ></BottomModal>
        ),
      });
    }, 100);
  };
  openBottomMenu = (title, menu) => {
    if (!menu) {
      alert("Menu array for Menu modal not passed.");
      return;
    }
    const id = ModalPortal.show(
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Loading...
      </Text>
    );
    setTimeout(() => {
      ModalPortal.update(id, {
        children: <MenuModal title={title} menu={menu} id={id}></MenuModal>,
        onDismiss: (event) => {},
        visible: true,
      });
    }, 100);
  };

  close = (id) => {
    if (id) ModalPortal.dismiss(id);
    else {
      ModalPortal.dismissAll();
    }
  };
}

export const modal = new Modal();
