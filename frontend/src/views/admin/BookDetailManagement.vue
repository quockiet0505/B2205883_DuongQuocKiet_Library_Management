<template>
  <AdminLayout>
    <div class="container mt-4">
      <BookDetail :book="book" />
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/components/admin/AdminLayout.vue";
import BookDetail from "@/components/admin/BookDetail.vue";
import axios from "axios";

export default {
  name: "AdminBookDetailView",
  components: { AdminLayout, BookDetail },
  data() {
    return { book: null };
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const res = await axios.get(`/api/books/${id}`);
      this.book = res.data;
      console.log("Loaded book:", this.book);
    } catch (err) {
      console.error("Error loading book:", err);
    }
  },
};
</script>
