<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Borrow Management</h3>

    <SearchBar 
      placeholder="Search by reader name or book title..." 
      @search="handleSearch"
    />

    <div v-if="!filteredBorrows || filteredBorrows.length === 0" class="alert alert-info">
      No borrow records found.
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Reader</th>
          <th>Book</th>
          <th>Quantity</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in filteredBorrows" :key="b._id">
          <td>{{ formatId(b._id) }}</td>
          <td>
            <div v-if="b.readerId && typeof b.readerId === 'object'">
              {{ b.readerId.firstName }} {{ b.readerId.lastName }}
            </div>
            <span v-else>—</span>
          </td>
          <td>
            <div v-if="b.bookId && typeof b.bookId === 'object'">
              {{ b.bookId.title }}
            </div>
            <span v-else>—</span>
          </td>
          <td class="text-center">{{ b.quantity }}</td>
          <td>{{ formatDate(b.borrowDate) }}</td>
          <td>{{ formatDate(b.returnDate) }}</td>
          <td>
            <span :class="getBadge(b.status)">
              {{ b.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  name: "BorrowList",
  components: { SearchBar },
  props: {
    borrows: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      searchQuery: ""
    };
  },
  computed: {
    filteredBorrows() {
      if (!this.searchQuery) return this.borrows;
      
      const query = this.searchQuery.toLowerCase();
      return this.borrows.filter(b => {
        const readerName = b.readerId && typeof b.readerId === 'object' 
          ? `${b.readerId.firstName} ${b.readerId.lastName}`.toLowerCase()
          : '';
        const bookTitle = b.bookId && typeof b.bookId === 'object'
          ? b.bookId.title.toLowerCase()
          : '';
        
        return readerName.includes(query) || bookTitle.includes(query);
      });
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
    formatId(id) {
      return id ? id.substring(id.length - 6).toUpperCase() : "—";
    },
    formatDate(d) {
      if (!d) return "—";
      return new Date(d).toLocaleDateString("en-GB");
    },
    getBadge(status) {
      const map = {
        processing: "badge bg-warning",
        accepted: "badge bg-success",
        refused: "badge bg-danger",
        returned: "badge bg-secondary"
      };
      return map[status] || "badge bg-light";
    }
  }
};
</script>
