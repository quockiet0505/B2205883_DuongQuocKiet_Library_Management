<template>
  <div class="container my-4">
    <h3 class="fw-bold mb-3">Publisher Management</h3>

    <button class="btn btn-primary mb-3" @click="openAddForm">
      <i class="fas fa-plus"></i> Add Publisher
    </button>

    <SearchBar placeholder="Search by name..." @search="handleSearch" />

    <div v-if="!filteredPublishers.length" class="alert alert-info">No publishers found.</div>

    <table v-else class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th width="150px">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in filteredPublishers" :key="p._id">
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
import publisherService from "@/services/publisher.service";

export default {
  components: { SearchBar, PublisherForm, ConfirmModal },

  data() {
    return {
      publishers: [],
      searchQuery: "",
      editPub: null,
      showForm: false,
    };
  },

  computed: {
    filteredPublishers() {
      return this.publishers.filter((p) =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },

  async created() {
    await this.fetchData();
  },

  methods: {
    async fetchData() {
      this.publishers = await publisherService.getAllPublishers();
    },

    handleSearch(q) {
      this.searchQuery = q;
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
          } catch (e) {
            this.$toast("Delete failed!", "error");
          }
        }
      );
    },
  },
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
