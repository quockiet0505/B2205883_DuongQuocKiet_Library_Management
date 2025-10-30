<template>
     <div class="container mt-5">
       <div class="col-md-5 mx-auto card p-4 shadow-sm">
         <h3 class="text-center fw-bold mb-3">Admin Login</h3>
         <form @submit.prevent="handleLogin">
           <div class="mb-3">
             <label>Email</label>
             <input type="email" v-model="email" class="form-control" required />
           </div>
           <div class="mb-3">
             <label>Password</label>
             <input type="password" v-model="password" class="form-control" required />
           </div>
           <button class="btn btn-dark w-100">Login</button>
         </form>
       </div>
     </div>
   </template>
   
   <script>
   import { mapActions } from "vuex";
   
   export default {
     data() {
       return { email: "", password: "" };
     },
     methods: {
       ...mapActions("admin", ["login"]),
       async handleLogin() {
         try {
           await this.login({ email: this.email, password: this.password });
           this.$router.push("/admin/dashboard");
         } catch (err) {
           alert("Invalid credentials");
         }
       },
     },
   };
   </script>
   