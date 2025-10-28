import axios from "axios";

const state = {
  reader: null,
  token: localStorage.getItem("readerToken") || "",
  books: [],
  history: [],
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  readerInfo: (state) => state.reader,
  allBooks: (state) => state.books,
  borrowHistory: (state) => state.history,
};

const actions = {
  async register({ commit }, data) {
    await axios.post("/api/auth/reader/register", data);
  },

  async login({ commit }, credentials) {
    const res = await axios.post("/api/auth/reader/login", credentials);
    commit("setReader", res.data.reader);
    commit("setToken", res.data.token);
    localStorage.setItem("readerToken", res.data.token);
  },

  logout({ commit }) {
    commit("logoutReader");
    localStorage.removeItem("readerToken");
  },

  async fetchBooks({ commit }) {
    const res = await axios.get("/api/books");
    commit("setBooks", res.data);
  },

  async fetchBorrowHistory({ commit }) {
    const res = await axios.get("/api/borrow/history");
    commit("setHistory", res.data);
  },
};

const mutations = {
  setReader: (state, reader) => (state.reader = reader),
  setToken: (state, token) => (state.token = token),
  logoutReader: (state) => {
    state.reader = null;
    state.token = "";
  },
  setBooks: (state, books) => (state.books = books),
  setHistory: (state, history) => (state.history = history),
};

export default { 
  namespaced: true,
  state, 
  getters, 
  actions, 
  mutations 
};
