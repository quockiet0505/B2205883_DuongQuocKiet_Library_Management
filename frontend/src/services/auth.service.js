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
  // ===================== STAFF LOGIN =====================
  async loginAdmin(credentials) {
    const payload = {
      email: (credentials?.email || "").trim(),
      password: credentials?.password,
    };

    const res = await api.post("/auth/staff/login", payload);

    const token = res.data?.token;
    if (token) localStorage.setItem("adminToken", token);

    // Lưu ID staff đăng nhập
    const staff = res.data?.staff || {};
    const staffId = staff.id || staff._id;
    if (staffId) localStorage.setItem("adminId", staffId);

    return res.data;
  },

  logoutAdmin() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId");
  },

  getAdminToken() {
    return localStorage.getItem("adminToken");
  },

  getAdminId() {
    return localStorage.getItem("adminId");
  },

  // ===================== STAFF REGISTER =====================
  async registerAdmin(data) {
    const res = await api.post("/auth/staff/register", data);
    return res.data;
  },

  // ===================== READER LOGIN =====================
  async loginReader(credentials) {
    const payload = {
      email: (credentials?.email || "").trim(),
      password: credentials?.password,
    };

    const res = await api.post("/auth/reader/login", payload);
    const token = res.data?.token;

    if (token) localStorage.setItem("readerToken", token);

    const reader = res.data?.reader;
    const id = reader?.readerId || reader?._id;
    if (id) localStorage.setItem("readerId", id);

    return res.data;
  },

  async registerReader(data) {
    const res = await api.post("/auth/reader/register", data);

    const token = res.data?.token;
    if (token) localStorage.setItem("readerToken", token);

    const reader = res.data?.reader;
    const id = reader?.readerId || reader?._id;
    if (id) localStorage.setItem("readerId", id);

    return res.data;
  },

  logoutReader() {
    localStorage.removeItem("readerToken");
    localStorage.removeItem("readerId");
  },

  getReaderId() {
    return localStorage.getItem("readerId");
  }
};
