<template>
  <div v-if="book" class="card p-4 shadow-sm">
    <div class="row g-3">
      <div class="col-md-4 text-center">
        <img :src="book.thumbnail || defaultImage" class="img-fluid rounded" style="max-height:300px;object-fit:cover" />
      </div>
      <div class="col-md-8">
        <h4 class="fw-bold">{{ book.title }}</h4>
        <p><b>Author:</b> {{ book.author }}</p>
        <p><b>Publisher:</b> {{ book.publisherId?.name || '-' }}</p>
        <p><b>Year:</b> {{ book.publishYear || '-' }}</p>
        <p><b>Price:</b> {{ formatPrice(book.price) }}</p>
        <p><b>Quantity:</b> {{ book.quantity }}</p>
        <div class="mt-3">
          <button @click="borrowBook" class="btn btn-primary mt-2">Borrow</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-muted py-5">Book not found.</div>
</template>

<script>
export default {
  name: "BookDetailCard",
  props: { book: { type: Object, required: false } },
  data() { return { defaultImage: "/assets/images/book-placeholder.png" }; },
  methods: {
    formatPrice(p) {
      if (!p && p !== 0) return "-";
      return Number(p).toLocaleString("en-US", { style: "currency", currency: "USD" });
    },
    async borrowBook() {
      const readerId = localStorage.getItem("readerId");
      if (!readerId) return alert("Not logged in");

      try {
        await this.$store.dispatch("reader/createBorrow", {
          readerId,
          bookId: this.book.bookId || this.book._id || this.book.id, // đảm bảo lấy đúng id
          quantity: 1
        });
        alert("Borrow request sent!");
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  }
};
</script>
