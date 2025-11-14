<template>
     <div id="app">
       <router-view />
       <ToastMessage />
     </div>
   </template>
   
   <script>
   import ToastMessage from "@/components/common/ToastMessage.vue";
   export default {
     name: "App",
     components: { ToastMessage }
   };
   
   </script>
   
   <style>
   @import "bootstrap/dist/css/bootstrap.min.css";
   @import "bootstrap-icons/font/bootstrap-icons.css";

   
   
   body {
     background-color: #f8f9fa;
     font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
     margin: 0;
     padding: 0;
   }
   
  
   #app {
     min-height: 100vh;
     display: flex;
     flex-direction: column;
   }
   </style>
   