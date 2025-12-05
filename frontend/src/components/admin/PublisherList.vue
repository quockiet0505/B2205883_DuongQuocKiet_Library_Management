<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Publisher Management</h3>

    <button class="btn btn-primary mb-3" @click="openAddForm">
      <i class="fas fa-plus"></i> Add Publisher
    </button>

    <SearchBar placeholder="Search by name..." @search="handleSearch" />

    <div v-if="!paginatedPublishers.length" class="alert alert-info">
      No publishers found.
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th width="150px">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in paginatedPublishers" :key="p._id">
          <td>{{ p.name }}</td>
          <td>{{ p.address || "—" }}</td>

          <td>
            <button class="btn btn-sm btn-warning me-2" @click="openEditForm(p)">
              <i class="fas fa-edit"></i>
            </button>

            <button class="btn btn-sm btn-danger" @click="confirmDelete(p._id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <Pagination
      v-model="page"
      :total="filteredPublishers.length"
      :size="pageSize"
    />

    <!-- Modal -->
    <div v-if="showForm" class="modal-backdrop">
      <div class="modal-dialog modal-lg">
        <div class="modal-content p-3">
          <PublisherForm
            :publisher="editPub"
            @save="savePublisher"
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
import PublisherForm from "./form/PublisherForm.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import Pagination from "@/components/common/Pagination.vue";
import publisherService from "@/services/publisher.service";

export default {
  components: { SearchBar, PublisherForm, ConfirmModal, Pagination },

  data() {
    return {
      publishers: [],
      searchQuery: "",
      editPub: null,
      showForm: false,

      // pagination
      page: 1,
      pageSize: 10,
    };
  },

  computed: {
    filteredPublishers() {
      return this.publishers
        .filter(p =>
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .sort((a, b) =>
          new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
        );
    },

    paginatedPublishers() {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredPublishers.slice(start, start + this.pageSize);
    }
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      const res = await publisherService.getAllPublishers();
      this.publishers = res.data || res;
    },

    handleSearch(q) {
      this.searchQuery = q;
      this.page = 1; // Reset page
    },

    openAddForm() {
      this.editPub = null;
      this.showForm = true;
    },

    openEditForm(pub) {
      this.editPub = { ...pub };
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
      this.editPub = null;
    },

    async savePublisher(data) {
      try {
        if (this.editPub?._id) {
          await publisherService.updatedPublisher(this.editPub._id, data);
          this.$toast("Publisher updated successfully!", "success");
        } else {
          await publisherService.createPublisher(data);
          this.$toast("Publisher added successfully!", "success");
        }

        await this.fetchData();
        this.closeForm();

      } catch (err) {
        this.$toast(err.response?.data?.message || "Failed to save publisher", "error");
      }
    },

    confirmDelete(id) {
      this.$refs.confirmModal.open(
        "Are you sure you want to delete this publisher?",
        async () => {
          try {
            await publisherService.deletePublisher(id);
            await this.fetchData();
            this.$toast("Publisher deleted!", "success");
          } catch (err) {
            this.$toast("Delete failed!", "error");
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
</style>
