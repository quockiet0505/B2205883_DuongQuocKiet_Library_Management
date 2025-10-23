const PublisherService = require("../services/publisher.service");

class PublisherController {
    static async createPublisher(req, res, next) {
        try {
            const publisher = await PublisherService.createPublisher(req.body);
            res.status(201).json({
                message: "Publisher created successfully",
                data: publisher,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getAllPublishers(req, res, next) {
        try {
            const publishers = await PublisherService.getAllPublishers();
            res.status(200).json({
                message: "Publishers retrieved successfully",
                data: publishers,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getPublisherById(req, res, next) {
        try {
            const publisher = await PublisherService.getPublisherById(req.params.id);
            res.status(200).json({
                message: "Publisher retrieved successfully",
                data: publisher,
            });
        } catch (err) {
            next(err);
        }
    }

    static async updatePublisher(req, res, next) {
        try {
            const publisher = await PublisherService.updatePublisher(req.params.id, req.body);
            res.status(200).json({
                message: "Publisher updated successfully",
                data: publisher,
            });
        } catch (err) {
            next(err);
        }
    }

    static async deletePublisher(req, res, next) {
        try {
            const result = await PublisherService.deletePublisher(req.params.id);
            res.status(200).json({
                message: "Publisher deleted successfully",
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = PublisherController;
