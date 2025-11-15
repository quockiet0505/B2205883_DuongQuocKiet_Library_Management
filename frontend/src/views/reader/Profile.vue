<template>
  <ReaderLayout>
    <div class="container mt-4">

      <ProfileForm
        v-if="readerInfo"
        :reader="readerInfo"
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
    };
  },

  async created() {
    const token = localStorage.getItem("readerToken"); //  Trả ra token JWT
    const id = localStorage.getItem("readerId");

    console.log("TOKEN:", token);
    console.log("READER ID:", id);

    if (!token || !id) {
      this.$toast("Bạn chưa đăng nhập!", "error");
      return;
    }

    this.readerId = id;

    try {
      const res = await readerService.getReaderById(id);

      console.log("API RES:", res);

      this.readerInfo = res.data || res;

      console.log("SET readerInfo:", this.readerInfo);

    } catch (e) {
      this.$toast(
        e.response?.data?.message || "Không thể tải thông tin người dùng.",
        "error"
      );
    }
  },

  methods: {
    async onSubmit(payload) {
      try {
        const res = await readerService.updateReader(this.readerId, payload);

        const updated = res.data || res;

        this.readerInfo = { ...this.readerInfo, ...updated };

        this.$toast("Cập nhật hồ sơ thành công!");
      } catch (e) {
        this.$toast(
          e.response?.data?.message || "Cập nhật hồ sơ thất bại!",
          "error"
        );
      }
    },
  },
};
</script>
