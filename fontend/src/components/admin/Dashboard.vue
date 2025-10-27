<template>
     <div class="container my-4">
       <h2 class="text-center fw-bold mb-4">Admin Dashboard</h2>
   
       <div class="row g-4">
         <div class="col-md-4" v-for="(card, index) in cards" :key="index">
           <div class="card shadow-sm text-center p-3">
             <h5 class="fw-bold">{{ card.title }}</h5>
             <p class="display-6 text-primary">{{ card.value }}</p>
           </div>
         </div>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     name: "AdminDashboard",
     data() {
       return {
         cards: [
           { title: "Total Books", value: 120 },
           { title: "Readers", value: 85 },
           { title: "Active Borrows", value: 34 },
         ],
       };
     },
   };
   </script>
   