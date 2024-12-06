const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    eventType: { type: mongoose.Schema.Types.ObjectId, ref: "eventtypes" },
    eventName : {type:String,required:true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    entryFee: { type: Number, required: true },
    prizeMoney: { type: Number, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    eventImage: { type: String },
    mediaType: { type: String, enum: ["Image", "Video", "Audio"] },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  },
  { timestamps: true }
);

const Events = mongoose.model("events", eventSchema);
module.exports = Events;
