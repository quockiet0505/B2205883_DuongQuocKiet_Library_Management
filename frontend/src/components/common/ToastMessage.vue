<template>
     <div
       v-if="state.show"
       class="position-fixed bottom-0 end-0 m-4 p-3 rounded shadow text-white"
       :class="state.type === 'success' ? 'bg-success' : 'bg-danger'"
       style="z-index: 2000;"
     >
       {{ state.message }}
     </div>
   </template>
   
   <script>
   import { inject } from "vue";
   import { computed } from "vue";
   
   export default {
     setup() {
       const state = inject("toastState");
       return { state };
     }
   };
   </script>
   