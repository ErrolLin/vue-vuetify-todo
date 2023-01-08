import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";

import type { Dialog } from "@/types";

export const useDialogStore = defineStore("dialog", () => {
  const dialogState = reactive<{
    isShow: boolean;
    dialog: Dialog;
  }>({
    isShow: false,
    dialog: {
      type: "ALERT",
      title: "",
      content: "",
      confirm: {
        text: "",
        event: () => {},
      },
      cancel: "",
      data: "",
    },
  });

  const { isShow, dialog } = toRefs(dialogState);

  function showDialog(dialogMsg: Dialog) {
    dialog.value = dialogMsg;
    isShow.value = true;
  }

  function hideDialog() {
    dialog.value = {
      type: "ALERT",
      title: "",
      content: "",
      confirm: {
        text: "",
        event: () => {},
      },
      cancel: "",
      data: "",
    };
    isShow.value = false;
  }

  return {
    isShow,
    dialog,
    showDialog,
    hideDialog,
  };
});
