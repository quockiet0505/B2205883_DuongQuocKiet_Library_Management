
<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <BorrowHistoryList :borrows="borrowHistory" />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/reader/AppHeader.vue";
import AppFooter from "@/components/reader/AppFooter.vue";
import BorrowHistoryList from "@/components/reader/BorrowHistoryList.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReaderBorrowHistory",
  components: { AppHeader, AppFooter, BorrowHistoryList },
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
