import api from "./api";

export default{
     async getAllReaders(){
            const res = await api.get("/reader");
            return res.data;
     },

     async getReaderById(id){
            const res = await api.get(`/reader/${id}`);
            return res.data;
     },

     //  ADMIN TẠO READER = DÙNG REGISTER API
       async createReader(data) {
              const res = await api.post("/auth/reader/register", data);
              return res.data;
       },

     async updateReader(id, data){
            const res = await api.put(`/reader/${id}`, data);
            return res.data;
     },

     async deleteReader(id){
            const res = await api.delete(`/reader/${id}`);
            return res.data;
     },
}