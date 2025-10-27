import api from "./api";

export default{
     async getAllBorrows(){
            const res = await api.get("/borrow");
            return res.data;
     },

     async getBorrowById(id){
            const res = await api.get(`/borrow/${id}`);
            return res.data;
     },

     async createBorrow(data){
            const res = await api.post("/borrow", data);
            return res.data;
     },

     async updateBorrow(id, data){
            const res = await api.put(`/borrow/${id}`, data);
            return res.data;
     },

     async deleteBorrow(id){
            const res = await api.delete(`/borrow/${id}`);
            return res.data;
     },
}