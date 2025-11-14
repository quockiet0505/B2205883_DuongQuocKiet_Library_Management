import api from "@/services/api";

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
      const res = await api.post("/auth/staff/login", credentials);

      commit("setAdmin", res.data.staff);
      commit("setToken", res.data.token);

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminId", res.data.staff.id);

      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  async fetchCurrentAdmin({ commit }) {
    try {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) throw new Error("Admin ID not found");

      const res = await api.get(`/staff/${adminId}`);
      commit("setAdmin", res.data || res);
      return res.data || res;
    } catch (error) {
      console.error("Failed to fetch current admin:", error);
      throw error;
    }
  },

  logout({ commit }) {
    commit("clearAdmin");
    commit("clearToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
  },

  // ----------------- BOOK -----------------
  async fetchBooks({ commit, state }) {
    try {
      const res = await api.get("/book");
      let books = res.data.data || res.data;

      // Map dữ liệu: thêm id, publisherName
      books = books.map(b => {
        const pub = state.publishers.find(p => p._id === b.publisherId);
        return {
          ...b,
          id: b.bookId || b._id,
          publisherName: pub?.name || "—",
        };
      });

      commit("setBooks", books);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      commit("setBooks", []);
    }
  },

  // ----------------- READER -----------------
  async fetchReaders({ commit }) {
    try {
      const res = await api.get("/reader");
      let readers = res.data.data || res.data;

      readers = readers.map(r => ({
        ...r,
        id: r.readerId || r._id,
      }));

      commit("setReaders", readers);
    } catch (error) {
      console.error("Failed to fetch readers:", error);
      commit("setReaders", []);
    }
  },

  // ----------------- BORROW -----------------
  async fetchBorrows({ commit }) {
    try {
      const res = await api.get("/borrow");
      let borrows = res.data.data || res.data;

      borrows = borrows.map(b => ({
        ...b,
        id: b.borrowId || b._id,
      }));

      commit("setBorrows", borrows);
    } catch (error) {
      console.error("Failed to fetch borrows:", error);
      commit("setBorrows", []);
    }
  },

  // ----------------- PUBLISHER -----------------
  async fetchPublishers({ commit }) {
    try {
      const res = await api.get("/publisher");
      let publishers = res.data.data || res.data;

      publishers = publishers.map(p => ({
        ...p,
        id: p.publisherId || p._id,
      }));

      commit("setPublishers", publishers);
    } catch (error) {
      console.error("Failed to fetch publishers:", error);
      commit("setPublishers", []);
    }
  },

  async addPublisher({ dispatch }, data) {
    await api.post("/publisher", data);
    dispatch("fetchPublishers");
  },

  async updatePublisher({ dispatch }, { id, data }) {
    await api.put(`/publisher/${id}`, data);
    dispatch("fetchPublishers");
  },

  async deletePublisher({ dispatch }, id) {
    await api.delete(`/publisher/${id}`);
    dispatch("fetchPublishers");
  },

  // ----------------- STAFF -----------------
  async fetchStaffs({ commit }) {
    try {
      const res = await api.get("/staff");
      let staffs = res.data.data || res.data;

      staffs = staffs.map(s => ({
        ...s,
        id: s.staffId || s._id,
      }));

      commit("setStaffs", staffs);
    } catch (error) {
      console.error("Failed to fetch staffs:", error);
      commit("setStaffs", []);
    }
  },

  async registerStaff({ dispatch }, data) {
    await api.post("/auth/staff/register", data);
    dispatch("fetchStaffs");
  },

  async updateStaff({ dispatch }, { id, data }) {
    await api.put(`/staff/${id}`, data);
    dispatch("fetchStaffs");
  },

  async deleteStaff({ dispatch }, id) {
    await api.delete(`/staff/${id}`);
    dispatch("fetchStaffs");
  },

  // ----------------- DASHBOARD STATS -----------------
  async fetchStats({ commit }) {
    try {
      const [books, readers, borrows, publishers, staffs] = await Promise.all([
        api.get("/book"),
        api.get("/reader"),
        api.get("/borrow"),
        api.get("/publisher"),
        api.get("/staff"),
      ]);

      const stats = {
        books: (books.data.data || books.data).length,
        readers: (readers.data.data || readers.data).length,
        borrows: (borrows.data.data || borrows.data).length,
        publishers: (publishers.data.data || publishers.data).length,
        staffs: (staffs.data.data || staffs.data).length,
      };

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
  setPublishers: (state, publishers) => (state.publishers = publishers),
  setStaffs: (state, staffs) => (state.staffs = staffs),

  setStats: (state, stats) => (state.stats = stats),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
