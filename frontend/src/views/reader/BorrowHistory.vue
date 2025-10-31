
<template>
    <ReaderLayout>
    <div class="container mt-4">
      <BorrowHistoryList :borrows="borrowHistory" />
    </div>
  </ReaderLayout>
</template>

<script>
import ReaderLayout from "@/components/reader/ReaderLayout.vue";
import BorrowHistoryList from "@/components/reader/BorrowHistoryList.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReaderBorrowHistory",
  components: { ReaderLayout, BorrowHistoryList },
  computed: {
    ...mapGetters("reader", ["isLoggedIn", "borrowHistory"]),
  },
  async created() {
    if (!this.isLoggedIn) {
      this.$router.push("/reader/login");
      return;
    }
    await this.fetchBorrowHistory();
  },
  methods: {
    ...mapActions("reader", ["fetchBorrowHistory"]),
  },
};
</script>
