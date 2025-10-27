<template>
     <div class="container my-4">
       <h3 class="fw-bold mb-3"> Manage Readers</h3>
   
       <table class="table table-hover table-bordered">
         <thead class="table-secondary">
           <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Email</th>
             <th>Status</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="r in readers" :key="r.id">
             <td>{{ r.id }}</td>
             <td>{{ r.name }}</td>
             <td>{{ r.email }}</td>
             <td>
               <span class="badge" :class="r.active ? 'bg-success' : 'bg-danger'">
                 {{ r.active ? 'Active' : 'Banned' }}
               </span>
             </td>
             <td>
               <button class="btn btn-sm btn-warning me-2" @click="editReader(r)">Edit</button>
               <button class="btn btn-sm btn-danger" @click="banReader(r)">Ban</button>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </template>
   
   <script>
   export default {
     name: "ReaderList",
     data() {
       return {
         readers: [
           { id: 1, name: "Nguyen Van A", email: "a@gmail.com", active: true },
           { id: 2, name: "Tran Thi B", email: "b@gmail.com", active: false },
         ],
       };
     },
     methods: {
       editReader(r) {
         alert(`Edit reader: ${r.name}`);
       },
       banReader(r) {
         r.active = !r.active;
       },
     },
   };
   </script>
   