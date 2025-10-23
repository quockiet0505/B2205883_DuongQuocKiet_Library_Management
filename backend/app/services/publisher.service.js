const Publisher = require("../models/publisher.model");
const ApiError = require("../utils/api-error");

class PublisherService {
    // Tao nha xuat ban moi
    static async createPublisher(data) {
        if (!data || !data.publisherId || !data.name) {
            throw ApiError.badRequest("Publisher ID and name are required");
        }

        const existPublisher = await Publisher.findOne({
            $or: [{ publisherId: data.publisherId }, { name: data.name }]
        });
        if (existPublisher) throw ApiError.conflict("Publisher already exists");

        const newPublisher = new Publisher(data);
        await newPublisher.save();
        return newPublisher;
    }

    // Lay tat ca nha xuat ban
    static async getAllPublishers() {
        return await Publisher.find({ deleted: false });
    }

    // Lay nha xuat ban theo id
    static async getPublisherById(id) {
        if (!id) throw ApiError.badRequest("Publisher ID is required");

        const publisher = await Publisher.findOne({ _id: id, deleted: false });
        if (!publisher) throw ApiError.notFound("Publisher not found");
        return publisher;
    }

    // Cap nhat nha xuat ban
    static async updatePublisher(id, data) {
        if (!id) throw ApiError.badRequest("Publisher ID is required");

        const publisher = await Publisher.findOne({ _id: id, deleted: false });
        if (!publisher) throw ApiError.notFound("Publisher not found");

        Object.assign(publisher, data);
        await publisher.save();
        return publisher;
    }

    // Xoa nha xuat ban (soft delete)
    static async deletePublisher(id) {
        if (!id) throw ApiError.badRequest("Publisher ID is required");

        const publisher = await Publisher.findOne({ _id: id, deleted: false });
        if (!publisher) throw ApiError.notFound("Publisher not found");

        publisher.deleted = true;
        publisher.deletedAt = new Date();
        await publisher.save();
        return { message: "Publisher soft-deleted successfully" };
    }

    // Xoa nha xuat ban (hard delete)
    static async hardDeletePublisher(id) {
        if (!id) throw ApiError.badRequest("Publisher ID is required");

        const publisher = await Publisher.findById(id);
        if (!publisher) throw ApiError.notFound("Publisher not found");

        await Publisher.deleteOne({ _id: id });
        return { message: "Publisher permanently deleted" };
    }
}

module.exports = PublisherService;
