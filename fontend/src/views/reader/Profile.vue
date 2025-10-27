<!-- src/views/reader/Profile.vue -->
<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <ProfileForm v-if="profile" :reader="profile" @save="onSave" />
      <div v-else class="text-center py-5">Loading...</div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import ProfileForm from "@/components/reader/ProfileForm.vue";
import { useReaderStore } from "@/store/readerStore";

export default {
  name: "ReaderProfile",
  components: { AppHeader, AppFooter, ProfileForm },
  data() { return { profile: null }; },
  async created() {
    const store = useReaderStore();
    if (!store.isAuthenticated) { this.$router.push("/reader/login"); return; }
    await store.fetchProfile();
    this.profile = store.profile;
  },
  methods: {
    async onSave(payload) {
      const store = useReaderStore();
      await store.updateProfile(payload);
      alert("Profile updated");
      this.profile = store.profile;
    }
  }
};
</script>
