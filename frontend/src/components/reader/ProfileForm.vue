<template>
  <div class="profile-form card shadow-sm p-4">
    <h3 class="mb-4">Thông tin cá nhân</h3>
    <form @submit.prevent="handleSubmit">
      <div class="row g-3">
        <!-- <div class="col-md-6">
          <label class="form-label">Mã độc giả</label>
          <input type="text" class="form-control" :value="reader.readerId" disabled />
        </div> -->
        
        <div class="col-md-6">
          <label class="form-label">Họ</label>
          <input v-model="form.lastName" type="text" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">Tên</label>
          <input v-model="form.firstName" type="text" class="form-control" required />
        </div>

        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" :value="reader.email" required />
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
        lastName: this.reader.lastName || "",
        firstName: this.reader.firstName || "",
        birthDate: this.reader.birthDate ? this.reader.birthDate.split("T")[0] : "",
        gender: this.reader.gender || "",
        phone: this.reader.phone || "",
        address: this.reader.address || "",
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
      deep: true,
    },
  },
  methods: {
    handleSubmit() {
      // ✅ emit "update" với payload form ngay lần đầu
      this.$emit("update", { ...this.form });
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
