<template>
  <ReaderLayout>
    <div class="container mt-4">
      <div v-if="loading" class="text-center text-muted py-5">Loading...</div>
      <BookDetailCard v-else :book="book" />
    </div>
  </ReaderLayout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BookDetailCard from "@/components/reader/BookDetailCard.vue";
import ReaderLayout from "@/components/reader/ReaderLayout.vue";

export default {
  name: "ReaderBookDetail",
  components: { BookDetailCard, ReaderLayout },
  data() { return { loading: true }; },
  computed: {
    ...mapGetters("reader", ["allBooks"]),
    book() {
      const key = String(this.$route.params.id || "");
      if (!this.allBooks) return null;
      return this.allBooks.find(b =>
        (b.bookId && String(b.bookId) === key) ||
        (b._id && String(b._id) === key) ||
        (b.id && String(b.id) === key)
      );
    }
  },
  async mounted() {
    if (!this.allBooks || this.allBooks.length === 0) {
      await this.fetchBooks();
    }
    this.loading = false;
  },
  methods: {
    ...mapActions("reader", ["fetchBooks"])
  }
};
</script>
