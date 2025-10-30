<template>
     <div class="container my-4">
       <h3 class="fw-bold mb-3"> Borrow Management</h3>
   
       <table class="table table-striped">
         <thead class="table-dark">
           <tr>
             <th>ID</th>
             <th>Reader</th>
             <th>Book</th>
             <th>Date Borrowed</th>
             <th>Status</th>
           </tr>
         </thead>
         <tbody>
           <tr v-for="b in borrows" :key="b.id">
             <td>{{ b.id }}</td>
             <td>{{ b.reader }}</td>
             <td>{{ b.book }}</td>
             <td>{{ b.date }}</td>
             <td>
               <span :class="['badge', b.returned ? 'bg-success' : 'bg-warning']">
                 {{ b.returned ? "Returned" : "Borrowing" }}
               </span>
             </td>
           </tr>
         </tbody>
       </table>
     </div>
   </template>
   
   <script>
   export default {
     name: "BorrowList",
     data() {
       return {
         borrows: [
           { id: 1, reader: "Nguyen Van A", book: "Vue.js Basics", date: "2025-10-01", returned: true },
           { id: 2, reader: "Tran Thi B", book: "Node.js Handbook", date: "2025-10-10", returned: false },
         ],
       };
     },
   };
   </script>
   