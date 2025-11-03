<template>
  <div>
    <AdminLayout>
      <div class="container mt-4">
        <ReaderList :readers="readers" />
      </div>
    </AdminLayout>
  </div>
</template>

<script>
import AdminLayout from "@/components/admin/AdminLayout.vue";
import ReaderList from "@/components/admin/ReaderList.vue";
import { mapGetters } from "vuex";

export default {
  components: { AdminLayout, ReaderList },
  computed: mapGetters("admin", ["allReaders"]),
  data() {
    return { readers: [] };
  },
  async created() {
    await this.$store.dispatch("admin/fetchReaders");
    this.readers = this.allReaders;
  }
};
</script>
