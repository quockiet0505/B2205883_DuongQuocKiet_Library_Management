
<template>
  <div class="card h-100 shadow-sm border-0">
    <img :src="book.thumbnail || defaultImage" class="card-img-top" alt="cover" style="height:220px;object-fit:cover" />
    <div class="card-body d-flex flex-column">
      <h6 class="card-title text-truncate">{{ book.title }}</h6>
      <p class="small text-muted mb-1">Author: {{ book.author }}</p>
      <p class="small text-muted mb-2">Price: {{ formatPrice(book.price) }}</p>
      <div class="mt-auto text-center">
        <router-link :to="`/reader/book/${book.id}`" class="btn btn-sm btn-primary">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BookCard",
  props: { book: { type: Object, required: true } },
  data() { return { defaultImage: "/assets/images/book-placeholder.png" }; },
  methods: {
    formatPrice(v) { if (v == null) return "-"; return new Intl.NumberFormat().format(v) + "₫"; }
  },
};
</script>
