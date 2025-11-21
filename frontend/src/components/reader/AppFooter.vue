<template>
  <footer class="footer text-center py-4 mt-5">
    <div class="container">

      <!-- Thông tin liên hệ -->
      <div class="row text-start mb-3">
        <div class="col-md-4 mb-3">
          <h6 class="fw-bold">Liên hệ</h6>
          <router-link to="/reader/contact" class="text-dark fw-bold d-block mt-1">Trang liên hệ</router-link>
          <p class="mb-1">📍 123 Đường ABC, Quận X, TP.HCM</p>
          <p class="mb-1">📞 0123 456 789</p>
          <p class="mb-1">✉️ support@mylibrary.com</p>
        </div>

        <div class="col-md-4 mb-3">
          <h6 class="fw-bold">Giới thiệu</h6>
          <router-link to="/reader/about" class="text-dark fw-bold d-block mt-1">Xem chi tiết</router-link>
          <p class="mb-1">Hệ thống quản lý thư viện hỗ trợ độc giả tra cứu và mượn sách dễ dàng.</p>
        </div>

        <div class="col-md-4 mb-3">
          <h6 class="fw-bold">Mạng xã hội</h6>
          <div class="social-icons">
            <a href="#" class="social-link me-3"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-link me-3"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link me-3"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <small class="fw-bold text-dark">
        © 2025 MyLibrary — Library Management
      </small>

    </div>
  </footer>
</template>

<script>
export default { name: "AppFooterReader" };
</script>

<style scoped>
.footer {
  background-color: #E5E5CB;
}

.social-link {
  font-size: 1.4rem;
  text-decoration: none;
  color: #000;
  transition: 0.3s;
}

.social-link:hover {
  opacity: 0.6;
}
</style>
