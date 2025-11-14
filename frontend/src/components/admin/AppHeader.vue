<template>
  <div class="admin-header">
    <nav class="navbar navbar-expand-lg shadow-sm custom-navbar fixed-top">
      <div class="container">
        <!-- Logo -->
        <router-link class="navbar-brand d-flex align-items-center fw-bold text-dark" to="/admin/dashboard">
          <img :src="Logo" alt="Logo" height="70" />
          <span class="ms-2 logo-text">Library LIBBRA</span>
        </router-link>

        <!-- Collapse button cho mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navAdmin"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nội dung navbar -->
        <div class="collapse navbar-collapse" id="navAdmin">
          <!-- Menu links -->
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/admin/dashboard">
                <i class="fas fa-tachometer-alt me-1"></i> Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/admin/book"
              >
                <i class="fas fa-book me-1"></i> Books
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/admin/reader">
                <i class="fas fa-user-graduate me-1"></i> Readers
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/admin/borrow">
                <i class="fas fa-history me-1"></i> Borrows
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/admin/publisher">
                <i class="fas fa-building me-1"></i> Publishers
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/admin/staff">
                <i class="fas fa-users-cog me-1"></i> Staffs
              </router-link>
            </li>

            <!-- Logout button -->
            <li class="nav-item ms-2">
              <button class="btn btn-sm d-flex align-items-center menu-btn" @click="handleLogout">
                <i class="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Logo from '@/assets/logo/Logo.png';

export default {
  name: "AppHeaderAdmin",
  data() {
    return { Logo };
  },
  methods: {
    ...mapActions("admin", ["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/admin/login");
    },
  },
};
</script>

<style scoped>
/* Navbar nền be + shadow nhẹ */
.custom-navbar {
  background-color: #E5E5CB; 
  min-height: 70px;
}

/* Logo text */
.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2F855A; /* xanh lá trầm */
}

/* Menu links */
.nav-link {
  color: black !important; 
  font-size: 1.1rem;
}

/* Logout button */
.menu-btn {
  font-size: 1.1rem;
  border-radius: 5px;
  padding: 0.3rem 0.8rem;
  transition: all 0.2s;
}


/* Header cố định */
.admin-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
}
</style>
