<!-- src/views/reader/BookDetail.vue -->
<template>
  <div class="reader-page">
    <AppHeader v-model="q" />
    <div class="container mt-4">
      <div v-if="loading" class="text-center text-muted py-5">Loading...</div>
      <div v-else-if="!book" class="text-center text-muted py-5">Book not found.</div>
      <div v-else>
        <BookDetailCard :book="book" @borrow="onBorrow" />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BookDetailCard from "@/components/reader/BookDetailCard.vue";
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";

export default {
  name: "ReaderBookDetail",
  components: { BookDetailCard, AppHeader, AppFooter },
  data() {
    return { loading: true, q: "" };
  },
  computed: {
    ...mapGetters("reader", ["allBooks"]),
    book() {
      const id = this.$route.params.id;
      return this.allBooks.find(b => String(b._id) === String(id) || String(b.id) === String(id));
    },
  },
  async mounted() {
    if (!this.allBooks || this.allBooks.length === 0) {
      await this.fetchBooks();
    }
    this.loading = false;
  },
  methods: {
    ...mapActions("reader", ["fetchBooks"]),
    onBorrow() {
      // TODO: implement borrow flow
      this.$toast?.success?.("Requested to borrow") || alert("Requested to borrow");
    },
  },
};
</script>

<style scoped>
.reader-page {
  padding-top: 100px;
}
</style>
