
<template>
     <div class="mb-3">
       <div class="input-group">
         <span class="input-group-text">🔎</span>
         <input type="text" class="form-control" placeholder="Search title or author..." v-model="q" @input="emitQ" />
       </div>
     </div>
   </template>
   
   <script>
   export default {
     name: "InputSearch",
     props: { modelValue: { type: String, default: "" } },
     data() { return { q: this.modelValue }; },
     watch: { modelValue(v) { this.q = v; } },
     methods: { emitQ() { this.$emit("update:modelValue", this.q); } },
   };
   </script>
   