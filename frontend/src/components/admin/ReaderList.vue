<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Reader Management</h3>

    <button class="btn btn-primary mb-3" @click="openAddForm">
      <i class="fas fa-plus"></i> Add Reader
    </button>

    <SearchBar placeholder="Search reader by name or email..." @search="handleSearch" />

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p>Loading readers...</p>
    </div>

    <table v-else-if="filteredReaders.length" class="table table-striped table-bordered align-middle">
      <thead class="table-dark">
        <tr>
          <!-- <th>ID</th> -->
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Birth Date</th>
          <th width="150px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in filteredReaders" :key="r._id">
          <!-- <td>{{ r._id.slice(-6).toUpperCase() }}</td> -->
          <td>{{ r.firstName }} {{ r.lastName }}</td>
          <td>{{ r.email }}</td>
          <td>{{ r.phone || "—" }}</td>
          <td>{{ formatDate(r.birthDate) }}</td>

          <td>
            <button class="btn btn-sm btn-warning me-2" @click="editReader(r)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteReader(r._id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>

          <!-- <td>
            <button class="btn btn-sm btn-warning me-1" @click="editReader(r)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="deleteReader(r._id)">Delete</button>
          </td> -->
        </tr>
      </tbody>
    </table>

    <div v-else class="alert alert-info">No readers found.</div>

    <!-- Modal Form (GIỐNG BOOK 100%) -->
    <div v-if="showForm" class="modal-backdrop">
      <div class="modal-dialog modal-lg">
        <div class="modal-content p-3">
          <ReaderForm
            :reader="selected"
            @save="saveReader"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>

    <ConfirmModal ref="confirmModal" />
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import ReaderForm from "./form/ReaderForm.vue";
import readerService from "@/services/reader.service";
import ConfirmModal from "@/components/common/ConfirmModal.vue";

export default {
  name: "ReaderList",
  components: { SearchBar, ReaderForm, ConfirmModal },

  data() {
    return {
      readers: [],
      selected: null,
      showForm: false,
      searchQuery: "",
      loading: false,
    };
  },

  async created() {
    await this.fetchData();
  },

  computed: {
    filteredReaders() {
      const q = this.searchQuery.toLowerCase();
      return this.readers.filter((r) =>
        (`${r.firstName} ${r.lastName}`).toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q)
      );
    },
  },

  methods: {
    async fetchData() {
      this.loading = true;

      try {
        const res = await readerService.getAllReaders();
        this.readers = res.data || res;
      } catch (e) {
        this.$toast("Failed to load readers!", "error");
      }

      this.loading = false;
    },

    openAddForm() {
      this.selected = null;
      this.showForm = true;
    },

    editReader(r) {
      this.selected = { ...r };
      this.showForm = true;
    },

    closeForm() {
      this.selected = null;
      this.showForm = false;
    },

    async saveReader(data) {
      try {
        if (this.selected?._id) {
          await readerService.updateReader(this.selected._id, data);
          this.$toast("Reader updated successfully!", "success");
        } else {
          await readerService.createReader(data);
          this.$toast("Reader created successfully!", "success");
        }

        await this.fetchData();
        this.closeForm();
      } catch (err) {
        this.$toast(err.response?.data?.message || "Failed to save reader!", "error");
      }
    },

    async deleteReader(id) {
      this.$refs.confirmModal.open(
        "Are you sure you want to delete this reader?",
        async () => {
          try {
            await readerService.deleteReader(id);
            await this.fetchData();
            this.$toast("Reader deleted!", "success");
          } catch (e) {
            this.$toast("Delete failed!", "error");
          }
        }
      );
    },

    formatDate(d) {
      return d ? new Date(d).toLocaleDateString("en-GB") : "—";
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
</style>
