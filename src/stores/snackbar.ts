import { reactive, toRefs } from "vue";
import { defineStore } from "pinia";

export const useSnackBarStore = defineStore("snackbar", () => {
  const snackBarState = reactive<{ isShow: boolean; text: string }>({
    isShow: false,
    text: "",
  });

  const { isShow, text } = toRefs(snackBarState);

  function showSnackBar(snackBarContent: string) {
    let timeout = 0;
    if (isShow.value) {
      isShow.value = false;
      timeout = 300;
    }

    setTimeout(() => {
      isShow.value = true;
      text.value = snackBarContent;
    }, timeout);
  }

  function hideSnackBar() {
    isShow.value = false;
  }

  return {
    isShow,
    text,
    showSnackBar,
    hideSnackBar,
  };
});
