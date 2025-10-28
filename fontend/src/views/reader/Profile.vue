
<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <ProfileForm v-if="readerInfo" :reader="readerInfo" @save="onSave" />
      <div v-else class="text-center py-5">Loading...</div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import ProfileForm from "@/components/reader/ProfileForm.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReaderProfile",
  components: { AppHeader, AppFooter, ProfileForm },
  computed: {
    ...mapGetters("reader", ["isLoggedIn", "readerInfo"]),
  },
  async created() {
    if (!this.isLoggedIn) {
      this.$router.push("/reader/login");
      return;
    }
    await this.fetchProfile();
  },
  methods: {
    ...mapActions("reader", ["fetchProfile", "updateProfile"]),
    async onSave(payload) {
      await this.updateProfile(payload);
      alert("Profile updated");
    },
  },
};
</script>
