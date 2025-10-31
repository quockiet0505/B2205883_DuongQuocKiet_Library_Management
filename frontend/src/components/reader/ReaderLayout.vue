<template>
     <div class="reader-layout">
       <!-- Header có thanh tìm kiếm -->
       <AppHeader v-model="query" />
   
       <main class="content">
         <slot /> 
       </main>
   
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "@/components/reader/AppHeader.vue";
   import AppFooter from "@/components/reader/AppFooter.vue";
   
   export default {
     name: "ReaderLayout",
     components: { AppHeader, AppFooter },
     props: {
       modelValue: { type: String, default: "" },
     },
     data() {
       return { query: this.modelValue };
     },
     watch: {
       query(val) {
         this.$emit("update:modelValue", val); // emit lên ReaderHome
       },
       modelValue(val) {
         this.query = val; // cập nhật khi parent thay đổi
       },
     },
   };
   </script>
   
   <style scoped>
   .reader-layout {
     min-height: 100vh;
     display: flex;
     flex-direction: column;
     padding-top: 100px;
   }
   .content {
     flex: 1 0 auto;
     padding: 20px;
   }
   </style>
   