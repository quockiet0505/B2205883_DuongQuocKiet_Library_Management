<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Staff Management</h3>

    <!--  Chỉ admin mới thấy nút Add -->
    <button v-if="isAdmin" class="btn btn-primary mb-3" @click="openAddForm">
      <i class="fas fa-plus"></i> Add Staff
    </button>

    <SearchBar placeholder="Search staff by name or email..." @search="handleSearch" />

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p>Loading staff data...</p>
    </div>

    <table
      v-else-if="filteredStaffs.length"
      class="table table-striped table-bordered align-middle"
    >
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Position</th>
          <th width="150px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in filteredStaffs" :key="s._id">
          <td>{{ s._id.slice(-6).toUpperCase() }}</td>
          <td>{{ s.fullName }}</td>
          <td>{{ s.email }}</td>
          <td>{{ s.phone }}</td>

          <!--  Dùng s.position thay vì s.role -->
          <td>
            <span :class="s.position === 'Admin' ? 'badge bg-primary' : 'badge bg-secondary'">
              {{ s.position }}
            </span>
          </td>

          <td>
            <!--  Chỉ Admin mới có quyền Edit/Delete -->
            <div v-if="isAdmin">
              <button class="btn btn-sm btn-warning me-1" @click="editStaff(s)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="deleteStaff(s._id)">Delete</button>
            </div>

            <!--  Staff chỉ có thể sửa chính họ -->
            <div v-else-if="currentUser && s._id === currentUser._id">
              <button class="btn btn-sm btn-warning me-1" @click="editStaff(s)">Edit</button>
            </div>

            <div v-else>
              <small class="text-muted">No permission</small>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="alert alert-info">No staff found.</div>

    <!-- Modal -->
    <div v-if="showForm" class="modal-backdrop">
      <div class="modal-dialog">
        <div class="modal-content p-3">
          <StaffForm :staff="selected" @save="saveStaff" @cancel="closeForm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import StaffForm from "./form/StaffForm.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "StaffList",
  components: { SearchBar, StaffForm },
  data() {
    return {
      staffs: [],
      searchQuery: "",
      showForm: false,
      selected: null,
      loading: false,
    };
  },

  computed: {
    ...mapGetters("admin", ["adminInfo"]),
    currentUser() {
      return this.adminInfo;
    },

    isAdmin() {
      return (
        this.currentUser?.position === "Admin" ||
        this.currentUser?.position === "Manager"
      );
    },

    filteredStaffs() {
      let list = [...this.staffs];

      if (!this.isAdmin) {
        list = list.filter((s) => s._id === this.currentUser?._id);
      }

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        list = list.filter(
          (s) =>
            s.fullName.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q)
        );
      }

      return list;
    },
  },

  methods: {
    ...mapActions("admin", ["fetchCurrentAdmin", "fetchStaffs"]),

    async initData() {
      this.loading = true;
      try {
        // ✅ Lấy thông tin admin hiện tại từ store
        await this.fetchCurrentAdmin();

        // ✅ Lấy danh sách nhân viên
        await this.fetchStaffs();
        this.staffs = this.$store.getters["admin/allStaffs"];
      } catch (e) {
        console.error("Failed to load data:", e);
      } finally {
        this.loading = false;
      }
    },

    handleSearch(q) {
      this.searchQuery = q;
    },

    openAddForm() {
      this.selected = null;
      this.showForm = true;
    },

    editStaff(staff) {
      this.selected = staff;
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
    },
  },

  async created() {
    await this.initData();
  },
};
</script>


<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
