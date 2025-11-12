<template>
     <div class="card p-3 shadow-sm">
       <h5 class="mb-3">{{ isEdit ? "Edit Book" : "Add New Book" }}</h5>
   
       <form @submit.prevent="handleSubmit">
         <div class="row g-3">
           <div class="col-md-6">
             <label class="form-label">Title</label>
             <input v-model="form.title" type="text" class="form-control" required />
           </div>
   
           <div class="col-md-6">
             <label class="form-label">Author</label>
             <input v-model="form.author" type="text" class="form-control" required />
           </div>
   
           <div class="col-md-6">
             <label class="form-label">Publisher</label>
             <select v-model="form.publisherId" class="form-select" required>
               <option disabled value="">-- Select Publisher --</option>
               <option v-for="p in publishers" :key="p._id" :value="p._id">
                 {{ p.name }}
               </option>
             </select>
           </div>
   
           <div class="col-md-3">
             <label class="form-label">Year</label>
             <input v-model.number="form.publishYear" type="number" class="form-control" />
           </div>
   
           <div class="col-md-3">
             <label class="form-label">Quantity</label>
             <input v-model.number="form.quantity" type="number" min="1" class="form-control" />
           </div>
   
           <div class="col-md-3">
             <label class="form-label">Price</label>
             <input v-model.number="form.price" type="number" min="0" class="form-control" />
           </div>
   
           <div class="col-md-12">
             <label class="form-label">Description</label>
             <textarea v-model="form.description" rows="2" class="form-control"></textarea>
           </div>
   
           <div class="col-md-12 text-end mt-3">
             <button type="submit" class="btn btn-success me-2">
               {{ isEdit ? "Save Changes" : "Add Book" }}
             </button>
             <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
           </div>
         </div>
       </form>
     </div>
   </template>
   
   <script>
   export default {
     name: "BookForm",
     props: {
       book: Object,
       publishers: Array,
     },
     data() {
       return {
         form: {
           title: "",
           author: "",
           publisherId: "",
           publishYear: "",
           quantity: 1,
           price: 0,
           description: "",
         },
       };
     },
     computed: {
       isEdit() {
         return !!this.book?._id;
       },
     },
     mounted() {
       if (this.book) Object.assign(this.form, this.book);
     },
     methods: {
       handleSubmit() {
         this.$emit("save", { ...this.form });
       },
     },
   };
   </script>
   
   <style scoped>
   .card {
     max-width: 800px;
     margin: 0 auto;
   }
   </style>
   