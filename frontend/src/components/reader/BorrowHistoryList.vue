
<template>
     <div>
       <h4 class="mb-3">Borrow History</h4>
       <div v-if="!borrows || borrows.length === 0" class="text-muted">No borrow history.</div>
       <div v-else class="table-responsive">
         <table class="table table-hover align-middle">
           <thead class="table-dark">
             <tr>
               <th>Book</th>
               <th>Borrow Date</th>
               <th>Return Date</th>
               <th>Qty</th>
               <th>Status</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="b in borrows" :key="b._id">
               <td>{{ b.bookId?.title || "—" }}</td>
               <td>{{ format(b.borrowDate) }}</td>
               <td>{{ format(b.returnDate) }}</td>
               <td>{{ b.quantity }}</td>
               <td><span :class="statusClass(b.status)">{{ b.status }}</span></td>
             </tr>
           </tbody>
         </table>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     name: "BorrowHistoryList",
     props: { borrows: { type: Array, default: () => [] } },
     methods: {
       format(d) { if (!d) return "-"; return new Date(d).toLocaleDateString(); },
       statusClass(s) {
         switch (s) {
           case "processing": return "badge bg-warning text-dark";
           case "accepted": return "badge bg-success";
           case "refused": return "badge bg-danger";
           case "returned": return "badge bg-secondary";
           default: return "badge bg-light text-dark";
         }
       },
     },
   };
   </script>
   