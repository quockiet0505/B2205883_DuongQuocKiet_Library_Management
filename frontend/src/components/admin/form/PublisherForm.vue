<template>
     <div class="card p-3 shadow-sm">
       <h5 class="mb-3">{{ isEdit ? "Edit Publisher" : "Add New Publisher" }}</h5>
   
       <form @submit.prevent="handleSubmit">
         <div class="row g-3">
           <div class="col-md-6">
             <label class="form-label">Name</label>
             <input v-model="form.name" type="text" class="form-control" required />
           </div>
   
           <div class="col-md-6">
             <label class="form-label">Address</label>
             <input v-model="form.address" type="text" class="form-control" />
           </div>
   
           <div class="col-12 text-end">
             <button type="submit" class="btn btn-success me-2">
               {{ isEdit ? "Save Changes" : "Add Publisher" }}
             </button>
             <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
           </div>
         </div>
       </form>
     </div>
   </template>
   
   <script>
   export default {
     name: "PublisherForm",
     props: { publisher: Object },
     data() {
       return {
         form: { name: "", address: "" },
       };
     },
     computed: {
       isEdit() {
         return !!this.publisher?._id;
       },
     },
     mounted() {
       if (this.publisher) Object.assign(this.form, this.publisher);
     },
     methods: {
       handleSubmit() {
         this.$emit("save", { ...this.form });
       },
     },
   };
   </script>
   