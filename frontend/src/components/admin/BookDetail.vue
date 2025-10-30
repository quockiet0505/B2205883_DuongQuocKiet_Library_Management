<template>
     <div class="container my-4">
       <h3 class="fw-bold">Book Detail</h3>
       <div class="card shadow-sm p-4 mt-3">
         <p><strong>Title:</strong> {{ book.title }}</p>
         <p><strong>Publisher:</strong> {{ book.publisher }}</p>
         <p><strong>Description:</strong> {{ book.description }}</p>
         <button class="btn btn-secondary" @click="$router.back()">← Back</button>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     name: "BookDetail",
     data() {
       return {
         book: {
           title: "Learning Vue.js",
           publisher: "O'Reilly",
           description: "An introduction to Vue.js framework for modern web apps.",
         },
       };
     },
   };
   </script>
   