import api from "./api";

export default {
     async getAllBooks(){
            const res = await api.get("/book");
            return res.data;
     },

     async getBookById(id){
            const res = await api.get(`/book/${id}`);
            return res.data;
     },

     async createBook(data){
            const res = await api.post("/book", data);
            return res.data;
     },


     async updateBook(id, data){
            const res = await api.put(`/book/${id}`, data);
            return res.data;
     },

     async deleteBook(id){
            const res = await api.delete(`/book/${id}`);
            return res.data;
     }


}