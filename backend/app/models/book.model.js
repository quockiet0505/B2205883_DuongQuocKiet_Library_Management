const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    publishYear: {
      type: Number,
    },
    publisherId: {
      type: String,
      ref: "Publisher",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, // URL ảnh bìa sách
    },

    description: {
      type: String,
    },
    
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
   
  },
  { timestamps: true }

  
);

module.exports = mongoose.model("Book", bookSchema);
