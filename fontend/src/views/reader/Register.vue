<!-- src/views/reader/Register.vue -->
<template>
  <div class="container mt-4">
    <RegisterForm @register="onRegister" />
  </div>
</template>

<script>
import RegisterForm from "@/components/reader/RegisterForm.vue";
import { useReaderStore } from "@/store/readerStore";

export default {
  name: "ReaderRegister",
  components: { RegisterForm },
  methods: {
    async onRegister(payload) {
      try {
        const store = useReaderStore();
        await store.register(payload);
        alert("Register successful. Please login.");
        this.$router.push("/reader/login");
      } catch (e) {
        console.error(e);
        alert("Register failed: " + (e.response?.data?.message || e.message));
      }
    }
  }
};
</script>
