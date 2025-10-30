<template>
     <div>
       <AppHeader />
       <PublisherList />
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "../../components/admin/AppHeader.vue";
   import AppFooter from "../../components/admin/AppFooter.vue";
   import PublisherList from "../../components/admin/PublisherList.vue";
   export default {
     components: { AppHeader, AppFooter, PublisherList },
   };
   </script>
   