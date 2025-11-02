<template>
  <div class="card p-4 shadow-sm border-0">
    <h4 class="mb-3">Reader Profile</h4>
    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label>Email</label>
        <input type="email" class="form-control" v-model="reader.email" disabled />
      </div>

      <div class="mb-3">
        <label>First Name</label>
        <input type="text" class="form-control" v-model="reader.firstName" required />
      </div>

      <div class="mb-3">
        <label>Last Name</label>
        <input type="text" class="form-control" v-model="reader.lastName" required />
      </div>

      <div class="mb-3">
        <label>Phone</label>
        <input type="text" class="form-control" v-model="reader.phone" />
      </div>

      <div class="mb-3">
        <label>Address</label>
        <input type="text" class="form-control" v-model="reader.address" />
      </div>

      <button class="btn btn-success w-100">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["reader"],
  emits: ["update"],
  methods: {
    updateProfile() {
      this.$emit("update");
    },
  },
};
</script>
