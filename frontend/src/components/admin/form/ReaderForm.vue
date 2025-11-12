<template>
     <div class="card p-3 shadow-sm">
       <h5 class="mb-3">{{ isEdit ? "Edit Reader" : "Add New Reader" }}</h5>
   
       <form @submit.prevent="handleSubmit">
         <div class="row g-3">
           <div class="col-md-6">
             <label class="form-label">First Name</label>
             <input v-model="form.firstName" class="form-control" required />
           </div>
   
           <div class="col-md-6">
             <label class="form-label">Last Name</label>
             <input v-model="form.lastName" class="form-control" required />
           </div>
   
           <div class="col-md-6">
             <label class="form-label">Email</label>
             <input v-model="form.email" type="email" class="form-control" required />
           </div>
   
           <div class="col-md-6">
             <label class="form-label">Phone</label>
             <input v-model="form.phone" class="form-control" />
           </div>
   
           <div class="col-md-6">
             <label class="form-label">Birth Date</label>
             <input v-model="form.birthDate" type="date" class="form-control" />
           </div>
   
           <div class="col-md-6" v-if="!isEdit">
             <label class="form-label">Password</label>
             <input v-model="form.password" type="password" class="form-control" required />
           </div>
   
           <div class="col-12 text-end mt-3">
             <button type="submit" class="btn btn-success me-2">{{ isEdit ? "Save" : "Add" }}</button>
             <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
           </div>
         </div>
       </form>
     </div>
   </template>
   
   <script>
   export default {
     name: "ReaderForm",
     props: { reader: Object },
     data() {
       return {
         form: { firstName: "", lastName: "", email: "", phone: "", birthDate: "", password: "" },
       };
     },
     computed: {
       isEdit() {
         return !!this.reader?._id;
       },
     },
     mounted() {
       if (this.reader) Object.assign(this.form, this.reader);
     },
     methods: {
       handleSubmit() {
         this.$emit("save", { ...this.form });
       },
     },
   };
   </script>
   