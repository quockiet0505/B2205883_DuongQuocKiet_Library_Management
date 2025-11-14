<template>
  <div class="container my-4">

    <h3 class="fw-bold mb-3">Borrow Management</h3>

    <button class="btn btn-primary mb-3" @click="openAddForm">
      <i class="fas fa-plus"></i> Create Borrow
    </button>

    <SearchBar placeholder="Search by reader or book..." @search="handleSearch" />

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p class="mt-2">Loading borrow records...</p>
    </div>

    <!-- Table -->
    <div v-else>
      <div v-if="filteredBorrows.length === 0" class="alert alert-info">
        No borrow records found.
      </div>

      <table v-else class="table table-striped table-bordered align-middle text-center">
        <thead class="table-dark">
          <tr>
            <!-- <th>ID</th> -->
            <th>Reader</th>
            <th>Book</th>
            <th>Quantity</th>
            <th>Borrow</th>
            <th>Return</th>
            <th>Status</th>
            <th style="width: 160px;">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="b in filteredBorrows" :key="b._id">
            <!-- <td>{{ formatId(b._id) }}</td> -->

            <td>
              <div v-if="b.readerId">
                {{ b.readerId.firstName }} {{ b.readerId.lastName }}
              </div>
            </td>

            <td>
              <div v-if="b.bookId">
                {{ b.bookId.title }}
              </div>
            </td>

            <td>{{ b.quantity }}</td>
            <td>{{ formatDate(b.borrowDate) }}</td>
            <td>{{ formatDate(b.returnDate) }}</td>

            <td>
              <span :class="getBadge(b.status)">{{ b.status }}</span>
              <div v-if="b.status === 'overdue'" class="text-danger small">
                Fine: {{ b.fine }}đ
              </div>
            </td>

            <td>
              <!-- PROCESSING -->
              <button
                v-if="b.status === 'processing'"
                class="btn btn-sm btn-success me-1"
                @click="updateStatus(b._id, 'accepted')"
              >Approve</button>

              <button
                v-if="b.status === 'processing'"
                class="btn btn-sm btn-danger me-1"
                @click="updateStatus(b._id, 'refused')"
              >Reject</button>

              <!-- ACCEPTED -->
              <button
                v-if="b.status === 'accepted'"
                class="btn btn-sm btn-secondary me-1"
                @click="updateStatus(b._id, 'returned')"
              >Returned</button>

              <!-- OVERDUE -->
              <button
                v-if="b.status === 'overdue'"
                class="btn btn-sm btn-dark me-1"
                @click="updateStatus(b._id, 'returned')"
              >
                Returned ({{ b.fine }}đ)
              </button>

              <small
                v-if="['refused','returned','cancelled'].includes(b.status)"
                class="text-muted"
              >No action</small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="modal-backdrop">
      <div class="modal-dialog modal-lg">
        <div class="modal-content p-3">
          <BorrowForm
            :books="books"
            :readers="readers"
            @save="createBorrow"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import BorrowForm from "./form/BorrowForm.vue";
import borrowService from "@/services/borrow.service";
import bookService from "@/services/book.service";
import readerService from "@/services/reader.service";

export default {
  name: "BorrowList",
  components: { SearchBar, BorrowForm },

  data() {
    return {
      borrows: [],
      books: [],
      readers: [],
      showForm: false,
      searchQuery: "",
      loading: false,
    };
  },

  async created() {
    await this.fetchData();
  },

  computed: {
    filteredBorrows() {
      if (!this.searchQuery) return this.borrows;

      const q = this.searchQuery.toLowerCase();

      return this.borrows.filter((b) => {
        const reader = b.readerId
          ? `${b.readerId.firstName} ${b.readerId.lastName}`.toLowerCase()
          : "";

        const book = b.bookId ? b.bookId.title.toLowerCase() : "";

        return reader.includes(q) || book.includes(q);
      });
    },
  },

  methods: {
    async fetchData() {
      try {
        this.loading = true;

        const [borrowsRes, booksRes, readersRes] = await Promise.all([
          borrowService.getAllBorrows(),
          bookService.getAllBooks(),
          readerService.getAllReaders(),
        ]);

        this.borrows = borrowsRes.data || borrowsRes;
        this.books = booksRes.data || booksRes;
        this.readers = readersRes.data || readersRes;

      } catch (err) {
        console.error(err);
        alert("Failed to load borrow data!");
      } finally {
        this.loading = false;
      }
    },

    handleSearch(q) {
      this.searchQuery = q;
    },

    openAddForm() {
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
    },

    async createBorrow(data) {
      try {
        await borrowService.createBorrow(data);
        alert("Borrow created successfully!");
        this.closeForm();
        await this.fetchData();
      } catch (e) {
        console.error(e);
        alert("Failed to create borrow record!");
      }
    },

    async updateStatus(id, status) {
      try {
        await borrowService.updateBorrow(id, { status });
        alert("Status updated successfully!");
        await this.fetchData();
      } catch (e) {
        console.error(e);
        alert("Failed to update status");
      }
    },

    formatId(id) {
      return id ? id.slice(-6).toUpperCase() : "";
    },

    formatDate(d) {
      return d ? new Date(d).toLocaleDateString("en-GB") : "—";
    },

    getBadge(status) {
      return {
        processing: "badge bg-warning text-dark",
        accepted: "badge bg-success",
        refused: "badge bg-danger",
        returned: "badge bg-secondary",
        overdue: "badge bg-dark",
        cancelled: "badge bg-info text-dark",
      }[status];
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
