<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Staff Management</h3>

    <!-- Admin mới được thêm -->
    <button v-if="isAdmin" class="btn btn-primary mb-3" @click="openAddForm">
      <i class="fas fa-plus"></i> Add Staff
    </button>

    <SearchBar placeholder="Search staff by name or email..." @search="handleSearch" />

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p>Loading staff data...</p>
    </div>

    <table v-else-if="filteredStaffs.length" class="table table-striped table-bordered align-middle">
      <thead class="table-dark">
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Position</th>
          <th width="150px">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="s in filteredStaffs" :key="s._id">
          <td>{{ s.fullName }}</td>
          <td>{{ s.email }}</td>
          <td>{{ s.phone }}</td>

          <td>
            <span :class="s.position === 'Admin' ? 'badge bg-primary' : 'badge bg-secondary'">
              {{ s.position }}
            </span>
          </td>

          <td>
            <!-- Admin được full quyền -->
            <div v-if="isAdmin">
              <button class="btn btn-sm btn-warning me-1" @click="editStaff(s)">
                <i class="fas fa-edit"></i>
                
              </button>
              <button class="btn btn-sm btn-danger" @click="deleteStaff(s._id)">
                <i class="fas fa-trash"></i>
              </button>
            </div>

            <!-- Staff thường chỉ sửa chính họ -->
            <div v-else-if="currentUser && currentUser._id === s._id">
              <button class="btn btn-sm btn-warning me-1" @click="editStaff(s)">
                <i class="fas fa-edit"></i>
                
              </button>
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

    <ConfirmModal ref="confirmModal" />
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import StaffForm from "./form/StaffForm.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import staffService from "@/services/staff.service";

export default {
  components: { SearchBar, StaffForm, ConfirmModal },

  data() {
    return {
      staffs: [],
      searchQuery: "",
      showForm: false,
      selected: null,
      loading: false,
      currentUser: null,
    };
  },

  computed: {
    isAdmin() {
      return (
        this.currentUser?.position === "Admin" ||
        this.currentUser?.position === "Manager"
      );
    },

    filteredStaffs() {
      let list = [...this.staffs];

      // Staff thường chỉ xem bản thân
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
    async fetchData() {
      try {
        this.loading = true;

        const all = await staffService.getAllStaffs();
        this.staffs = all.data || all;

        const me = await staffService.getStaffById(localStorage.getItem("adminId"));
        this.currentUser = me.data || me;

      } catch (err) {
        this.$toast("Failed to load staff!", "error");
      }
      this.loading = false;
    },

    handleSearch(q) {
      this.searchQuery = q;
    },

    openAddForm() {
      this.selected = null;
      this.showForm = true;
    },

    editStaff(staff) {
      this.selected = { ...staff };
      this.showForm = true;
    },

    closeForm() {
      this.selected = null;
      this.showForm = false;
    },

    async saveStaff(data) {
      try {
        if (this.selected?._id) {
          await staffService.updateStaff(this.selected._id, data);
          this.$toast("Staff updated!", "success");
        } else {
          await staffService.createStaff(data);
          this.$toast("Staff added!", "success");
        }

        this.closeForm();
        this.fetchData();

      } catch (err) {
        this.$toast(err.response?.data?.message || "Failed to save staff", "error");
      }
    },

    deleteStaff(id) {
      this.$refs.confirmModal.open("Are you sure you want to delete this staff?", async () => {
        try {
          await staffService.deleteStaff(id);
          this.$toast("Staff deleted!", "success");
          this.fetchData();
        } catch (err) {
          this.$toast("Delete failed!", "error");
        }
      });
    },
  },

  async created() {
    await this.fetchData();
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
