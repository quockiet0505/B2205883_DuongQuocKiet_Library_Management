
<template>
     <div v-if="book" class="card p-4 shadow-sm">
       <div class="row g-3">
         <div class="col-md-4 text-center">
           <img :src="book.thumbnail || defaultImage" class="img-fluid rounded" style="max-height:300px;object-fit:cover" />
         </div>
         <div class="col-md-8">
           <h4 class="fw-bold">{{ book.title }}</h4>
           <p><b>Author:</b> {{ book.author }}</p>
           <p><b>Publisher:</b> {{ book.publisherId?.name || '-' }}</p>
           <p><b>Year:</b> {{ book.publishYear || '-' }}</p>
           <p><b>Price:</b> {{ formatPrice(book.price) }}</p>
           <p><b>Quantity:</b> {{ book.quantity }}</p>
           <div class="mt-3">
             <button class="btn btn-primary me-2" @click="$emit('borrow')">Borrow Book</button>
             <router-link class="btn btn-outline-secondary" :to="{ name: 'reader-home' }">Back to Home</router-link>
           </div>
         </div>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     name: "BookDetailCard",
     props: { book: { type: Object, required: true } },
     data() { return { defaultImage: "/assets/images/book-placeholder.png" }; },
     methods: { formatPrice(v) { if (v == null) return "-"; return new Intl.NumberFormat().format(v) + "₫"; } },
   };
   </script>
   