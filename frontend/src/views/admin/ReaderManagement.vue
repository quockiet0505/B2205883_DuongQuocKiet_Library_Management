<template>
     <div>
       <AppHeader />
       <div class="container mt-4">
         <ReaderList :readers="readers" />
       </div>
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "@/components/admin/AppHeader.vue";
   import AppFooter from "@/components/admin/AppFooter.vue";
   import ReaderList from "@/components/admin/ReaderList.vue";
   import { mapGetters } from "vuex";
   
   export default {
     components: { AppHeader, AppFooter, ReaderList },
     computed: mapGetters("admin", ["allReaders"]),
     async created() {
       await this.$store.dispatch("admin/fetchReaders");
     },
     data() {
       return { readers: [] };
     },
     watch: {
       allReaders(val) {
         this.readers = val;
       },
     },
   };
   </script>
   