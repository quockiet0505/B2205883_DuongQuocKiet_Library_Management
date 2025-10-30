<!-- src/views/reader/BookDetail.vue -->
<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <BookDetailCard 
        v-if="book" 
        :book="book" 
        @borrow="borrowBook" 
      />
      <div v-else class="text-center py-5">Loading...</div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import BookDetailCard from "@/components/reader/BookDetailCard.vue";
import bookService from "@/services/book.service";
import { mapGetters } from "vuex";

export default {
  name: "ReaderBookDetail",
  components: { AppHeader, AppFooter, BookDetailCard },
  data() {
    return {
      book: null,
    };
  },
  computed: {
    ...mapGetters("reader", ["isLoggedIn", "readerInfo"]),
  },
  async created() {
    const { id } = this.$route.params;
    this.book = await bookService.getBookById(id);
  },
  methods: {
    async borrowBook() {
      if (!this.isLoggedIn) {
        this.$router.push("/reader/login");
        return;
      }
      try {
        // Gửi yêu cầu mượn sách
        await this.$axios.post("/api/borrows", {
          readerId: this.readerInfo?._id,
          bookId: this.book._id,
          borrowDate: new Date(),
          returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          quantity: 1,
        });
        alert("Borrow request sent!");
      } catch (error) {
        console.error(error);
        alert("Failed to borrow.");
      }
    },
  },
};
</script>
