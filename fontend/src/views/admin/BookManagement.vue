<template>
     <div>
       <AppHeader />
       <div class="container mt-4">
         <InputSearch v-model="searchQuery" />
         <BookList :books="filteredBooks" />
       </div>
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "@/components/admin/AppHeader.vue";
   import AppFooter from "@/components/admin/AppFooter.vue";
   import InputSearch from "@/components/admin/InputSearch.vue";
   import BookList from "@/components/admin/BookList.vue";
   import { mapGetters, mapActions } from "vuex";
   
   export default {
     components: { AppHeader, AppFooter, InputSearch, BookList },
     data() {
       return { searchQuery: "" };
     },
     computed: {
       ...mapGetters("admin", ["allBooks"]),
       filteredBooks() {
         return this.allBooks.filter((b) =>
           b.title.toLowerCase().includes(this.searchQuery.toLowerCase())
         );
       },
     },
     async created() {
       await this.$store.dispatch("admin/fetchBooks");
     },
   };
   </script>
   