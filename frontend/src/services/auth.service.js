import api from "./api";

export default {
  // Admin
  async loginAdmin(credentials) {
    const payload = {
      email: (credentials?.email || "").toString().trim(),
      password: credentials?.password,
    };
    const res = await api.post("/auth/staff/login", payload);
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
    const payload = {
      email: (credentials?.email || "").toString().trim(),
      password: credentials?.password,
    };
    const res = await api.post("/auth/reader/login", payload);

    const token = res.data?.token;
    if (token) localStorage.setItem("readerToken", token);

    const reader = res.data?.reader || res.data?.data || {};
    
    // Log đầy đủ để xem backend trả về gì
    // console.log("[Auth] Full response:", res.data);
    // console.log("[Auth] reader object:", reader);
    // console.log("[Auth] reader.readerId:", reader.readerId);
    // console.log("[Auth] reader._id:", reader._id);

    const readerId = reader.readerId || reader._id || res.data?.readerId || res.data?._id;
    if (readerId) localStorage.setItem("readerId", readerId);

    console.log("[Auth] Final saved readerId:", readerId);
    console.log("[Auth] Type of readerId:", typeof readerId);

    return res.data;
  },

  async registerReader(data) {
    const res = await api.post("/auth/reader/register", data);
    
    localStorage.removeItem("readerToken");
    localStorage.removeItem("readerId");
    return res.data;
  },

  logoutReader() {
    localStorage.removeItem("readerToken");
    localStorage.removeItem("readerId");
  },

  getReaderToken() {
    return localStorage.getItem("readerToken");
  },

  getReaderId() {
    return localStorage.getItem("readerId");
  },
};
