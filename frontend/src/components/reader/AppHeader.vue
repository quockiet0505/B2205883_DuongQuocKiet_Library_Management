<template>
  <div class="reader-header">
    <nav class="navbar navbar-expand-lg shadow-sm custom-navbar fixed-top">
      <div class="container">
        <!-- Logo với icon -->
        <router-link class="navbar-brand d-flex align-items-center fw-bold text-white" to="/reader">
          <img :src="Logo" alt="Logo" height="70" />
          <span class="ms-2 logo-text">Library LIBBRA</span>
        </router-link>

        <!-- Button collapse cho mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navReader"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Nội dung navbar -->
        <div class="collapse navbar-collapse" id="navReader">
          <!-- Thanh tìm kiếm -->
          <form class="d-flex mx-auto my-2 my-lg-0 search-form" @submit.prevent="submitSearch">
            <div class="input-group search-container">
              <input
                type="text"
                class="form-control search-input"
                placeholder="Tìm kiếm theo tiêu đề hoặc tác giả..."
                v-model="q"
                @input="emitQ"
              />
              <button type="submit" class="btn search-btn">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </form>

          <!-- Menu với icon -->
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/reader">
                <i class="fas fa-home me-1"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/reader/history">
                <i class="fas fa-history me-1"></i> Borrow History
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link d-flex align-items-center menu-link" to="/reader/profile">
                <i class="fas fa-user me-1"></i> Profile
              </router-link>
            </li>

            <li class="nav-item ms-2" v-if="!isLoggedIn">
              <router-link class="btn  btn-sm d-flex align-items-center menu-btn" to="/reader/login">
                <i class="fas fa-sign-in-alt me-1"></i> Login
              </router-link>
            </li>

            <li class="nav-item ms-2" v-else>
              <button class="btn  btn-sm d-flex align-items-center menu-btn" @click="handleLogout">
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
import { mapGetters, mapActions } from "vuex";
import Logo from '@/assets/logo/Logo.png';

export default {
  name: "AppHeaderReader",
  props: {
    modelValue: { type: String, default: "" },
  },
  data() {
    return { q: this.modelValue, Logo };
  },
  watch: {
    modelValue(v) { this.q = v; },
  },
  computed: { ...mapGetters("reader", ["isLoggedIn"]) },
  methods: {
    ...mapActions("reader", ["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/reader/login");
    },
    emitQ() { this.$emit("update:modelValue", this.q); },
    submitSearch() {
      this.emitQ();
      console.log("Search submitted:", this.q);
    },
  },
};
</script>

<style scoped>
/* Navbar background và height */
.custom-navbar {
  background-color: #E5E5CB;
  min-height: 70px;
}

/* Logo text */
.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2F855A;
}

/* Thanh search */
.search-form {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 550px;
}

.search-container {
  position: relative;
  height: 45px;
  border-radius: 8px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.search-input {
  border: none !important;
  border-radius: 8px 0 0 8px !important;
  padding: 0.5rem 1rem;
  height: 100%;
  font-size: 1.1rem;
}

.search-input:focus {
  outline: none;
  box-shadow: none;
}

.search-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  height: 100%;
  border-radius: 0 8px 8px 0;
  padding: 0 16px;
  font-size: 1.1rem;
  transition: background-color 0.2s;
  z-index: 10;
}

.search-btn:hover {
  background-color: #3375e7;
}

/* Menu */
.nav-link {
  color: black !important; 
  font-size: 1.1rem;
}

.nav-link:hover {
  color: #232423 !important; 
}

.menu-btn {
  font-size: 1.1rem;
}

/* keep existing styles and add these at the bottom */
.reader-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000; /* higher than any page content/backdrop */
  background: #fff; /* ensure header stays solid above content */
}

/* make sure header can receive clicks */
.reader-header, .reader-header * {
  pointer-events: auto;
}
</style>
