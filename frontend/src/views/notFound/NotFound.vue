<template>
     <div class="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
       <h1 class="display-4 text-danger">404</h1>
       <p class="lead mb-4">Oops! The page you’re looking for doesn’t exist.</p>
       <router-link to="/" class="btn btn-primary">Go Home</router-link>
     </div>
   </template>
   
   <script>
   export default {
     name: "NotFound",
   };
   </script>
   
   <style scoped>
   .display-4 {
     font-size: 6rem;
     font-weight: bold;
   }
   </style>
   