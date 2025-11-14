<template>
  <ReaderLayout>
    <div class="container mt-4">
      <RegisterForm @register="onRegister" />
    </div>
  </ReaderLayout>
</template>

<script>
import RegisterForm from "@/components/reader/RegisterForm.vue";
import ReaderLayout from "@/components/reader/ReaderLayout.vue";
import auth from "@/services/auth.service";

export default {
  name: "ReaderRegister",
  components: { ReaderLayout, RegisterForm },
  methods: {
    async onRegister(payload) {
      try {
        await auth.registerReader(payload);

        // ensure not logged in after register
        auth.logoutReader?.();

        this.$toast("Register successful!");
        this.$router.replace("/reader/login");

      } catch (e) {
        console.error(e);
        this.$toast(
          e?.response?.data?.message || e?.message || "Register failed",
          "error"
        );
      }
    },
  },
};
</script>
