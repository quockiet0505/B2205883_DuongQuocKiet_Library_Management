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
          <th style="width: 150px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pub in filteredPublishers" :key="pub._id">
          <td>{{ pub.name }}</td>
          <td>{{ pub.address || "—" }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="openEditForm(pub)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" @click="deletePublisher(pub._id)">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showForm" class="modal-backdrop">
      <div class="modal-dialog">
        <div class="modal-content p-3">
          <PublisherForm
            :publisher="editPub"
            @save="savePublisher"
            @cancel="closeForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import PublisherForm from "./form/PublisherForm.vue";
import publisherService from "@/services/publisher.service";

export default {
  name: "PublisherList",
  components: { SearchBar, PublisherForm },
  data() {
    return {
      publishers: [],
      searchQuery: "",
      showForm: false,
      editPub: null,
    };
  },
  async created() {
    await this.fetchData();
  },
  computed: {
    filteredPublishers() {
      const q = this.searchQuery.toLowerCase();
      return this.publishers.filter((p) => p.name.toLowerCase().includes(q));
    },
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
          await publisherService.updatePublisher(this.editPub._id, data);
          alert("Publisher updated successfully!");
        } else {
          await publisherService.createPublisher(data);
          alert("Publisher added successfully!");
        }
        await this.fetchData();
        this.closeForm();
      } catch (e) {
        alert(e.response?.data?.message || "Failed to save publisher");
      }
    },
    async deletePublisher(id) {
      if (!confirm("Are you sure to delete this publisher?")) return;
      await publisherService.deletePublisher(id);
      await this.fetchData();
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
