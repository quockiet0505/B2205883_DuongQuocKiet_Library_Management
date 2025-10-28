import axios from "axios";

const state = {
  token: localStorage.getItem("adminToken") || "",
  books: [],
  readers: [],
  borrows: [],
  publishers: [],
  staffs: [],
  stats: { books: 0, readers: 0, borrows: 0, publishers: 0, staffs: 0 },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  allBooks: (state) => state.books,
  allReaders: (state) => state.readers,
  allBorrows: (state) => state.borrows,
  allPublishers: (state) => state.publishers,
  allStaffs: (state) => state.staffs,
  dashboardStats: (state) => state.stats,
};

const actions = {
  // ----------------- AUTH -----------------
  async login({ commit }, credentials) {
    const res = await axios.post("/api/admin/login", credentials);
    commit("setToken", res.data.token);
    localStorage.setItem("adminToken", res.data.token);
  },

  logout({ commit }) {
    commit("clearToken");
    localStorage.removeItem("adminToken");
  },

  // ----------------- BOOK -----------------
  async fetchBooks({ commit }) {
    const res = await axios.get("/api/books");
    commit("setBooks", res.data);
  },

  // ----------------- READER -----------------
  async fetchReaders({ commit }) {
    const res = await axios.get("/api/readers");
    commit("setReaders", res.data);
  },

  // ----------------- BORROW -----------------
  async fetchBorrows({ commit }) {
    const res = await axios.get("/api/borrows");
    commit("setBorrows", res.data);
  },

  // ----------------- DASHBOARD -----------------
  async fetchStats({ commit }) {
    const res = await axios.get("/api/admin/stats");
    commit("setStats", res.data);
  },

  // ----------------- PUBLISHER -----------------
  async fetchPublishers({ commit }) {
    const res = await axios.get("/api/publishers");
    commit("setPublishers", res.data);
  },

  async addPublisher({ dispatch }, data) {
    await axios.post("/api/publishers", data);
    dispatch("fetchPublishers");
  },

  async updatePublisher({ dispatch }, { id, data }) {
    await axios.put(`/api/publishers/${id}`, data);
    dispatch("fetchPublishers");
  },

  async deletePublisher({ dispatch }, id) {
    await axios.delete(`/api/publishers/${id}`);
    dispatch("fetchPublishers");
  },

  // ----------------- STAFF -----------------
  async fetchStaffs({ commit }) {
    const res = await axios.get("/api/staffs");
    commit("setStaffs", res.data);
  },

  async registerStaff({ dispatch }, data) {
    await axios.post("/api/staffs/register", data);
    dispatch("fetchStaffs");
  },

  async updateStaff({ dispatch }, { id, data }) {
    await axios.put(`/api/staffs/${id}`, data);
    dispatch("fetchStaffs");
  },

  async deleteStaff({ dispatch }, id) {
    await axios.delete(`/api/staffs/${id}`);
    dispatch("fetchStaffs");
  },
};

const mutations = {
  setToken: (state, token) => (state.token = token),
  clearToken: (state) => (state.token = ""),
  setBooks: (state, books) => (state.books = books),
  setReaders: (state, readers) => (state.readers = readers),
  setBorrows: (state, borrows) => (state.borrows = borrows),
  setStats: (state, stats) => (state.stats = stats),
  setPublishers: (state, publishers) => (state.publishers = publishers),
  setStaffs: (state, staffs) => (state.staffs = staffs),
};

export default { 
  namespaced: true, 
  state, 
  getters, 
  actions, 
  mutations 
};
