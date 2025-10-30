<template>
  <div class="reader-login">
    <AppHeader />
    <div class="content">
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
          <p class="mt-3 text-center small">
            Don't have an account?
            <router-link to="/reader/register">Register</router-link>
          </p>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.reader-login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 100px; /* hoặc 80px tùy chiều cao header */
}
.content {
  flex: 1 0 auto;
}
</style>

<script>

import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import { mapActions } from "vuex";

export default {
  name: "ReaderLogin",
  components: { AppHeader, AppFooter },
  data() {
    return { email: "", password: "" };
  },
  methods: {
    ...mapActions("reader", ["login"]),
    async onLogin() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push("/reader");
      } catch (e) {
        console.error(e);
        alert("Login failed");
      }
    },
  },
};
</script>
