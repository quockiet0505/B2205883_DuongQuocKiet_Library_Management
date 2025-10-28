<template>
     <div class="container mt-4 col-md-6">
       <h3>Register New Staff</h3>
   
       <form @submit.prevent="handleSubmit">
         <input v-model="form.firstName" class="form-control my-2" placeholder="First Name" required />
         <input v-model="form.lastName" class="form-control my-2" placeholder="Last Name" required />
         <input v-model="form.email" class="form-control my-2" placeholder="Email" required />
         <input v-model="form.phone" class="form-control my-2" placeholder="Phone" required />
         <input v-model="form.password" type="password" class="form-control my-2" placeholder="Password" required />
         <select v-model="form.role" class="form-control my-2">
           <option value="Staff">Staff</option>
           <option value="Admin">Admin</option>
         </select>
   
         <button type="submit" class="btn btn-primary mt-3">Register</button>
       </form>
     </div>
   </template>
   
   <script>
   import { mapActions } from "vuex";
   export default {
     data() {
       return {
         form: { firstName: "", lastName: "", email: "", phone: "", password: "", role: "Staff" },
       };
     },
     methods: {
       ...mapActions("admin", ["registerStaff"]),
       async handleSubmit() {
         await this.registerStaff(this.form);
         this.$router.push("/admin/staff");
       },
     },
   };
   </script>
   