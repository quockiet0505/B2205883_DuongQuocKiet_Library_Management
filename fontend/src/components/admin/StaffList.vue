<template>
     <div class="container mt-4">
       <h3>Staff Management</h3>
   
       <button class="btn btn-success mb-3" @click="$router.push('/admin/staff/register')">
         Add Staff
       </button>
   
       <table class="table table-bordered">
         <thead class="table-light">
           <tr>
             <th>#</th>
             <th>Full Name</th>
             <th>Email</th>
             <th>Phone</th>
             <th>Role</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="(staff, i) in staffs" :key="staff._id">
             <td>{{ i + 1 }}</td>
             <td>{{ staff.firstName }} {{ staff.lastName }}</td>
             <td>{{ staff.email }}</td>
             <td>{{ staff.phone }}</td>
             <td>{{ staff.role }}</td>
             <td>
               <button class="btn btn-danger btn-sm" @click="deleteStaff(staff._id)">Delete</button>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </template>
   
   <script>
   import { mapActions, mapState } from "vuex";
   export default {
     computed: {
       ...mapState("admin", ["staffs"]),
     },
     methods: {
       ...mapActions("admin", ["fetchStaffs", "deleteStaff"]),
     },
     mounted() {
       this.fetchStaffs();
     },
   };
   </script>
   