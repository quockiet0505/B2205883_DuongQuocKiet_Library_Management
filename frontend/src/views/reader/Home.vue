<template>
  <ReaderLayout v-model="q">
    <div class="container mt-4">
      <BookList :books="paginatedBooks" />

      <div class="mt-3 d-flex justify-content-center">
        <Pagination
          v-model="page"
          :total="filteredBooks.length"
          :size="pageSize"
        />
      </div>
    </div>
  </ReaderLayout>
</template>

<script>
import ReaderLayout from "@/components/reader/ReaderLayout.vue";
import BookList from "@/components/reader/BookList.vue";
import Pagination from "@/components/common/Pagination.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReaderHome",
  components: { ReaderLayout, BookList, Pagination },

  data() {
    return {
      q: "",
      page: 1,
      pageSize: 20, 
    };
  },

  computed: {
    ...mapGetters("reader", ["allBooks"]),

    // Filter theo từ tìm kiếm
    filteredBooks() {
      const q = (this.q || "").toLowerCase().trim();
      if (!q) return this.allBooks || [];

      return (this.allBooks || []).filter(
        (b) =>
          (b.title || "").toLowerCase().includes(q) ||
          (b.author || "").toLowerCase().includes(q)
      );
    },

    // Dữ liệu 
    paginatedBooks() {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredBooks.slice(start, start + this.pageSize);
    },
  },

  watch: {
    // Khi user tìm kiếm 
    q() {
      this.page = 1;
    },

    // Khi dữ liệu allBooks 
    filteredBooks(newList) {
      const totalPages = Math.max(1, Math.ceil((newList?.length || 0) / this.pageSize));
      if (this.page > totalPages) this.page = totalPages;
    }
  },

  async mounted() {
    await this.fetchBooks();
  },

  methods: {
    ...mapActions("reader", ["fetchBooks"]),
  },
};
</script>
