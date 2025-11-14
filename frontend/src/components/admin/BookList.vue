<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Book Management</h3>

    <button class="btn btn-primary mb-3" @click="openAddForm">
      <i class="fas fa-plus"></i> Add Book
    </button>

    <SearchBar placeholder="Search by title or author..."
               @search="handleSearch"
               ref="searchBox" />

    <div v-if="!filteredBooks.length" class="alert alert-info">No books found.</div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Quantity</th>
          <th>Price</th>
          <th style="width: 120px;">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="book in filteredBooks" :key="book._id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>

          <!-- LẤY TÊN NHÀ XUẤT BẢN -->
          <td>{{ getPublisherName(book.publisherId) }}</td>

          <td>{{ book.quantity }}</td>
          <td>{{ formatPrice(book.price) }}</td>

          <td>
            <button class="btn btn-sm btn-warning me-2" @click="openEditForm(book)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteBook(book._id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Form -->
    <div v-if="showForm" class="modal-backdrop">
      <div class="modal-dialog modal-lg">
        <div class="modal-content p-3">
          <BookForm
            :book="editBook"
            :publishers="publishers"
            @save="saveBook"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>
    <!-- Them xac nhan xoa -->
    <ConfirmModal ref="confirmModal" />

  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import BookForm from "./form/BookForm.vue";
import bookService from "@/services/book.service";
import publisherService from "@/services/publisher.service";
import ConfirmModal from "@/components/common/ConfirmModal.vue";

export default {
  components: { SearchBar, BookForm, ConfirmModal  },

  data() {
    return {
      books: [],
      publishers: [],
      searchQuery: "",
      showForm: false,
      editBook: null,
    };
  },

  computed: {
    filteredBooks() {
      const q = this.searchQuery.toLowerCase();
      return this.books.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    },
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      const [bookRes, pubRes] = await Promise.all([
        bookService.getAllBooks(),
        publisherService.getAllPublishers(),
      ]);

      this.books = bookRes.data || bookRes;
      this.publishers = pubRes.data || pubRes;
    },

    /**  LẤY TÊN NHÀ XUẤT BẢN */
    getPublisherName(publisherId) {
      const pub = this.publishers.find(p => p.publisherId === publisherId);
      return pub ? pub.name : "—";
    }
    ,

    handleSearch(q) {
      this.searchQuery = q;
    },

    resetSearch() {
      this.searchQuery = "";
      this.$refs.searchBox.reset();
    },

    openAddForm() {
      this.editBook = null;
      this.showForm = true;
    },

    openEditForm(book) {
      this.editBook = { ...book };
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
      this.editBook = null;
    },

    async saveBook(data) {
      try {
        if (this.editBook?._id) {
          await bookService.updateBook(this.editBook._id, data);
          this.$toast("Book updated successfully!", "success");
        } else {
          await bookService.createBook(data);
          this.$toast("Book added successfully!", "success");
        }

        await this.fetchData();
        this.closeForm();

      } catch (err) {
        console.error(err);
        this.$toast(err.response?.data?.message || "An error occurred!", "error");
      }
    }
    ,

    async deleteBook(id) {
      this.$refs.confirmModal.open(
        "Are you sure you want to delete this book?",
        async () => {
          try {
            await bookService.deleteBook(id);
            await this.fetchData();
            this.$toast("Book deleted successfully!", "success");
          } catch (err) {
            console.error(err);
            this.$toast(err.response?.data?.message || "Delete failed!", "error");
          }
        }
      );
    }
    ,

    formatPrice(price) {
      return price ? `$${price.toFixed(2)}` : "—";
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
