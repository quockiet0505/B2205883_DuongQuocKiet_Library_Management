<template>
  <ReaderLayout>
    <div class="container mt-5">
      <div class="card p-4 mx-auto" style="max-width:420px">
        <h4 class="text-center mb-3">Reader Login</h4>
        <form @submit.prevent="onLogin">
          <div class="mb-3">
            <label for="email" class="mb-1">Email</label>
            <input v-model="email" type="email" class="form-control"  />
          </div>
          <div class="mb-3">
            <label for="password" class="mb-1">Password</label>
            <input v-model="password" type="password" class="form-control"  />
          </div>
          <button class="btn btn-success w-100" :disabled="submitting">
            {{ submitting ? "Logging in..." : "Login" }}
          </button>
        </form>

        <div v-if="error" class="alert alert-danger mt-3 small">{{ error }}</div>

        <p class="mt-3 text-center small">
          Don't have an account?
          <router-link to="/reader/register" class="no-underline">Register</router-link>
        </p>
      </div>
    </div>
  </ReaderLayout>
</template>

<script>
import ReaderLayout from "@/components/reader/ReaderLayout.vue";
import auth from "@/services/auth.service";

export default {
  name: "ReaderLogin",
  components: { ReaderLayout },
  data() {
    return { email: "", password: "", error: "", submitting: false };
  },
  methods: {
    async onLogin() {
      this.error = "";
      if (this.submitting) return;
      this.submitting = true;
      try {
        await auth.loginReader({ email: this.email.trim(), password: this.password });
        this.$router.push("/reader");
      } catch (e) {
        console.error(e);
        this.error = e?.response?.data?.message || e?.message || "Login failed";
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>


<style scoped>
  .no-underline {
  text-decoration: none !important;
}

</style>