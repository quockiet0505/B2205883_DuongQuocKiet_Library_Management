<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Book Management</h3>
    
    <SearchBar 
      placeholder="Search by title or author..." 
      @search="handleSearch"
    />

    <div v-if="!filteredBooks || filteredBooks.length === 0" class="alert alert-info">
      No books found.
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Book ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Year</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredBooks" :key="book._id">
          <td>{{ book.bookId }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.publisherId?.name || "—" }}</td>
          <td>{{ book.publishYear }}</td>
          <td class="text-center">{{ book.quantity }}</td>
          <td>{{ formatPrice(book.price) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  name: "BookList",
  components: { SearchBar },
  props: {
    books: {
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
    filteredBooks() {
      if (!this.searchQuery) return this.books;
      
      const query = this.searchQuery.toLowerCase();
      return this.books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    },
    formatPrice(price) {
      return price ? `$${price.toFixed(2)}` : "—";
    }
  }
};
</script>
