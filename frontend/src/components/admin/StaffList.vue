<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Staff Management</h3>
    
    <SearchBar 
      placeholder="Search by name or email..." 
      @search="handleSearch"
    />

    <div v-if="!filteredStaffs || filteredStaffs.length === 0" class="alert alert-info">
      No staff found.
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Staff ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Position</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="staff in filteredStaffs" :key="staff._id">
          <td>{{ staff.staffId }}</td>
          <td>{{ staff.fullName }}</td>
          <td>{{ staff.email }}</td>
          <td>{{ staff.phone }}</td>
          <td>
            <span :class="staff.position === 'Manager' ? 'badge bg-primary' : 'badge bg-secondary'">
              {{ staff.position }}
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
  name: "StaffList",
  components: { SearchBar },
  props: {
    staffs: {
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
    filteredStaffs() {
      if (!this.searchQuery) return this.staffs;
      
      const query = this.searchQuery.toLowerCase();
      return this.staffs.filter(staff => 
        staff.fullName.toLowerCase().includes(query) ||
        staff.email.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    }
  }
};
</script>
