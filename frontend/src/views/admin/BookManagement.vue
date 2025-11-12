<template>
  <div>
    <AdminLayout>
      <div class="container mt-4">
        <BookList 
          :books="books" 
          @delete="handleDelete"
        />
      </div>
    </AdminLayout>
  </div>
</template>

<script>
import AdminLayout from "@/components/admin/AdminLayout.vue";
import BookList from "@/components/admin/BookList.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: { AdminLayout, BookList },
  computed: mapGetters("admin", ["allBooks"]),
  data() {
    return { 
      books: []
    };
  },
  async created() {
    await this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      await this.$store.dispatch("admin/fetchBooks");
      this.books = this.allBooks;
    },
    
    async handleDelete(id) {
      try {
        await axios.delete(`/api/book/${id}`);
        alert("Book deleted successfully!");
        await this.fetchBooks();
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete book");
      }
    }
  }
};
</script>
