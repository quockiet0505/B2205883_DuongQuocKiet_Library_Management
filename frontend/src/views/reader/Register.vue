
<template>
  <div class="header-register">
    <AppHeader />
    <div class="container mt-4">
      <RegisterForm @register="onRegister" />
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.header-register {
  padding-top: 100px; 
}
</style>

<script>
import RegisterForm from "@/components/reader/RegisterForm.vue";
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import { mapActions } from "vuex";

export default {
  name: "ReaderRegister",
  components: { AppHeader, AppFooter, RegisterForm },
  methods: {
    ...mapActions("reader", ["register"]),
    async onRegister(payload) {
      try {
        await this.register(payload);
        alert("Register successful! Please login.");
        this.$router.push("/reader/login");
      } catch (e) {
        console.error(e);
        alert("Register failed: " + (e.response?.data?.message || e.message));
      }
    },
  },
};
</script>
