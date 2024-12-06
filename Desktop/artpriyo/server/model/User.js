const mongoose = require("mongoose");

const authSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    description:{type:String},
    accountType: {
      type: String,
      enum: ["Admin", "User"],
      required: true,
    },
    password: { type: String, required: true },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "events"}],
    connections: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      connectedAt: { type: Date, default: Date.now }
    }],
    requestConnections: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      requestedAt: { type: Date, default: Date.now }
    }],
    pendingConnections: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      pendingAt: { type: Date, default: Date.now } 
    }],
    bestrank: { type: mongoose.Schema.Types.ObjectId, ref: "medals" },
    first: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    second: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    third: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    top10: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
    transactionHistory: [
      { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
    ],
    points: { type: Number },
    isLoggedIn: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("users", authSchema);
module.exports = User;
