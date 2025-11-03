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
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in borrows" :key="b._id">
            <!-- Cột Book: hiển thị title + author -->
            <td>
              <div v-if="b.bookId && typeof b.bookId === 'object'">
                <div class="fw-bold">{{ b.bookId.title || "—" }}</div>
                <small class="text-muted">{{ b.bookId.author || "" }}</small>
              </div>
              <div v-else class="text-warning">
                Book ID: {{ b.bookId || "—" }} (not populated)
              </div>
            </td>

            <!-- Cột Quantity -->
            <td class="text-center">{{ b.quantity || "—" }}</td>

            <!-- Cột Borrow Date -->
            <td>{{ format(b.borrowDate) }}</td>

            <!-- Cột Return Date + Overdue badge -->
            <td>
              {{ format(b.returnDate) }}
              <span v-if="isOverdue(b)" class="badge badge-overdue ms-1">Overdue</span>
            </td>

            <!-- Cột Status -->
            <td>
              <span :class="statusClass(b.status)">{{ formatStatus(b.status) }}</span>
            </td>

            <!-- Cột Fine -->
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
        case "processing": return "badge badge-processing";
        case "accepted": return "badge badge-accepted";
        case "refused": return "badge badge-refused";
        case "returned": return "badge badge-returned";
        case "overdue": return "badge badge-overdue";
        default: return "badge badge-light";
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

/* Badge màu nhẹ nhàng hợp nền be */
.badge {
  font-size: 0.85rem;
}

/* Status badges */
.badge-processing {
  background-color: #FDE68A !important; /* vàng nhạt */
  color: #78350F !important;
}
.badge-accepted {
  background-color: #A7F3D0 !important; /* xanh nhạt */
  color: #065F46 !important;
}
.badge-refused {
  background-color: #FCA5A5 !important; /* đỏ nhạt */
  color: #991B1B !important;
}
.badge-returned {
  background-color: #E5E5CB !important; /* be nhạt */
  color: #4B5563 !important;
}
.badge-overdue {
  background-color: #FCA5A5 !important; /* đỏ nhạt */
  color: #991B1B !important;
}
</style>
