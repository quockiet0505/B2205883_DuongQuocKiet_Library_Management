<template>
     <div>
       <AppHeader />
       <StaffList />
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "../../components/admin/AppHeader.vue";
   import AppFooter from "../../components/admin/AppFooter.vue";
   import StaffList from "../../components/admin/StaffList.vue";
   export default {
     components: { AppHeader, AppFooter, StaffList },
   };
   </script>
   