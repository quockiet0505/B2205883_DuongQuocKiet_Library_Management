
<template>
     <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
       <div class="container">
         <router-link class="navbar-brand fw-bold" to="/reader">📚 MyLibrary</router-link>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navReader">
           <span class="navbar-toggler-icon"></span>
         </button>
   
         <div class="collapse navbar-collapse" id="navReader">
           <ul class="navbar-nav ms-auto align-items-center">
             <li class="nav-item"><router-link class="nav-link" to="/reader">Home</router-link></li>
             <li class="nav-item"><router-link class="nav-link" to="/reader/borrows">Borrow History</router-link></li>
             <li class="nav-item"><router-link class="nav-link" to="/reader/profile">Profile</router-link></li>
             <li class="nav-item ms-2" v-if="!isAuth">
               <router-link class="btn btn-outline-light btn-sm" to="/reader/login">Login</router-link>
             </li>
             <li class="nav-item ms-2" v-else>
               <button class="btn btn-outline-light btn-sm" @click="logout">Logout</button>
             </li>
           </ul>
         </div>
       </div>
     </nav>
   </template>
   
   <script>
   import { useReaderStore } from "@/store/readerStore";
   export default {
     name: "AppHeaderReader",
     setup() {
       const store = useReaderStore();
       function logout() {
         store.logout();
         
         window.location.href = "/reader/login";
       }
       return { isAuth: store.isAuthenticated, logout };
     },
   };
   </script>
   