<template>
  <div>
    <AdminLayout>
      <div class="container mt-4">
        <PublisherList :publishers="publishers" />
      </div>
    </AdminLayout>
  </div>
</template>

<script>
import AdminLayout from "@/components/admin/AdminLayout.vue";
import PublisherList from "@/components/admin/PublisherList.vue";
import { mapGetters } from "vuex";

export default {
  components: { AdminLayout, PublisherList },
  computed: mapGetters("admin", ["allPublishers"]),
  data() {
    return { publishers: [] };
  },
  async created() {
    await this.$store.dispatch("admin/fetchPublishers");
    this.publishers = this.allPublishers;
  }
};
</script>
