<template>
  <div class="profile-form card shadow-sm p-4">
    <h3 class="mb-4">Thông tin cá nhân</h3>

    <form @submit.prevent="handleSubmit">
      <div class="row g-3">

        <div class="col-md-6">
          <label class="form-label">Họ</label>
          <input v-model="form.lastName" type="text" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Tên</label>
          <input v-model="form.firstName" type="text" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" :value="reader.email"  />
        </div>

        <div class="col-md-6">
          <label class="form-label">Ngày sinh</label>
          <input v-model="form.birthDate" type="date" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Giới tính</label>
          <select v-model="form.gender" class="form-select">
            <option value="">-- Chọn --</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label">Số điện thoại</label>
          <input v-model="form.phone" type="text" class="form-control" />
        </div>

        <div class="col-md-12">
          <label class="form-label">Địa chỉ</label>
          <textarea v-model="form.address" class="form-control" rows="2"></textarea>
        </div>

        <!-- Đổi mật khẩu -->
        <div class="col-md-6">
          <label class="form-label">Mật khẩu mới</label>
          <input v-model="form.newPassword" type="password" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Xác nhận mật khẩu</label>
          <input v-model="form.confirmPassword" type="password" class="form-control" />
        </div>
      </div>

      <div class="mt-4">
        <button type="submit" class="btn btn-primary">Lưu thay đổi</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ProfileForm",
  props: {
    reader: { type: Object, required: true },
  },
  emits: ["update"],
  data() {
    return {
      form: {
        lastName: "",
        firstName: "",
        birthDate: "",
        gender: "",
        phone: "",
        address: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },

  watch: {
    reader: {
      handler(val) {
        this.form.lastName = val.lastName || "";
        this.form.firstName = val.firstName || "";
        this.form.birthDate = val.birthDate ? val.birthDate.split("T")[0] : "";
        this.form.gender = val.gender || "";
        this.form.phone = val.phone || "";
        this.form.address = val.address || "";
      },
      immediate: true,
    },
  },

  methods: {
    handleSubmit() {
      // Validation mật khẩu
      if (this.form.newPassword || this.form.confirmPassword) {
        if (this.form.newPassword !== this.form.confirmPassword) {
          this.$toast("Mật khẩu xác nhận không trùng khớp.", "error");
          return;
        }

        if (this.form.newPassword.length < 6) {
          this.$toast("Mật khẩu phải ít nhất 6 ký tự.", "error");
          return;
        }
      }

      // Payload
      const payload = {
        lastName: this.form.lastName,
        firstName: this.form.firstName,
        birthDate: this.form.birthDate || null,
        gender: this.form.gender || null,
        phone: this.form.phone || "",
        address: this.form.address || "",
      };

      if (this.form.newPassword) payload.password = this.form.newPassword;

      this.$emit("update", payload);
    },
  },
};
</script>

<style scoped>
.profile-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>
