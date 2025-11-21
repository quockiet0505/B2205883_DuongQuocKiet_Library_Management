<template>
     <ReaderLayout>
       <div class="container py-5">
         <h2 class="mb-4 fw-bold text-center">Giới thiệu về MyLibrary</h2>
   
         <div class="card shadow-sm p-4">
           <p class="mb-3">
             MyLibrary là hệ thống quản lý thư viện được xây dựng nhằm hỗ trợ độc giả trong việc tìm kiếm,
             mượn và theo dõi sách một cách nhanh chóng và tiện lợi.
           </p>
   
           <p class="mb-3">
             Với giao diện thân thiện và chức năng hiện đại, MyLibrary giúp tối ưu hóa công việc quản lý
             của thư viện, giảm tải cho nhân viên và mang lại trải nghiệm tốt nhất cho người dùng.
           </p>
   
           <ul>
             <li>📚 Tra cứu sách theo tên, tác giả, nhà xuất bản</li>
             <li>🧾 Đăng ký mượn và theo dõi lịch sử mượn sách</li>
             <li>🔄 Cập nhật thông tin sách nhanh chóng</li>
             <li>👤 Quản lý độc giả và nhân viên thư viện</li>
           </ul>
   
           <p class="mt-3 fw-bold">
             Mục tiêu của chúng tôi là tạo ra một hệ thống thư viện hiện đại, dễ sử dụng và hiệu quả.
           </p>
         </div>
       </div>
     </ReaderLayout>
   </template>
   
   <script>
   import ReaderLayout from "@/components/reader/ReaderLayout.vue";
   
   export default {
     name: "AboutPage",
     components: { ReaderLayout },
   };
   </script>
   
   <style scoped>
   .card {
     background-color: #fafafa;
     border-radius: 12px;
   }
   </style>
   