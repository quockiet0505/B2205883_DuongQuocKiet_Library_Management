<template>
     <div>
       <AdminLayout >
       <div class="container mt-4">
         <Dashboard :stats="stats" />
       </div>
       </AdminLayout >
     </div>
   </template>
   
   <script>
   import AdminLayout from "@/components/admin/AdminLayout.vue";
   import Dashboard from "@/components/admin/Dashboard.vue";
   import { mapGetters, mapActions } from "vuex";
   
   export default {
     components: { AdminLayout, Dashboard },
     computed: mapGetters("admin", ["dashboardStats"]),
     data() {
       return { stats: {} };
     },
     async created() {
       await this.$store.dispatch("admin/fetchStats");
       this.stats = this.dashboardStats;
     },
   };
   </script>
   