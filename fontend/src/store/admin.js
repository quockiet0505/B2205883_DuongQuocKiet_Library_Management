import axios from "axios";

const state = {
  token: localStorage.getItem("adminToken") || "",
  books: [],
  readers: [],
  borrows: [],
  stats: { books: 0, readers: 0, borrows: 0 },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  allBooks: (state) => state.books,
  allReaders: (state) => state.readers,
  allBorrows: (state) => state.borrows,
  dashboardStats: (state) => state.stats,
};

const actions = {
  async login({ commit }, credentials) {
    const res = await axios.post("/api/admin/login", credentials);
    commit("setToken", res.data.token);
    localStorage.setItem("adminToken", res.data.token);
  },

  logout({ commit }) {
    commit("clearToken");
    localStorage.removeItem("adminToken");
  },

  async fetchBooks({ commit }) {
    const res = await axios.get("/api/books");
    commit("setBooks", res.data);
  },

  async fetchReaders({ commit }) {
    const res = await axios.get("/api/readers");
    commit("setReaders", res.data);
  },

  async fetchBorrows({ commit }) {
    const res = await axios.get("/api/borrows");
    commit("setBorrows", res.data);
  },

  async fetchStats({ commit }) {
    const res = await axios.get("/api/admin/stats");
    commit("setStats", res.data);
  },
};

const mutations = {
  setToken: (state, token) => (state.token = token),
  clearToken: (state) => (state.token = ""),
  setBooks: (state, books) => (state.books = books),
  setReaders: (state, readers) => (state.readers = readers),
  setBorrows: (state, borrows) => (state.borrows = borrows),
  setStats: (state, stats) => (state.stats = stats),
};

export default { state, getters, actions, mutations };
