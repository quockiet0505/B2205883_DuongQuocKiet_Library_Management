import { createStore } from "vuex";
import admin from "./admin";
import reader from "./reader";

export default createStore({
  modules: {
    admin,
    reader,
  },
});
