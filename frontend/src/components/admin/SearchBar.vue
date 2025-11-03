<template>
  <div class="search-bar mb-3">
    <form class="d-flex" @submit.prevent="handleSearch">
      <div class="input-group search-container">
        <input
          type="text"
          class="form-control search-input"
          :placeholder="placeholder"
          v-model="searchQuery"
        />
        <button type="submit" class="btn search-btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    placeholder: {
      type: String,
      default: "Tìm kiếm..."
    }
  },
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.searchQuery);
    }
  }
};
</script>

<style scoped>
.search-form {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.search-container {
  position: relative;
  height: 45px;
  border-radius: 8px;
  border: 1px solid #ccc;
  overflow: hidden;
  width: 100%;
  max-width: 500px;
}

.search-input {
  border: none !important;
  padding: 0.5rem 1rem;
  height: 100%;
  font-size: 1.1rem;
}

.search-input:focus {
  outline: none;
  box-shadow: none;
}

.search-btn {
  background-color: #0d6efd;
  color: white;
  border: 1px solid #0d6efd;
  height: 100%;
  border-radius: 0 8px 8px 0;
  padding: 0 16px;
  font-size: 1.1rem;
  transition: background-color 0.2s;
}

.search-btn:hover {
  background-color: #0b5ed7;
}
</style>
