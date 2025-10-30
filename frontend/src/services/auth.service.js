import api from "./api";

export default {
  // Admin
  async loginAdmin(credentials) {
    const res = await api.post("/auth/staff/login", credentials);
    if (res.data.token) localStorage.setItem("adminToken", res.data.token);
    return res.data;
  },

  async registerAdmin(data) {
    const res = await api.post("/auth/staff/register", data);
    return res.data;
  },

  logoutAdmin() {
    localStorage.removeItem("adminToken");
  },

  getAdminToken() {
    return localStorage.getItem("adminToken");
  },

  // Reader
  async loginReader(credentials) {
    const res = await api.post("/auth/reader/login", credentials);
    if (res.data.token) localStorage.setItem("readerToken", res.data.token);
    return res.data;
  },

  async registerReader(data) {
    const res = await api.post("/auth/reader/register", data);
    return res.data;
  },

  logoutReader() {
    localStorage.removeItem("readerToken");
  },

  getReaderToken() {
    return localStorage.getItem("readerToken");
  },
};
