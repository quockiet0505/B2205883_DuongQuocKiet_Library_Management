<template>
 
    <ReaderLayout />
    <div class="container mt-4">
      <RegisterForm :error="error" @register="onRegister" />
    </div>
    <ReaderLayout />

</template>

<style scoped>
.header-register {
  padding-top: 100px; 
}
</style>

<script>
import RegisterForm from "@/components/reader/RegisterForm.vue";
import ReaderLayout from "@/components/reader/ReaderLayout.vue";
import auth from "@/services/auth.service";

export default {
  name: "ReaderRegister",
  components: { ReaderLayout, RegisterForm },
  data() {
    return { error: "" };
  },
  methods: {
    async onRegister(payload) {
      this.error = "";
      try {
        await auth.registerReader(payload);
        // ensure not logged in after register
        auth.logoutReader?.();
        this.$router.replace("/reader/login");
      } catch (e) {
        console.error(e);
        this.error = e?.response?.data?.message || e?.message || "Register failed";
      }
    },
  },
};
</script>
