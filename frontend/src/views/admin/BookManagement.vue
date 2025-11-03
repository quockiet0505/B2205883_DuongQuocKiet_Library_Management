<template>
  <div>
    <AdminLayout>
      <div class="container mt-4">
        <BookList :books="books" />
      </div>
    </AdminLayout>
  </div>
</template>

<script>
import AdminLayout from "@/components/admin/AdminLayout.vue";
import BookList from "@/components/admin/BookList.vue";
import { mapGetters } from "vuex";

export default {
  components: { AdminLayout, BookList },
  computed: mapGetters("admin", ["allBooks"]),
  data() {
    return { books: [] };
  },
  async created() {
    await this.$store.dispatch("admin/fetchBooks");
    this.books = this.allBooks;
  }
};
</script>
