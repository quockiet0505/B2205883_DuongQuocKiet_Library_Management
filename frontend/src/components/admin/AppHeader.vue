<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold" to="/admin/dashboard">Admin Panel</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><router-link to="/admin/dashboard" class="nav-link">Dashboard</router-link></li>
          <li class="nav-item"><router-link to="/admin/books" class="nav-link">Books</router-link></li>
          <li class="nav-item"><router-link to="/admin/readers" class="nav-link">Readers</router-link></li>
          <li class="nav-item"><router-link to="/admin/borrows" class="nav-link">Borrows</router-link></li>
          <li class="nav-item"><router-link to="/admin/publishers" class="nav-link">Publishers</router-link></li>
          <li class="nav-item"><router-link to="/admin/staffs" class="nav-link">Staffs</router-link></li>
        </ul>

        <div class="d-flex align-items-center text-white">
          <span class="me-3">Welcome, Admin</span>
          <button class="btn btn-outline-light btn-sm" @click="handleLogout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppHeaderAdmin",
  computed: {
    ...mapGetters("admin", ["isAuthenticated"]),
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
