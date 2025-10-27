<template>
     <div>
       <AppHeader />
       <div class="container mt-4">
         <BookDetail :book="book" />
       </div>
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "@/components/admin/AppHeader.vue";
   import AppFooter from "@/components/admin/AppFooter.vue";
   import BookDetail from "@/components/admin/BookDetail.vue";
   import axios from "axios";
   
   export default {
     data() {
       return { book: null };
     },
     async created() {
       const id = this.$route.params.id;
       const res = await axios.get(`/api/books/${id}`);
       this.book = res.data;
     },
   };
   </script>
   