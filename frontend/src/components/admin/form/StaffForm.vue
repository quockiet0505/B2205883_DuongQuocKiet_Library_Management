<template>
     <div class="card p-3 shadow">
          <h5 class="mb-3">
               {{ isEdit ? "Edit Staff" : "Add New Staff" }}
          </h5>

          <form  @submit.prevent="handleSubmit">
               <div class="row g-3">
                    <div class="col-md-6">
                         <label for="form-label">FullName</label>
                         <input v-model="form.fullName" type="text" class="form-control" required />
                    </div>

                   <div class="col-md-6">
                         <label for="form-label">Email</label>
                         <input v-model="form.email" type="email" class="form-control" required />
                   </div>

                   <div class="col-md-6">
                         <label for="form-label">Password</label>
                         <input v-model="form.password" type="password" class="form-control" required />
                   </div>

                   <div class="col-md-6">
                         <label for="form-label">Phone</label>
                         <input v-model="form.phone" type="text" class="form-control" required />
                   </div>

                   <div class="col-md-6">
                         <label for="form-label">Address</label>
                         <input v-model="form.address" type="text" class="form-control" required />
                   </div>

                    <div class="col-md-6">
                          <label for="form-label">Role</label>
                          <select v-model="form.position" class="form-select" required>
                                <option value="Staff">Staff</option>
                                <option value="Admin">Admin</option>
                          </select>
                    </div>

                    <div class="cl-md-6" v-if= '!isEdit'>
                         <label for="form-label">Password</label>
                         <input v-model="form.password" type="password" class="form-control" required />
                    </div>

                    <div class="col-12 text-end mt-3">
                         <button type="submit" class="btn btn-success me-2">{{ isEdit ?"Save" :"Add" }}</button>
                         <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
                    </div>
               </div>
          </form>
     </div>
</template>

<script>
     export default{
          name: "StaffForm",
          props: { staff: Object },
          data(){
               return {
                    form: { fullName: "", email: "", phone: "", position: "Staff", password: "" },
               };
          },

          computed:{
               isEdit(){
                    return !!this.staff?._id;
               }
          },

          mounted(){
               if(this.staff) Object.assign(this.form, this.staff);
          },

          methods:{
               handleSubmit(){
                    this.$emit("save", { ...this.form });
               }
          }    
     }
</script>