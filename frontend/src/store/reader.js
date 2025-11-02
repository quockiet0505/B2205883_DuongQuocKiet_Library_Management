import axios from "axios";
import borrowService from "@/services/borrow.service";

const state = {
  reader: null,
  token: localStorage.getItem("readerToken") || "",
  books: [],
  history: [],
  error: null,
};

const getters = {
  isLoggedIn: (state) => !!state.token,
  readerInfo: (state) => state.reader,
  allBooks: (state) => state.books,
  borrowHistory: (state) => state.history,
  error: (state) => state.error,
};

const actions = {
  async register({ commit }, data) {
    try {
      const res = await axios.post("/api/auth/reader/register", data);
      commit("setReader", res.data.reader);
      commit("setToken", res.data.token);
      commit("setError", null);
      localStorage.setItem("readerToken", res.data.token);
      localStorage.setItem("readerId", res.data.reader._id);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Register failed";
      commit("setError", message);
      throw new Error(message);
    }
  },

  async login({ commit }, { identifier, password }) {
    try {
      const res = await axios.post("/api/auth/reader/login", { identifier, password });
      commit("setReader", res.data.reader);
      commit("setToken", res.data.token);
      commit("setError", null);
      localStorage.setItem("readerToken", res.data.token);
      localStorage.setItem("readerId", res.data.reader._id);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      commit("setError", message);
      throw new Error(message);
    }
  },

  logout({ commit }) {
    commit("logoutReader");
    localStorage.removeItem("readerToken");
    localStorage.removeItem("readerId");
  },

  async fetchBooks({ commit }) {
    const res = await axios.get("/api/book");
    commit("setBooks", res.data);
  },

  async fetchBorrowHistory({ commit }) {
    const readerId = localStorage.getItem("readerId");
    if (!readerId) {
      commit("setHistory", []);
      return;
    }
    try {
      const data = await borrowService.getBorrowsByReaderId(readerId);
      commit("setHistory", data.data || data);
      commit("setError", null);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to fetch history");
      commit("setHistory", []);
    }
  },

  async fetchProfile({ commit }) {
    const readerId = localStorage.getItem("readerId");
    if (!readerId) throw new Error("No reader ID found");
    try {
      const res = await axios.get(`/api/reader/${readerId}`);
      commit("setReader", res.data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to fetch profile");
      throw error;
    }
  },

  async updateProfile({ commit }, data) {
    const readerId = localStorage.getItem("readerId");
    if (!readerId) throw new Error("No reader ID found");
    try {
      const res = await axios.put(`/api/reader/${readerId}`, data);
      commit("setReader", res.data);
      return res.data;
    } catch (error) {
      commit("setError", error.response?.data?.message || "Update failed");
      throw error;
    }
  },

  async createBorrow({ commit }, data) {
    try {
      const result = await borrowService.createBorrow(data);
      commit("setError", null);
      return result;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create borrow request";
      commit("setError", message);
      throw error;
    }
  },
};

const mutations = {
  setReader: (state, reader) => (state.reader = reader),
  setToken: (state, token) => (state.token = token),
  setBooks: (state, books) => (state.books = books),
  setHistory: (state, history) => (state.history = history),
  setError: (state, error) => (state.error = error),
  logoutReader: (state) => {
    state.reader = null;
    state.token = "";
    state.error = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
