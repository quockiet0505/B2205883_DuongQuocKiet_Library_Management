<template>
  <div class="container my-4">
    <h2 class="text-center fw-bold mb-4">Admin Dashboard</h2>

    <div class="row g-4">
      <div class="col-md-3">
        <div class="card shadow-sm text-center p-3">
          <h5 class="fw-bold">Total Books</h5>
          <p class="display-6 text-primary">{{ stats.books || 0 }}</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm text-center p-3">
          <h5 class="fw-bold">Readers</h5>
          <p class="display-6 text-success">{{ stats.readers || 0 }}</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm text-center p-3">
          <h5 class="fw-bold">Borrows</h5>
          <p class="display-6 text-warning">{{ stats.borrows || 0 }}</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card shadow-sm text-center p-3">
          <h5 class="fw-bold">Publishers</h5>
          <p class="display-6 text-info">{{ stats.publishers || 0 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminDashboard",
  props: {
    stats: {
      type: Object,
      default: () => ({ books: 0, readers: 0, borrows: 0, publishers: 0 })
    }
  }
};
</script>
