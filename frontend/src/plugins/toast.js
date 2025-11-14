import { reactive } from "vue";

const state = reactive({
  show: false,
  message: "",
  type: "success",
});

function showToast(message, type = "success") {
  state.message = message;
  state.type = type;
  state.show = true;

  setTimeout(() => {
    state.show = false;
  }, 2500);
}

export default {
  install(app) {
    app.config.globalProperties.$toast = showToast;
    app.provide("toastState", state);
  },
};
