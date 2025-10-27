import api from "./api";

export default {
     async getAllPublishers(){
          const res = await api.get("/publisher");
          return res.data;
     },

     async getPublisherById(id){
          const res = await api.get(`/publisher/${id}`);
          return res.data;
     },

     async createPublisher(data){
          const res = await api.post("/publisher", data);
          return res.data;
     },

     async updatedPublisher(id, data){
          const res = await api.put(`/publisher/${id}`, data);
          return res.data;
     },

     async deletePublisher(id){
          const res = await api.delete(`/publisher/${id}`);
          return res.data;
     }


}