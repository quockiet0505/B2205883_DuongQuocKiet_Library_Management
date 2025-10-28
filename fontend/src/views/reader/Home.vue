
<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <InputSearch v-model="q" />
      <BookList :books="filteredBooks" />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import InputSearch from "@/components/reader/InputSearch.vue";
import BookList from "@/components/reader/BookList.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReaderHome",
  components: { AppHeader, AppFooter, InputSearch, BookList },
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
  async created() {
    await this.fetchBooks();
  },
  methods: {
    ...mapActions("reader", ["fetchBooks"]),
  },
};
</script>
