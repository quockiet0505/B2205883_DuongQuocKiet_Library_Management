<template>
  <div class="card p-3 shadow-sm">
    <h5 class="mb-3">{{ isEdit ? "Edit Staff" : "Add New Staff" }}</h5>

    <form @submit.prevent="handleSubmit">
      <div class="row g-3">

        <div class="col-md-6">
          <label class="form-label">Full Name</label>
          <input v-model="form.fullName" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input type="email" v-model="form.email" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Phone</label>
          <input v-model="form.phone" class="form-control" />
        </div>

        <div class="col-md-6">
          <label class="form-label">Address</label>
          <input v-model="form.address" class="form-control" />
        </div>

        <!-- Role -->
        <div class="col-md-6" v-if="showRoleField">
          <label class="form-label">Role</label>
          <select v-model="form.position" class="form-select">
            <option value="Staff">Staff</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div class="col-md-6"></div>

        <!-- PASSWORD WHEN CREATE -->
        <div class="col-md-6" v-if="!isEdit">
          <label class="form-label">Password</label>
          <input type="password" v-model="form.password" class="form-control" />
        </div>

        <div class="col-md-6" v-if="!isEdit">
          <label class="form-label">Confirm Password</label>
          <input type="password" v-model="form.confirmPassword" class="form-control" />
        </div>
       
        <div class="col-md-6" v-if="isEdit">
          <label class="form-label">New Password (optional)</label>
          <input type="password" v-model="form.newPassword" class="form-control" />
        </div>

        <div class="col-md-6" v-if="isEdit">
          <label class="form-label">Confirm New Password</label>
          <input type="password" v-model="form.newPasswordConfirm" class="form-control" />
        </div>

        <div class="col-12 text-end mt-3">
          <button type="submit" class="btn btn-success me-2">
            {{ isEdit ? "Save Changes" : "Add Staff" }}
          </button>
          <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
            Cancel
          </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "StaffForm",
  props: { staff: Object },

  data() {
    return {
      form: {
        fullName: "",
        email: "",
        phone: "",
        address: "",
        position: "Staff",
        password: "",
        confirmPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      },
    };
  },

  computed: {
    isEdit() {
      return !!this.staff?._id;
    },

    showRoleField() {
      if (!this.isEdit) return true;
      return this.staff?.position === "Admin";
    }
  },

  watch: {
    staff: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = {
            fullName: val.fullName || "",
            email: val.email || "",
            phone: val.phone || "",
            address: val.address || "",
            position: val.position || "Staff",
            password: "",
            confirmPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
          };
        }
      },
    },
  },

  methods: {
    handleSubmit() {
      const required = [
        ["fullName", "Full name is required"],
        ["email", "Email is required"],
        ["phone", "Phone is required"],
        ["address", "Address is required"],
      ];

      for (const [f, msg] of required) {
        if (!this.form[f]) return this.$toast(msg, "error");
      }

      // CREATE 
      if (!this.isEdit) {
        if (!this.form.password) return this.$toast("Password is required", "error");
        if (this.form.password.length < 6)
          return this.$toast("Password must be at least 6 characters", "error");
        if (this.form.password !== this.form.confirmPassword)
          return this.$toast("Passwords do not match", "error");
      }

      //  EDIT STAFF 
      if (this.isEdit && this.form.newPassword) {
        if (this.form.newPassword.length < 6)
          return this.$toast("New password must be at least 6 characters!", "error");

        if (this.form.newPassword !== this.form.newPasswordConfirm)
          return this.$toast("New passwords do not match!", "error");
      }

      const payload = {
        fullName: this.form.fullName,
        email: this.form.email,
        phone: this.form.phone,
        address: this.form.address,
        position: this.form.position,
      };

      // CREATE
      if (!this.isEdit) payload.password = this.form.password;

      //  EDIT 
      if (this.isEdit && this.form.newPassword) {
        payload.password = this.form.newPassword;
      }

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
