<template>
  <ReaderLayout>
    <div class="container mt-4">
      <BorrowHistoryList 
        :borrows="borrowHistory"
        :books="books"
      />
    </div>
  </ReaderLayout>
</template>

<script>
import ReaderLayout from "@/components/reader/ReaderLayout.vue";
import BorrowHistoryList from "@/components/reader/BorrowHistoryList.vue";
import { mapGetters, mapActions } from "vuex";
import bookService from "@/services/book.service";

export default {
  name: "ReaderBorrowHistory",
  components: { ReaderLayout, BorrowHistoryList },

  data() {
    return {
      books: [],   //  Load từ API, không dùng Vuex
    };
  },

  computed: {
    ...mapGetters("reader", ["isLoggedIn", "borrowHistory"]),
  },

  async created() {
    if (!this.isLoggedIn) {
      this.$router.push("/reader/login");
      return;
    }

    //  Load tất cả sách trước
    const res = await bookService.getAllBooks();
    this.books = res.data || res;

    //  Load lịch sử mượn
    await this.fetchBorrowHistory();
  },

  methods: {
    ...mapActions("reader", ["fetchBorrowHistory"]),
  },
};
</script>
