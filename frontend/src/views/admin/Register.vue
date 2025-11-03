<template>
     <div>
       <div >
       <StaffRegister />
       </div>AdminLayout >
     </div>
   </template>
   
   <script>
   import AdminLayout from "../../components/admin/AdminLayout.vue";
   import StaffRegister from "../../components/admin/StaffRegister.vue";
   export default {
     components: {AdminLayout, StaffRegister },
   };
   </script>
   