<template>
     <div class="row">
       <div v-if="!books || books.length === 0" class="col-12 text-center text-muted py-5">No books found.</div>
       <div v-for="b in books" :key="b._id || b.id" class="col-6 col-md-3 mb-4">
         <BookCard :book="b" />
       </div>
     </div>
   </template>
   
   <script>
   import BookCard from "./BookCard.vue";
   export default {
     name: "BookList",
     components: { BookCard },
     props: { books: { type: Array, default: () => [] } },
   };
   </script>
