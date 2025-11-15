<template>
  <div>
    <h4 class="mb-3">Borrow History</h4>

    <div v-if="!borrows || borrows.length === 0" class="alert alert-info">
      No borrow history found.
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Book</th>
            <th>Quantity</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Fine</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="b in mergedBorrows" :key="b._id">
  <td>
    <div v-if="b.bookObj">
      <div class="fw-bold">{{ b.bookObj.title }}</div>
      <small class="text-muted">{{ b.bookObj.author }}</small>
    </div>
    <div v-else>
      <span class="text-warning">Book ID: {{ b.bookId }}</span>
    </div>
  </td>



            <td class="text-center">{{ b.quantity }}</td>

            <td>
              <span v-if="b.borrowDate">{{ format(b.borrowDate) }}</span>
              <span v-else-if="b.status === 'processing'">
                {{ formatTempBorrowDate(b.createdAt) }}
                <small class="text-muted">(Pending)</small>
              </span>
              <span v-else>—</span>
            </td>

            <td>
              <span v-if="b.returnDate">{{ format(b.returnDate) }}</span>
              <span v-else-if="b.status === 'processing'">
                {{ formatTempReturnDate(b.createdAt) }}
                <small class="text-muted">(Expected)</small>
              </span>
              <span v-else>—</span>
            </td>

            <td>
              <span :class="statusClass(b.status)">
                {{ formatStatus(b.status) }}
              </span>
            </td>

            <td>
              <span v-if="b.fine > 0" class="text-danger fw-bold">
                {{ formatPrice(b.fine) }}
              </span>
              <span v-else class="text-muted">—</span>
            </td>

            <td>
              <button
                v-if="b.status === 'processing'"
                class="btn btn-sm btn-outline-danger"
                @click="openConfirmModal(b._id)"
                :disabled="b._cancelling"
              >
                <span v-if="b._cancelling">Cancelling...</span>
                <span v-else>Cancel</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="totalFine > 0" class="alert alert-warning mt-3">
        <strong>Total Fine:</strong> {{ formatPrice(totalFine) }}
      </div>
    </div>

    <ConfirmModal ref="confirmBox" />
  </div>
</template>

<script>
import api from "@/services/api";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import bookService from "@/services/book.service";

export default {
  name: "BorrowHistoryList",
  components: { ConfirmModal },

  props: {
    borrows:  Array,
    books: Array,  
  },

  data() {
    return {
      cancelId: null,
      
    };
  },

  computed: {
    mergedBorrows() {
      return this.borrows.map(b => ({
        ...b,
        bookObj: this.books.find(book => book.bookId === b.bookId) || null
      }));
    },

    totalFine() {
      return this.borrows.reduce((sum, b) => sum + (b.fine || 0), 0);
    },
  },

  methods: {
    async loadBooks() {
      const ids = [...new Set(this.borrows.map(b => b.bookId))];

      for (const id of ids) {
        try {
          const res = await bookService.getBookById(id);  
          
          this.booksMap[id] = res.data;                   
          
        } catch (err) {
          console.warn("KHÔNG TẢI ĐƯỢC SÁCH ID:", id);
        }
      }
    },

    format(d) {
      if (!d) return "-";
      return new Date(d).toLocaleDateString("en-GB");
    },

    formatTempBorrowDate(createdAt) {
      return this.format(createdAt || new Date());
    },

    formatTempReturnDate(createdAt) {
      const date = new Date(createdAt || new Date());
      date.setDate(date.getDate() + 7);
      return this.format(date);
    },

    formatPrice(p) {
      if (!p && p !== 0) return "$0.00";
      return Number(p).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },

    formatStatus(s) {
      return {
        processing: "Processing",
        accepted: "Accepted",
        refused: "Refused",
        returned: "Returned",
        overdue: "Overdue",
        cancelled: "Cancelled",
      }[s] || s;
    },

    statusClass(s) {
      return {
        processing: "badge badge-processing",
        accepted: "badge badge-accepted",
        refused: "badge badge-refused",
        returned: "badge badge-returned",
        overdue: "badge badge-overdue",
        cancelled: "badge bg-secondary",
      }[s] || "badge badge-light";
    },

    openConfirmModal(id) {
      this.cancelId = id;

      if (!this.$refs.confirmBox) return;

      this.$refs.confirmBox.open(
        "Are you sure you want to cancel this borrow request?",
        () => this.cancelBorrow()
      );
    },

    async cancelBorrow() {
      const id = this.cancelId;
      if (!id) return;

      const idx = this.borrows.findIndex((b) => b._id === id);
      if (idx === -1) return;

      this.borrows[idx]._cancelling = true;

      try {
        const res = await api.patch(`/borrow/${id}/cancel`);
        const updated = res.data?.data;

        if (updated) {
          this.borrows[idx] = { ...this.borrows[idx], ...updated };
        } else {
          this.borrows[idx].status = "cancelled";
        }

        this.$toast("Borrow request cancelled successfully!");
      } catch (e) {
        this.$toast(
          e.response?.data?.message || e.message,
          "error"
        );
      } finally {
        this.borrows[idx]._cancelling = false;
        this.cancelId = null;
      }
    },
  },
};
</script>

<style scoped>
.table {
  font-size: 0.95rem;
}
.badge {
  font-size: 0.85rem;
}

.badge-processing {
  background-color: #fde68a;
  color: #78350f;
}
.badge-accepted {
  background-color: #a7f3d0;
  color: #065f46;
}
.badge-refused {
  background-color: #fca5a5;
  color: #991b1b;
}
.badge-returned {
  background-color: #e5e5cb;
  color: #4b5563;
}
.badge-overdue {
  background-color: #fca5a5;
  color: #991b1b;
}
.bg-secondary {
  background-color: #d1d5db !important;
  color: #374151 !important;
}
</style>
