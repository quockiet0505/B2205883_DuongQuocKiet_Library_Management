<template>
     <div>
       <AdminLayout >
       <div class="container mt-4">
         <BorrowList :borrows="borrows" />
       </div>
       </AdminLayout >
     </div>
   </template>
   
   <script>
   import AdminLayout from "@/components/admin/AdminLayout.vue";
   import BorrowList from "@/components/admin/BorrowList.vue";
   import { mapGetters } from "vuex";
   
   export default {
     components: { AdminLayout, BorrowList },
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
   