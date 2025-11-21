<template>
     <ReaderLayout>
     <div class="container py-2">
       <h2 class="mb-2 fw-bold text-center">Liên hệ</h2>
   
       <div class="row justify-content-center">
         <div class="col-md-6">
   
           <div class="card shadow-sm p-4">
   
             <p class="mb-2"><i class="fas fa-map-marker-alt me-2"></i> 123 Đường 3/2, Ninh Kiều, TP. Cần Thơ</p>
             <p class="mb-2"><i class="fas fa-phone me-2"></i> 0123 456 789</p>
             <p class="mb-3"><i class="fas fa-envelope me-2"></i> support@mylibrary.com</p>
   
             <hr />
   
             <h6 class="fw-bold">Gửi phản hồi</h6>
   
             <form @submit.prevent="sendMessage">
               <div class="row">
                    <div class="col-md-6 mb-3">
                         <label class="form-label">Họ tên</label>
                         <input type="text" class="form-control" v-model="name" required />
                    </div>

                    <div class="col-md-6 mb-3">
                         <label class="form-label">Email</label>
                         <input type="email" class="form-control" v-model="email" required />   
                    </div>
               </div>
   
               <div class="mb-3">
                 <label class="form-label">Nội dung</label>
                 <textarea class="form-control" rows="4" v-model="message" required></textarea>
               </div>
   
               <button class="btn btn-success w-100">
                 Gửi phản hồi
               </button>
             </form>
   
           </div>
   
         </div>
       </div>
     </div>
</ReaderLayout>
   </template>
   
   <script>
   import ReaderLayout from "@/components/reader/ReaderLayout.vue";
   export default {
     name: "ContactPage",
     components: { ReaderLayout },
     data() {
       return {
         name: "",
         email: "",
         message: "",
       };
     },
     methods: {
       sendMessage() {
         alert("Cảm ơn bạn đã gửi phản hồi!");
         this.name = "";
         this.email = "";
         this.message = "";
       },
     },
   };
   </script>
   
   <style scoped>
   .card {
     border-radius: 12px;
     background-color: #fafafa;
   }
   </style>
   