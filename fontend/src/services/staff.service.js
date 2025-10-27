import api from "./api";

export default{
     async getAllStaffs(){
            const res = await api.get("/staff");
            return res.data;
     },

     async getStaffById(id){
            const res = await api.get(`/staff/${id}`);
            return res.data;
     },

     async createStaff(data){
            const res = await api.post("/staff", data);
            return res.data;
     },

     async updateStaff(id, data){
            const res = await api.put(`/staff/${id}`, data);
            return res.data;
     },

     async deleteStaff(id){
            const res = await api.delete(`/staff/${id}`);
            return res.data;
     },

}