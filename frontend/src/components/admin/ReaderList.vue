<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Reader Management</h3>
    
    <SearchBar 
      placeholder="Search by name or email..." 
      @search="handleSearch"
    />

    <div v-if="!filteredReaders || filteredReaders.length === 0" class="alert alert-info">
      No readers found.
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Reader ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in filteredReaders" :key="reader._id">
          <td>{{ reader.readerId }}</td>
          <td>{{ reader.firstName }} {{ reader.lastName }}</td>
          <td>{{ reader.email }}</td>
          <td>{{ reader.phone }}</td>
          <td>{{ formatDate(reader.dateOfBirth) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  name: "ReaderList",
  components: { SearchBar },
  props: {
    readers: {
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
    filteredReaders() {
      if (!this.searchQuery) return this.readers;
      
      const query = this.searchQuery.toLowerCase();
      return this.readers.filter(reader => 
        `${reader.firstName} ${reader.lastName}`.toLowerCase().includes(query) ||
        reader.email.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
    formatDate(d) {
      if (!d) return "—";
      return new Date(d).toLocaleDateString("en-GB");
    }
  }
};
</script>
