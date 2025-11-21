<template>
  <div class="card p-4 shadow-sm mx-auto" style="max-width:700px;">
    <h4 class="mb-3 text-center">Reader Register</h4>
    <form @submit.prevent="onSubmit">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">First name</label>
          <input class="form-control" v-model="form.firstName"  />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Last name</label>
          <input class="form-control" v-model="form.lastName"  />
        </div>
      </div>

      <div class="row">
        <div class="mb-3 col-md-6">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" v-model="form.email"  />
        </div>

        <div class="mb-3 col-md-6">
          <label class="form-label">Phone</label>
          <input class="form-control" v-model="form.phone" />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Birth date</label>
          <input type="date" class="form-control" v-model="form.birthDate" />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Gender</label>
          <select class="form-select" v-model="form.gender">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Address</label>
        <input class="form-control" v-model="form.address" />
      </div>

      

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" v-model="form.password"  />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Confirm password</label>
          <input type="password" class="form-control" v-model="form.confirmPassword"  />
        </div>
      </div>


      <button class="btn btn-success w-100 ">Register</button>
      <p class="mt-3 text-center small">
          Don't have an account?
          <router-link to="/reader/login" class="no-underline">Register</router-link>
        </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.form.password !== this.form.confirmPassword) {
        this.$toast("Passwords do not match.", "error");
        return;
      }
      const payload = {
        lastName: this.form.lastName,
        firstName: this.form.firstName,
        birthDate: this.form.birthDate || null,
        gender: this.form.gender || null,
        address: this.form.address || "",
        phone: this.form.phone || "",
        email: this.form.email,
        password: this.form.password,
      };
      this.$emit("register", payload);
    },
  },
};
</script>

<style scoped>
  .no-underline {
  text-decoration: none !important;
}
</style>