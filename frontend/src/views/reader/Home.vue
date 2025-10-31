<template>
  <ReaderLayout v-model="q">
    <div class="container mt-4">
      <BookList :books="filteredBooks" />
    </div>
  </ReaderLayout>
</template>

<script>
import ReaderLayout from "@/components/reader/ReaderLayout.vue";
import BookList from "@/components/reader/BookList.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReaderHome",
  components: { ReaderLayout, BookList },
  data() {
    return { q: "" }; // Giá trị search
  },
  computed: {
    ...mapGetters("reader", ["allBooks"]),
    filteredBooks() {
      const q = this.q.toLowerCase();
      if (!q) return this.allBooks;
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
