<template>
     <div class="mb-3">
       <input
         type="text"
         v-model="modelValue"
         @input="$emit('update:modelValue', modelValue)"
         class="form-control"
         placeholder=" Search..."
       />
     </div>
   </template>
   
   <script>
   export default {
     name: "InputSearch",
     props: ["modelValue"],
   };
   </script>
   