<template>
  <div>
    <h4 class="mb-3">Borrow History</h4>
    <div v-if="!borrows || borrows.length === 0" class="alert alert-info">
      No borrow history found.
    </div>
    <div v-else class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>Borrow ID</th>
            <th>Book</th>
            <th>Quantity</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Status</th>
            <th>Fine</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in borrows" :key="b._id">
            <td class="fw-bold">{{ b._id || '—' }}</td>
            <td>
              <!-- Debug: kiểm tra cấu trúc dữ liệu -->
              <div v-if="b.bookId && typeof b.bookId === 'object'">
                <div class="fw-semibold">{{ b.bookId.title || "—" }}</div>
                <small class="text-muted">{{ b.bookId.author || '' }}</small>
              </div>
              <div v-else-if="b.bookId" class="text-warning">
                Book ID: {{ b.bookId }} (not populated)
              </div>
              <div v-else class="text-muted">No book info</div>
            </td>
            <td class="text-center">{{ b.quantity }}</td>
            <td>{{ format(b.borrowDate) }}</td>
            <td>
              {{ format(b.returnDate) }}
              <span v-if="isOverdue(b)" class="badge bg-danger ms-1">Overdue</span>
            </td>
            <td><span :class="statusClass(b.status)">{{ formatStatus(b.status) }}</span></td>
            <td>
              <span v-if="b.fine && b.fine > 0" class="text-danger fw-bold">
                {{ formatPrice(b.fine) }}
              </span>
              <span v-else class="text-muted">—</span>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="totalFine > 0" class="alert alert-warning mt-3">
        <strong>Total Fine:</strong> {{ formatPrice(totalFine) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BorrowHistoryList",
  props: { borrows: { type: Array, default: () => [] } },
  mounted() {
    // Debug: log dữ liệu để kiểm tra
    console.log("Borrow history data:", this.borrows);
  },
  computed: {
    totalFine() {
      return this.borrows.reduce((sum, b) => sum + (b.fine || 0), 0);
    }
  },
  methods: {
    format(d) { 
      if (!d) return "-"; 
      return new Date(d).toLocaleDateString('en-GB');
    },
    formatPrice(p) {
      if (!p && p !== 0) return "$0.00";
      return Number(p).toLocaleString("en-US", { style: "currency", currency: "USD" });
    },
    formatStatus(s) {
      const statusMap = {
        processing: "Processing",
        accepted: "Accepted",
        refused: "Refused",
        returned: "Returned",
        overdue: "Overdue"
      };
      return statusMap[s] || s;
    },
    statusClass(s) {
      switch (s) {
        case "processing": return "badge bg-warning text-dark";
        case "accepted": return "badge bg-success";
        case "refused": return "badge bg-danger";
        case "returned": return "badge bg-secondary";
        case "overdue": return "badge bg-danger";
        default: return "badge bg-light text-dark";
      }
    },
    isOverdue(borrow) {
      if (borrow.status === 'returned') return false;
      const returnDate = new Date(borrow.returnDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today > returnDate;
    }
  }
};
</script>

<style scoped>
.table {
  font-size: 0.95rem;
}
</style>
