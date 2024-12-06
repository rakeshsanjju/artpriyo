const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "events"},
    post: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);
module.exports = Comment;
