<template>
  <ReaderLayout v-model:q="q">
    <div class="container mt-4">
      <div v-if="loading" class="text-center text-muted py-5">Loading...</div>
      <div v-else-if="!book" class="text-center text-muted py-5">Book not found.</div>
      <div v-else>
        <BookDetailCard :book="book" @borrow="onBorrow" />
      </div>
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
  data() {
    return { loading: true, q: "" };
  },
  computed: {
    ...mapGetters("reader", ["allBooks"]),
    book() {
      const key = String(this.$route.params.id || "");
      return this.allBooks.find(b =>
        (b?.bookId != null && String(b.bookId) === key) ||
        (b?._id != null && String(b._id) === key) ||
        (b?.id != null && String(b.id) === key)
      );
    },
  },
  async mounted() {
    if (!this.allBooks || this.allBooks.length === 0) {
      await this.fetchBooks();
    }
    this.loading = false;

    const currentId = String(this.$route.params.id || "");
    if (this.book) {
      const canonicalId = String(this.book.bookId || this.book._id || this.book.id || "");
      const expectedSlug = this.slugify(this.book.title);
      if ((canonicalId && currentId !== canonicalId) || (expectedSlug && (this.$route.params.slug || "") !== expectedSlug)) {
        this.$router.replace({ name: "ReaderBookDetail", params: { id: canonicalId, slug: expectedSlug } });
      }
    }
  },
  methods: {
    ...mapActions("reader", ["fetchBooks"]),
    onBorrow() {
      this.$toast?.success?.("Requested to borrow") || alert("Requested to borrow");
    },
    slugify(str) {
      return (str || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d").replace(/Đ/g, "d")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-+/g, "-");
    },
  },
};
</script>
