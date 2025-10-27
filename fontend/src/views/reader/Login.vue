<!-- src/views/reader/Login.vue -->
<template>
  <div class="container mt-5">
    <div class="card p-4 mx-auto" style="max-width:420px">
      <h4 class="text-center mb-3">Reader Login</h4>
      <form @submit.prevent="onLogin">
        <div class="mb-3">
          <input v-model="email" type="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Password" required />
        </div>
        <button class="btn btn-primary w-100">Login</button>
      </form>
      <p class="mt-3 text-center small">Don't have an account? <router-link to="/reader/register">Register</router-link></p>
    </div>
  </div>
</template>

<script>
import { useReaderStore } from "@/store/readerStore";
export default {
  name: "ReaderLogin",
  data() { return { email: "", password: "" }; },
  methods: {
    async onLogin() {
      try {
        const store = useReaderStore();
        await store.login({ email: this.email, password: this.password });
        await store.fetchProfile();
        this.$router.push("/reader");
      } catch (e) {
        console.error(e);
        alert("Login failed");
      }
    }
  }
};
</script>
