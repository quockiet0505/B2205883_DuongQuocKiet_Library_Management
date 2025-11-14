<template>
     <div class="modal fade" tabindex="-1" ref="modal">
       <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
   
           <div class="modal-header">
             <h5 class="modal-title">Confirm</h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
           </div>
   
           <div class="modal-body">
             <p>{{ message }}</p>
           </div>
   
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
               Cancel
             </button>
             <button type="button" class="btn btn-danger" @click="confirm">
               Yes, continue
             </button>
           </div>
   
         </div>
       </div>
     </div>
   </template>
   
   <script>
   import { Modal } from "bootstrap";   // ✔ IMPORT ĐÚNG
   
   export default {
     name: "ConfirmModal",
   
     data() {
       return {
         message: "",
         onConfirm: null,
         modalInstance: null,
       };
     },
   
     mounted() {
       this.modalInstance = new Modal(this.$refs.modal); // ✔ Dùng Modal class
     },
   
     methods: {
       open(message = "Are you sure?", callback = null) {
         this.message = message;
         this.onConfirm = callback;
         this.modalInstance.show();
       },
   
       confirm() {
         if (this.onConfirm) this.onConfirm();
         this.modalInstance.hide();
       }
     }
   };
   </script>
   