<template>
     <div>
       <AppHeader />
       <div class="container mt-4">
         <BorrowList :borrows="borrows" />
       </div>
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "@/components/admin/AppHeader.vue";
   import AppFooter from "@/components/admin/AppFooter.vue";
   import BorrowList from "@/components/admin/BorrowList.vue";
   import { mapGetters } from "vuex";
   
   export default {
     components: { AppHeader, AppFooter, BorrowList },
     computed: mapGetters("admin", ["allBorrows"]),
     data() {
       return { borrows: [] };
     },
     async created() {
       await this.$store.dispatch("admin/fetchBorrows");
       this.borrows = this.allBorrows;
     },
   };
   </script>
   