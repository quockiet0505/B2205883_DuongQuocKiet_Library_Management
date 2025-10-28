<template>
     <div>
       <AppHeader />
       <StaffRegister />
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "../../components/admin/AppHeader.vue";
   import AppFooter from "../../components/admin/AppFooter.vue";
   import StaffRegister from "../../components/admin/StaffRegister.vue";
   export default {
     components: { AppHeader, AppFooter, StaffRegister },
   };
   </script>
   