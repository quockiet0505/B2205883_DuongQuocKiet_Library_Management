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
        <p><b>Available Quantity:</b> {{ book.quantity }}</p>
        
        <div class="mt-4 p-3 border rounded bg-light">
          <h5 class="mb-3">Borrow this book</h5>
          <div class="row g-2">
            <div class="col-md-4">
              <label class="form-label">Quantity</label>
              <input 
                v-model.number="borrowForm.quantity" 
                type="number" 
                min="1" 
                :max="book.quantity"
                class="form-control" 
                :disabled="book.quantity === 0"
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Borrow Date</label>
              <input v-model="borrowForm.borrowDate" type="date" class="form-control" readonly />
            </div>
            <div class="col-md-4">
              <label class="form-label">Return Date</label>
              <input v-model="borrowForm.returnDate" type="date" class="form-control" readonly />
            </div>
          </div>
          <button 
            @click="borrowBook" 
            class="btn btn-primary mt-3 w-100"
            :disabled="book.quantity === 0 || submitting"
          >
            {{ submitting ? 'Processing...' : book.quantity === 0 ? 'Out of Stock' : 'Borrow Book' }}
          </button>
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
  data() { 
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(returnDate.getDate() + 7);
    
    return { 
      defaultImage: "/assets/images/book-placeholder.png",
      submitting: false,
      borrowForm: {
        quantity: 1,
        borrowDate: today.toISOString().split('T')[0],
        returnDate: returnDate.toISOString().split('T')[0]
      }
    }; 
  },
  methods: {
    formatPrice(p) {
      if (!p && p !== 0) return "-";
      return Number(p).toLocaleString("en-US", { style: "currency", currency: "USD" });
    },
    async borrowBook() {
      const readerId = localStorage.getItem("readerId");
      if (!readerId) {
        alert("Please login to borrow books");
        this.$router.push("/reader/login");
        return;
      }

      if (this.borrowForm.quantity < 1 || this.borrowForm.quantity > this.book.quantity) {
        alert(`Please enter a valid quantity (1-${this.book.quantity})`);
        return;
      }

      this.submitting = true;
      try {
        await this.$store.dispatch("reader/createBorrow", {
          readerId,
          bookId: this.book.bookId || this.book._id || this.book.id,
          quantity: this.borrowForm.quantity,
          borrowDate: this.borrowForm.borrowDate,
          returnDate: this.borrowForm.returnDate
        });
        
        // ✅ Fetch lại lịch sử mượn sau khi mượn thành công
        await this.$store.dispatch("reader/fetchBorrowHistory");
        
        alert("Borrow request sent successfully!");
        this.$router.push("/reader/history");
      } catch (err) {
        alert(err.response?.data?.message || err.message || "Failed to send borrow request");
      } finally {
        this.submitting = false;
      }
    }
  }
};
</script>
