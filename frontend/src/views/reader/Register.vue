
<template>
  <div class="container mt-4">
    <RegisterForm @register="onRegister" />
  </div>
</template>

<script>
import RegisterForm from "@/components/reader/RegisterForm.vue";
import { mapActions } from "vuex";

export default {
  name: "ReaderRegister",
  components: { RegisterForm },
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
