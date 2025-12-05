<template>
  <AdminLayout>
     <div class="container mt-5">
       <div class="col-md-5 mx-auto card p-4 shadow-sm">
         <h3 class="text-center fw-bold mb-3">Admin Login</h3>
         <form @submit.prevent="handleLogin">
           <div class="mb-3">
             <label>Email</label>
             <input type="email" v-model="email" class="form-control"  />
           </div>
           <div class="mb-3">
             <label>Password</label>
             <input type="password" v-model="password" class="form-control"  />
           </div>
           <button class="btn btn-dark w-100">Login</button>
         </form>
       </div>
     </div>
     </AdminLayout>
   </template>
   
   <script>
   import { mapActions } from "vuex";
   import AdminLayout from "@/components/admin/AdminLayout.vue";
   export default {
     data() {
       return { email: "", password: "" };
     },
     components: { AdminLayout },
     methods: {
       ...mapActions("admin", ["login"]),
       async handleLogin() {
          if (!this.email) {
            this.$toast("Email is required", "error");
            return;
          }
          if (!this.password) {
            this.$toast("Password is required", "error");
            return;
          }

          try {
            await this.login({ email: this.email, password: this.password });
            this.$router.push("/admin/dashboard");
          } catch (err) {
            const msg = err.response?.data?.message || "Login failed";
            this.$toast(msg, "error");
          }
        }
        ,
     },
   };
   </script>
   