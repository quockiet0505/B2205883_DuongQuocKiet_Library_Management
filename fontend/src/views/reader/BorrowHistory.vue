<!-- src/views/reader/BorrowHistory.vue -->
<template>
     <div>
       <AppHeader />
       <div class="container mt-4">
         <BorrowHistoryList :borrows="borrows" />
       </div>
       <AppFooter />
     </div>
   </template>
   
   <script>
   import AppHeader from "@/components/reader/AppHeader.vue";
   import AppFooter from "@/components/reader/AppFooter.vue";
   import BorrowHistoryList from "@/components/reader/BorrowHistoryList.vue";
   import { useBorrowStore } from "@/store/borrowStore";
   import { useReaderStore } from "@/store/readerStore";
   
   export default {
     name: "ReaderBorrowHistory",
     components: { AppHeader, AppFooter, BorrowHistoryList },
     data() { return { borrows: [] }; },
     async created() {
       const readerStore = useReaderStore();
       if (!readerStore.isAuthenticated) { this.$router.push("/reader/login"); return; }
       const borrowStore = useBorrowStore();
       await borrowStore.loadAll();
       // optionally filter by readerId if endpoint returns all
       const id = readerStore.getIdFromToken();
       this.borrows = borrowStore.borrows.filter(b => !b.readerId || b.readerId === id || (b.readerId?._id === id));
     }
   };
   </script>
   