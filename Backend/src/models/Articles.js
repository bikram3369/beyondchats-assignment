const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["heading", "paragraph", "image", "list"],
      required: true
    },
    level: String,
    text: String,
    html: String,
    src: String,
    alt: String,
    ordered: Boolean,
    items: [String]
  },
  { _id: false }
);

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      name: String,
      profile: String
    },
    publishedDate: String,
    category: String,
    content: [ContentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
