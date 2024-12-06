const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventImage: { type: String, required: true },
    events:[{type:mongoose.Schema.Types.ObjectId,ref:"events"}]
  },
 
  { timestamps: true }
);

const EventTypes = mongoose.model("eventtypes", eventSchema);
module.exports = EventTypes;
