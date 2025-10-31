<template>
  <ReaderLayout>
    <div class="container mt-4">
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <ProfileForm
        v-else-if="readerInfo"
        :reader="readerInfo"
        @save="onSubmit"
        @update="onSubmit"
      />
      <div v-else class="text-center py-5">Loading...</div>
    </div>
  </ReaderLayout>
</template>

<script>
import ReaderLayout from "@/components/reader/ReaderLayout.vue";
import ProfileForm from "@/components/reader/ProfileForm.vue";
import readerService from "@/services/reader.service";
import authService from "@/services/auth.service";

export default {
  name: "ReaderProfile",
  components: { ReaderLayout, ProfileForm },
  data() {
    return {
      readerInfo: null,
      readerId: null,
      error: null,
    };
  },
  async created() {
    const token = authService.getReaderToken();
    const id = authService.getReaderId();
    
    console.log("[Profile] token:", token, "| readerId:", id);

    if (!token || !id) {
      console.warn("[Profile] Missing token or readerId");
      this.error = "Not logged in or missing reader ID";
      return;
    }
    this.readerId = id;
    try {
      this.readerInfo = await readerService.getReaderById(id);
      console.log("[Profile] Loaded readerInfo:", this.readerInfo);
    } catch (e) {
      console.error("[Profile] Error loading reader:", e);
      this.error = e.response?.data?.message || e.message || "Failed to load profile";
    }
  },
  methods: {
    async onSubmit(payload) {
      try {
        const updated = await readerService.updateReader(this.readerId, payload);
        const next = updated?.reader || updated;
        this.readerInfo = { ...this.readerInfo, ...next };
        alert("Profile updated");
      } catch (e) {
        console.error("[Profile] Update error:", e);
        alert("Failed to update profile");
      }
    },
  },
};
</script>
