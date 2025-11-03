<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Publisher Management</h3>

    <SearchBar 
      placeholder="Search by publisher name..." 
      @search="handleSearch"
    />

    <div v-if="!filteredPublishers || filteredPublishers.length === 0" class="alert alert-info">
      No publishers found.
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Publisher ID</th>
          <th>Name</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pub in filteredPublishers" :key="pub._id">
          <td>{{ pub.publisherId }}</td>
          <td>{{ pub.name }}</td>
          <td>{{ pub.address || "—" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  name: "PublisherList",
  components: { SearchBar },
  props: {
    publishers: {
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
    filteredPublishers() {
      if (!this.searchQuery) return this.publishers;
      
      const query = this.searchQuery.toLowerCase();
      return this.publishers.filter(pub => 
        pub.name.toLowerCase().includes(query)
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
