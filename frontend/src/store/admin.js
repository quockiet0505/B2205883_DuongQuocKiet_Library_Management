import axios from "axios";

const state = {
  admin: null,
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
  adminInfo: (state) => state.admin,
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
    try {
      const res = await axios.post("/api/auth/staff/login", credentials);
      commit("setAdmin", res.data.staff);
      commit("setToken", res.data.token);
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminId", res.data.staff.id);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  logout({ commit }) {
    commit("clearAdmin");
    commit("clearToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
  },

  // ----------------- BOOK -----------------
  async fetchBooks({ commit }) {
    try {
      const res = await axios.get("/api/book");
      // Backend có thể trả về res.data hoặc res.data.data
      const books = res.data.data || res.data;
      console.log("Books fetched:", books);
      commit("setBooks", books);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      commit("setBooks", []);
    }
  },

  // ----------------- READER -----------------
  async fetchReaders({ commit }) {
    try {
      const res = await axios.get("/api/reader");
      const readers = res.data.data || res.data;
      console.log("Readers fetched:", readers);
      commit("setReaders", readers);
    } catch (error) {
      console.error("Failed to fetch readers:", error);
      commit("setReaders", []);
    }
  },

  // ----------------- BORROW -----------------
  async fetchBorrows({ commit }) {
    try {
      const res = await axios.get("/api/borrow");
      const borrows = res.data.data || res.data;
      console.log("Borrows fetched:", borrows);
      commit("setBorrows", borrows);
    } catch (error) {
      console.error("Failed to fetch borrows:", error);
      commit("setBorrows", []);
    }
  },

  // ----------------- PUBLISHER -----------------
  async fetchPublishers({ commit }) {
    try {
      const res = await axios.get("/api/publisher");
      const publishers = res.data.data || res.data;
      console.log("Publishers fetched:", publishers);
      commit("setPublishers", publishers);
    } catch (error) {
      console.error("Failed to fetch publishers:", error);
      commit("setPublishers", []);
    }
  },

  async addPublisher({ dispatch }, data) {
    await axios.post("/api/publisher", data);
    dispatch("fetchPublishers");
  },

  async updatePublisher({ dispatch }, { id, data }) {
    await axios.put(`/api/publisher/${id}`, data);
    dispatch("fetchPublishers");
  },

  async deletePublisher({ dispatch }, id) {
    await axios.delete(`/api/publisher/${id}`);
    dispatch("fetchPublishers");
  },

  // ----------------- STAFF -----------------
  async fetchStaffs({ commit }) {
    try {
      const res = await axios.get("/api/staff");
      const staffs = res.data.data || res.data;
      console.log("Staffs fetched:", staffs);
      commit("setStaffs", staffs);
    } catch (error) {
      console.error("Failed to fetch staffs:", error);
      commit("setStaffs", []);
    }
  },

  async registerStaff({ dispatch }, data) {
    await axios.post("/api/auth/staff/register", data);
    dispatch("fetchStaffs");
  },

  async updateStaff({ dispatch }, { id, data }) {
    await axios.put(`/api/staff/${id}`, data);
    dispatch("fetchStaffs");
  },

  async deleteStaff({ dispatch }, id) {
    await axios.delete(`/api/staff/${id}`);
    dispatch("fetchStaffs");
  },

  async fetchStats({ commit }) {
    try {
      const [books, readers, borrows, publishers] = await Promise.all([
        axios.get("/api/book"),
        axios.get("/api/reader"),
        axios.get("/api/borrow"),
        axios.get("/api/publisher")
      ]);
      
      const stats = {
        books: (books.data.data || books.data).length,
        readers: (readers.data.data || readers.data).length,
        borrows: (borrows.data.data || borrows.data).length,
        publishers: (publishers.data.data || publishers.data).length
      };
      
      console.log("Stats:", stats);
      commit("setStats", stats);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  },
};

const mutations = {
  setAdmin: (state, admin) => (state.admin = admin),
  setToken: (state, token) => (state.token = token),
  clearAdmin: (state) => (state.admin = null),
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
