import api from "./api";

function decodeJwt(token) {
  if (!token || token.split(".").length !== 3) return null;
  try {
    const b64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(b64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

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
    const decoded = decodeJwt(token);

    const readerId = reader._id || res.data?._id || decoded?.id || decoded?.sub || ""; 

    if (readerId) localStorage.setItem("readerId", readerId);
    return res.data;
  },

  async registerReader(data) {
    const res = await api.post("/auth/reader/register", data);

    localStorage.removeItem("readerToken");
    localStorage.removeItem("readerId");

    const token = res.data?.token;
    if (token) localStorage.setItem("readerToken", token);

    const reader = res.data?.reader || res.data?.data || {};
    const decoded = decodeJwt(token);

    const readerId = reader._id || res.data?._id || decoded?.id || ""; 

    if (readerId) localStorage.setItem("readerId", readerId);
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
