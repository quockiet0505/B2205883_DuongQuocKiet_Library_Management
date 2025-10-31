import api from "./api";

export default{
     async getAllReaders(){
            const res = await api.get("/reader");
            return res.data;
     },

     // gọi hàm này
     async getReaderById(id){
            const res = await api.get(`/reader/${id}`);
            return res.data;
     },

     async createReader(data){
            const res = await api.post("/reader", data);
            return res.data;
     },

     // gọi hàm này khi save
     async updateReader(id, data){
            const res = await api.put(`/reader/${id}`, data);
            return res.data;
     },

     async deleteReader(id){
            const res = await api.delete(`/reader/${id}`);
            return res.data;
     },
}