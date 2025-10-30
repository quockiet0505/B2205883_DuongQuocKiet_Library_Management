<template>
  <div class="reader-home">
    <!-- Header có thanh search -->
    <AppHeader v-model="q" />

    <!-- Nội dung chính -->
    <div class="container mt-4">
      <BookList :books="filteredBooks" />
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
.reader-home {
  padding-top: 100px; /* hoặc 80px tùy chiều cao header */
}
</style>

<script>
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import BookList from "@/components/reader/BookList.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReaderHome",
  components: { AppHeader, AppFooter, BookList },
  data() {
    return { q: "" };
  },
  computed: {
    ...mapGetters("reader", ["allBooks"]),
    filteredBooks() {
      if (!this.q) return this.allBooks;
      const q = this.q.toLowerCase();
      return this.allBooks.filter(
        (b) =>
          (b.title || "").toLowerCase().includes(q) ||
          (b.author || "").toLowerCase().includes(q)
      );
    },
  },
  async mounted() {
    await this.fetchBooks();
  },
  methods: {
    ...mapActions("reader", ["fetchBooks"]),
  },
};
</script>
