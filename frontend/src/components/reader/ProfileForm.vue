
<template>
     <div class="card p-4 shadow-sm">
       <h4 class="mb-3">Profile</h4>
       <form @submit.prevent="save">
         <div class="row">
           <div class="col-md-6 mb-3">
             <label class="form-label">First name</label>
             <input class="form-control" v-model="local.firstName" required />
           </div>
           <div class="col-md-6 mb-3">
             <label class="form-label">Last name</label>
             <input class="form-control" v-model="local.lastName" required />
           </div>
         </div>
   
         <div class="row">
           <div class="col-md-6 mb-3">
             <label class="form-label">Birth Date</label>
             <input type="date" class="form-control" v-model="local.birthDate" />
           </div>
           <div class="col-md-6 mb-3">
             <label class="form-label">Gender</label>
             <select class="form-select" v-model="local.gender">
               <option value="">Select</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               <option value="Other">Other</option>
             </select>
           </div>
         </div>
   
         <div class="mb-3">
           <label class="form-label">Phone</label>
           <input class="form-control" v-model="local.phone" />
         </div>
   
         <div class="mb-3">
           <label class="form-label">Address</label>
           <input class="form-control" v-model="local.address" />
         </div>
   
         <div class="mb-3">
           <label class="form-label">Email</label>
           <input type="email" class="form-control" v-model="local.email" disabled />
         </div>
   
         <button class="btn btn-success w-100">Save changes</button>
       </form>
     </div>
   </template>
   
   <script>
   export default {
     name: "ProfileForm",
     props: { reader: { type: Object, required: true } },
     data() { return { local: { ...this.reader } }; },
     watch: { reader(v) { this.local = { ...v }; } },
     methods: {
       save() { this.$emit("save", { ...this.local }); }
     },
   };
   </script>
   