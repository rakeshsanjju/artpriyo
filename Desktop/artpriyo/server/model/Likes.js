const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "events" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the like was created
  },
  { timestamps: true }
);

const Like = mongoose.model("likes", likeSchema);
module.exports = Like;
