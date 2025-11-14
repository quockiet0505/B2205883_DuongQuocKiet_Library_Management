import api from "./api";

export default {
  async getAllStaffs() {
    const res = await api.get("/staff");
    return res.data;
  },

  async getStaffById(id) {
    const res = await api.get(`/staff/${id}`);
    return res.data;
  },

  // Dùng REGISTER API cho Admin thêm staff
  async createStaff(data) {
    const res = await api.post("/auth/staff/register", data);
    return res.data;
  },

  async updateStaff(id, data) {
    const res = await api.put(`/staff/${id}`, data);
    return res.data;
  },

  async deleteStaff(id) {
    const res = await api.delete(`/staff/${id}`);
    return res.data;
  },
};
