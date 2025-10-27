<template>
     <div>
       <AppHeader />
       <div class="container mt-4">
         <Dashboard :stats="stats" />
       </div>
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "@/components/admin/AppHeader.vue";
   import AppFooter from "@/components/admin/AppFooter.vue";
   import Dashboard from "@/components/admin/Dashboard.vue";
   import { mapGetters, mapActions } from "vuex";
   
   export default {
     components: { AppHeader, AppFooter, Dashboard },
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
   