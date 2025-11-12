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
    const id = authService.getReaderId(); // Lấy _id MongoDB

    if (!token || !id) {
      this.error = "Bạn chưa đăng nhập hoặc thiếu thông tin người dùng.";
      return;
    }

    this.readerId = id;

    try {
      this.readerInfo = await readerService.getReaderById(id);
    } catch (e) {
      this.error =
        e.response?.data?.message || e.message || "Không thể tải thông tin người dùng.";
    }
  },
  methods: {
    async onSubmit(payload) {
        try {
          const res = await readerService.updateReader(this.readerId, payload);
          //Lấy ra reader từ response
          const updated = res.reader || res.data || res;
          this.readerInfo = { ...this.readerInfo, ...updated };
          alert("Cập nhật hồ sơ thành công!");
        } catch (e) {
          console.error("Update error:", e);
          alert(e.response?.data?.message || "Cập nhật hồ sơ thất bại!");
        }
      }

  },
};
</script>
