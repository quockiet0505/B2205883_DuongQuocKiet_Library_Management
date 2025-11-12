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
          <tr v-for="b in borrows" :key="b._id">
            <!-- Book -->
            <td>
              <div v-if="b.bookId && typeof b.bookId === 'object'">
                <div class="fw-bold">{{ b.bookId.title || "—" }}</div>
                <small class="text-muted">{{ b.bookId.author || "" }}</small>
              </div>
              <div v-else class="text-warning">
                Book ID: {{ b.bookId || "—" }}
              </div>
            </td>

            <!-- Quantity -->
            <td class="text-center">{{ b.quantity || "—" }}</td>

            <!-- Borrow Date -->
            <td>
              <span v-if="b.borrowDate">{{ format(b.borrowDate) }}</span>
              <span v-else-if="b.status === 'processing'">
                {{ formatTempBorrowDate(b.createdAt) }}
                <small class="text-muted">(Pending)</small>
              </span>
              <span v-else>—</span>
            </td>

            <!-- Return Date -->
            <td>
              <span v-if="b.returnDate">{{ format(b.returnDate) }}</span>
              <span v-else-if="b.status === 'processing'">
                {{ formatTempReturnDate(b.createdAt) }}
                <small class="text-muted">(Expected)</small>
              </span>
              <span v-else>—</span>
            </td>

            <!-- Status -->
            <td>
              <span :class="statusClass(b.status)">
                {{ formatStatus(b.status) }}
              </span>
            </td>

            <!-- Fine -->
            <td>
              <span v-if="b.fine && b.fine > 0" class="text-danger fw-bold">
                {{ formatPrice(b.fine) }}
              </span>
              <span v-else class="text-muted">—</span>
            </td>

            <!-- Action -->
            <td>
              <button
                v-if="b.status === 'processing'"
                class="btn btn-sm btn-outline-danger"
                @click="cancelBorrow(b._id)"
                :disabled="b._cancelling"
              >
                <span v-if="b._cancelling">Cancelling...</span>
                <span v-else>Cancel</span>
              </button>
            </td>

          </tr>
        </tbody>
      </table>

      <!-- Total Fine -->
      <div v-if="totalFine > 0" class="alert alert-warning mt-3">
        <strong>Total Fine:</strong> {{ formatPrice(totalFine) }}
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "BorrowHistoryList",
  props: { borrows: { type: Array, default: () => [] } },
  computed: {
    totalFine() {
      return this.borrows.reduce((sum, b) => sum + (b.fine || 0), 0);
    },
  },
  methods: {
    format(d) {
      if (!d) return "-";
      return new Date(d).toLocaleDateString("en-GB");
    },
    formatTempBorrowDate(createdAt) {
      // Ngày mượn tạm thời = ngày tạo yêu cầu
      return this.format(createdAt || new Date());
    },
    formatTempReturnDate(createdAt) {
      // Ngày trả tạm thời = +7 ngày sau ngày tạo
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
      const map = {
        processing: "Processing",
        accepted: "Accepted",
        refused: "Refused",
        returned: "Returned",
        overdue: "Overdue",
        cancelled: "Cancelled",
      };
      return map[s] || s;
    },
    statusClass(s) {
      switch (s) {
        case "processing": return "badge badge-processing";
        case "accepted": return "badge badge-accepted";
        case "refused": return "badge badge-refused";
        case "returned": return "badge badge-returned";
        case "overdue": return "badge badge-overdue";
        case "cancelled": return "badge bg-secondary";
        default: return "badge badge-light";
      }
    },
    async cancelBorrow(id) {
      if (!confirm("Are you sure you want to cancel this borrow request?")) return;

      const idx = this.borrows.findIndex(b => b._id === id);
      if (idx === -1) return;

      // set cờ trạng thái đang hủy
      this.borrows[idx]._cancelling = true;

      try {
        const res = await api.patch(`/borrow/${id}/cancel`);
        const updated = res.data?.data;

        if (updated) {
          this.borrows[idx] = { ...this.borrows[idx], ...updated };
        } else {
          this.borrows[idx].status = "cancelled";
        }

        alert("Borrow request cancelled successfully!");
      } catch (e) {
        alert(e.response?.data?.message || e.message || "Failed to cancel borrow request.");
      } finally {
        this.borrows[idx]._cancelling = false;
      }
    }

  }
}

</script>

<style scoped>
.table { font-size: 0.95rem; }
.badge { font-size: 0.85rem; }

.badge-processing { background-color: #fde68a; color: #78350f; }
.badge-accepted { background-color: #a7f3d0; color: #065f46; }
.badge-refused { background-color: #fca5a5; color: #991b1b; }
.badge-returned { background-color: #e5e5cb; color: #4b5563; }
.badge-overdue { background-color: #fca5a5; color: #991b1b; }
.bg-secondary { background-color: #d1d5db !important; color: #374151 !important; }
</style>
