<template>
     <div class="container mt-4">
       <h3 class="mb-3">Publisher Management</h3>
   
       <div class="d-flex mb-3">
         <input
           v-model="search"
           class="form-control me-2"
           placeholder="Search by name..."
         />
         <button class="btn btn-primary" @click="openAddModal">Add Publisher</button>
       </div>
   
       <table class="table table-bordered">
         <thead class="table-light">
           <tr>
             <th>#</th>
             <th>Name</th>
             <th>Address</th>
             <th>Phone</th>
             <th>Email</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="(pub, index) in filteredPublishers" :key="pub._id">
             <td>{{ index + 1 }}</td>
             <td>{{ pub.name }}</td>
             <td>{{ pub.address }}</td>
             <td>{{ pub.phone }}</td>
             <td>{{ pub.email }}</td>
             <td>
               <button class="btn btn-sm btn-warning me-2" @click="openEditModal(pub)">Edit</button>
               <button class="btn btn-sm btn-danger" @click="deletePublisher(pub._id)">Delete</button>
             </td>
           </tr>
         </tbody>
       </table>
   
       <!-- Modal -->
       <div
         v-if="showModal"
         class="modal fade show d-block"
         style="background: rgba(0,0,0,0.5);"
       >
         <div class="modal-dialog">
           <div class="modal-content p-3">
             <h5>{{ editMode ? "Edit Publisher" : "Add Publisher" }}</h5>
             <input v-model="form.name" class="form-control my-2" placeholder="Name" />
             <input v-model="form.address" class="form-control my-2" placeholder="Address" />
             <input v-model="form.phone" class="form-control my-2" placeholder="Phone" />
             <input v-model="form.email" class="form-control my-2" placeholder="Email" />
   
             <div class="d-flex justify-content-end mt-3">
               <button class="btn btn-secondary me-2" @click="closeModal">Cancel</button>
               <button class="btn btn-primary" @click="savePublisher">Save</button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </template>
   
   <script>
   import { mapActions, mapState } from "vuex";
   
   export default {
     data() {
       return {
         search: "",
         showModal: false,
         editMode: false,
         form: { _id: "", name: "", address: "", phone: "", email: "" },
       };
     },
     computed: {
       ...mapState("admin", ["publishers"]),
       filteredPublishers() {
         return this.publishers.filter((p) =>
           p.name.toLowerCase().includes(this.search.toLowerCase())
         );
       },
     },
     methods: {
       ...mapActions("admin", ["fetchPublishers", "addPublisher", "updatePublisher", "deletePublisher"]),
       openAddModal() {
         this.form = { name: "", address: "", phone: "", email: "" };
         this.editMode = false;
         this.showModal = true;
       },
       openEditModal(pub) {
         this.form = { ...pub };
         this.editMode = true;
         this.showModal = true;
       },
       closeModal() {
         this.showModal = false;
       },
       async savePublisher() {
         if (this.editMode) await this.updatePublisher(this.form);
         else await this.addPublisher(this.form);
         this.closeModal();
       },
     },
     mounted() {
       this.fetchPublishers();
     },
   };
   </script>
   
   <style scoped>
   .modal {
     display: block;
   }
   </style>
   