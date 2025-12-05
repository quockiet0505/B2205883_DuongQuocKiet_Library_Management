<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Book Management</h3>

    <button class="btn btn-primary mb-3" @click="openAddForm">
      <i class="fas fa-plus"></i> Add Book
    </button>

    <SearchBar placeholder="Search by title or author..." 
               @search="handleSearch"
               ref="searchBox" />

    <!-- Loading -->
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary"></div>
      <p>Loading books...</p>
    </div>

    <!-- No data -->
    <div v-else-if="paginatedBooks.length === 0" class="alert alert-info">
      No books found.
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Quantity</th>
          <th>Price</th>
          <th style="width:120px">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="book in paginatedBooks" :key="book._id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
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

    <!-- Pagination -->
    <Pagination 
      v-model="page"
      :total="filteredBooks.length"
      :size="pageSize"
    />

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

    <ConfirmModal ref="confirmModal" />
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import BookForm from "./form/BookForm.vue";
import Pagination from "@/components/common/Pagination.vue";
import bookService from "@/services/book.service";
import publisherService from "@/services/publisher.service";
import ConfirmModal from "@/components/common/ConfirmModal.vue";

export default {
  components: { SearchBar, BookForm, ConfirmModal, Pagination },

  data() {
    return {
      books: [],
      publishers: [],
      searchQuery: "",
      showForm: false,
      editBook: null,

      // Pagination
      page: 1,
      pageSize: 10,
      loading: false,
    };
  },

  computed: {
    filteredBooks() {
      const q = (this.searchQuery || "").toLowerCase();

      // helper to safely 
      return (this.books || [])
        .filter(b => {
          const title = (b.title || "").toString().toLowerCase();
          const author = (b.author || "").toString().toLowerCase();
          return title.includes(q) || author.includes(q);
        })
        // sort 
        .sort((a, b) => this._getTime(b.updatedAt) - this._getTime(a.updatedAt));
    },

    paginatedBooks() {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredBooks.slice(start, start + this.pageSize);
    },

    totalPages() {
      return Math.max(1, Math.ceil(this.filteredBooks.length / this.pageSize));
    }
  },

  watch: {
    filteredBooks() {
      if (this.page > this.totalPages) {
        this.page = this.totalPages;
      }
    }
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    _getTime(val) {
      if (!val) return 0;

      if (typeof val === "object" && val.$date) {
        return Date.parse(val.$date) || 0;
      }

      // string ISO
      if (typeof val === "string") {
        return Date.parse(val) || 0;
      }

      // Date instance
      if (val instanceof Date) return val.getTime();

      if (typeof val === "number") return val;

      return 0;
    },

    async fetchData() {
      this.loading = true;

      const [bookRes, pubRes] = await Promise.all([
        bookService.getAllBooks(),
        publisherService.getAllPublishers(),
      ]);

      // normalize payloads 
      this.books = bookRes.data || bookRes || [];
      this.publishers = pubRes.data || pubRes || [];

      this.books = this.books.map(b => ({
        ...b,
        updatedAt: b.updatedAt || b.updatedAt === 0 ? b.updatedAt : b.createdAt || b.updatedAt
      }));

      this.loading = false;

    },

    getPublisherName(id) {
      const pub = this.publishers.find(p => p.publisherId === id || p._id === id);
      return pub ? pub.name : "—";
    },

    handleSearch(q) {
      this.searchQuery = q || "";
      this.page = 1; // reset page 
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
      this.editBook = null;
      this.showForm = false;
    },

    async saveBook(data) {
      try {
        if (this.editBook?._id) {
          await bookService.updateBook(this.editBook._id, data);
          this.$toast("Book updated!", "success");
        } else {
          await bookService.createBook(data);
          this.$toast("Book added!", "success");
        }

        await this.fetchData();
        this.closeForm();
      } catch (err) {
        this.$toast(err.response?.data?.message || "Error!", "error");
      }
    },

    async deleteBook(id) {
      this.$refs.confirmModal.open("Delete this book?", async () => {
        try {
          await bookService.deleteBook(id);
          await this.fetchData();
          this.$toast("Deleted!", "success");
        } catch (err) {
          this.$toast("Delete failed!", "error");
        }
      });
    },

    formatPrice(price) {
      if (!price) return "—";
      return Number(price).toLocaleString("vi-VN") + "đ";
    }

  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display:flex;
  justify-content:center;
  align-items:center;
}
</style>
