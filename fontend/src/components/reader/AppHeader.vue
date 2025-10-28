<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/reader">MyLibrary</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navReader"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navReader">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <router-link class="nav-link" to="/reader">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reader/borrows">Borrow History</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reader/profile">Profile</router-link>
          </li>

          <!-- Nếu chưa đăng nhập -->
          <li class="nav-item ms-2" v-if="!isLoggedIn">
            <router-link class="btn btn-outline-light btn-sm" to="/reader/login">
              Login
            </router-link>
          </li>

          <!-- Nếu đã đăng nhập -->
          <li class="nav-item ms-2" v-else>
            <button class="btn btn-outline-light btn-sm" @click="handleLogout">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeaderReader",
  computed: {
    ...mapGetters("reader", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("reader", ["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/reader/login");
    },
  },
};
</script>
