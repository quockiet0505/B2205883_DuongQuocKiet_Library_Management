<template>
  <div class="card p-3 shadow-sm">
    <h5 class="mb-3">{{ isEdit ? "Edit Reader" : "Add New Reader" }}</h5>

    <form @submit.prevent="handleSubmit">
      <div class="row g-3">

        <div class="col-md-6">
          <label class="form-label">First Name</label>
          <input v-model="form.firstName" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Last Name</label>
          <input v-model="form.lastName" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Phone</label>
          <input v-model="form.phone" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Birth Date</label>
          <input v-model="form.birthDate" type="date" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Gender</label>
          <select v-model="form.gender" class="form-select">
            <option value="">Select…</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div class="col-md-12">
          <label class="form-label">Address</label>
          <textarea v-model="form.address" rows="2" class="form-control"></textarea>
        </div>

        <div class="col-md-6" v-if="!isEdit">
          <label class="form-label">Password</label>
          <input type="password" v-model="form.password" class="form-control" />
        </div>

        <div class="col-md-6" v-if="!isEdit">
          <label class="form-label">Confirm Password</label>
          <input type="password" v-model="form.confirmPassword" class="form-control" />
        </div>

        <div class="col-md-12 text-end mt-3">
          <button class="btn btn-success me-2">
            {{ isEdit ? "Save Changes" : "Add Reader" }}
          </button>
          <button class="btn btn-secondary" type="button" @click="$emit('cancel')">
            Cancel
          </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ReaderForm",
  props: { reader: Object },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        gender: "",
        address: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    isEdit() {
      return !!this.reader?._id;
    },
  },
  watch: {
    reader: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = {
            firstName: val.firstName || "",
            lastName: val.lastName || "",
            email: val.email || "",
            phone: val.phone || "",
            birthDate: val.birthDate ? val.birthDate.slice(0, 10) : "",
            gender: val.gender || "",
            address: val.address || "",
            password: "",
            confirmPassword: "",
          };
        }
      },
    },
  },
  methods: {
    handleSubmit() {
      const required = [
        ["firstName", "First name is required"],
        ["lastName", "Last name is required"],
        ["email", "Email is required"],
        ["phone", "Phone is required"],
        ["birthDate", "Birth date is required"],
        ["gender", "Gender is required"],
        ["address", "Address is required"],
      ];

      for (const [field, msg] of required) {
        if (!this.form[field]?.toString().trim()) {
          this.$toast(msg, "error");
          return;
        }
      }

      if (!this.isEdit) {
        if (!this.form.password) return this.$toast("Password is required", "error");
        if (this.form.password.length < 6) return this.$toast("Password must be at least 6 characters!", "error");
        if (this.form.password !== this.form.confirmPassword)
          return this.$toast("Passwords do not match!", "error");
      }

      const payload = { ...this.form };
      delete payload.confirmPassword;
      if (this.isEdit) delete payload.password;

      this.$emit("save", payload);
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 800px;
  margin: 0 auto;
}
</style>
