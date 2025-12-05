<template>
     <nav v-if="totalPages > 1">
       <ul class="pagination justify-content-center">
   
         <li class="page-item" :class="{ disabled: modelValue === 1 }">
           <button class="page-link" @click="changePage(modelValue - 1)">
             Previous
           </button>
         </li>
   
         <li
           v-for="p in totalPages"
           :key="p"
           class="page-item"
           :class="{ active: p === modelValue }"
         >
           <button class="page-link" @click="changePage(p)">
             {{ p }}
           </button>
         </li>
   
         <li class="page-item" :class="{ disabled: modelValue === totalPages }">
           <button class="page-link" @click="changePage(modelValue + 1)">
             Next
           </button>
         </li>
   
       </ul>
     </nav>
   </template>
   
   <script>
   export default {
     props: {
       modelValue: { type: Number, required: true }, // current page
       total: { type: Number, required: true },      // total items
       size: { type: Number, default: 25 },          // items per page
     },
   
     computed: {
       totalPages() {
         return Math.ceil(this.total / this.size);
       }
     },
   
     methods: {
       changePage(p) {
         if (p < 1 || p > this.totalPages) return;
         this.$emit("update:modelValue", p);
       }
     }
   };
   </script>
   