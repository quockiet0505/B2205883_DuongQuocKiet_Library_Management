<template>
  <div>
    <AdminLayout>
      <div class="container mt-4">
        <StaffList :staffs="staffs" />
      </div>
    </AdminLayout>
  </div>
</template>

<script>
import AdminLayout from "@/components/admin/AdminLayout.vue";
import StaffList from "@/components/admin/StaffList.vue";
import { mapGetters } from "vuex";

export default {
  components: { AdminLayout, StaffList },
  computed: mapGetters("admin", ["allStaffs"]),
  data() {
    return { staffs: [] };
  },
  async created() {
    await this.$store.dispatch("admin/fetchStaffs");
    this.staffs = this.allStaffs;
  }
};
</script>
