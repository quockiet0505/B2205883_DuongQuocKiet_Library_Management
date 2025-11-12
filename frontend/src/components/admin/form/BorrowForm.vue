<template>
     <div class="card p-3 shadow-sm">
       <h5 class="mb-3">Create Borrow Record</h5>
   
       <form @submit.prevent="handleSubmit">
         <div class="row g-3">
           <div class="col-md-6">
             <label class="form-label">Reader</label>
             <select v-model="form.readerId" class="form-select" required>
               <option disabled value="">-- Select Reader --</option>
               <option v-for="r in readers" :key="r._id" :value="r._id">
                 {{ r.firstName }} {{ r.lastName }}
               </option>
             </select>
           </div>
   
           <div class="col-md-6">
             <label class="form-label">Book</label>
             <select v-model="form.bookId" class="form-select" required>
               <option disabled value="">-- Select Book --</option>
               <option v-for="b in books" :key="b._id" :value="b._id">
                 {{ b.title }}
               </option>
             </select>
           </div>
   
           <div class="col-md-3">
             <label class="form-label">Quantity</label>
             <input v-model.number="form.quantity" type="number" min="1" class="form-control" />
           </div>
   
           <div class="col-md-4">
             <label class="form-label">Borrow Date</label>
             <input v-model="form.borrowDate" type="date" class="form-control" required />
           </div>
   
           <div class="col-md-4">
             <label class="form-label">Return Date</label>
             <input v-model="form.returnDate" type="date" class="form-control" required />
           </div>
   
           <div class="col-12 text-end mt-3">
             <button type="submit" class="btn btn-success me-2">Add Borrow</button>
             <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
           </div>
         </div>
       </form>
     </div>
   </template>
   
   <script>
   export default {
     name: "BorrowForm",
     props: { books: Array, readers: Array },
     data() {
       const today = new Date().toISOString().split("T")[0];
       return {
         form: {
           readerId: "",
           bookId: "",
           quantity: 1,
           borrowDate: today,
           returnDate: today,
         },
       };
     },
     methods: {
       handleSubmit() {
         this.$emit("save", { ...this.form });
       },
     },
   };
   </script>
   