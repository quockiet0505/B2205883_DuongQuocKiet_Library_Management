<!-- src/views/reader/Home.vue -->
<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <InputSearch v-model="q" />
      <BookList :books="filtered" />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import InputSearch from "@/components/reader/InputSearch.vue";
import BookList from "@/components/reader/BookList.vue";
import { useBookStore } from "@/store/bookStore";

export default {
  name: "ReaderHome",
  components: { AppHeader, AppFooter, InputSearch, BookList },
  data() { return { q: "" }; },
  computed: {
    filtered() {
      if (!this.q) return this.bookStore.books;
      const q = this.q.toLowerCase();
      return this.bookStore.books.filter(b => (b.title||"").toLowerCase().includes(q) || (b.author||"").toLowerCase().includes(q));
    }
  },
  created() {
    this.bookStore = useBookStore();
    this.bookStore.loadAll();
  }
};
</script>
