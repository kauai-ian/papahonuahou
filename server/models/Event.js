const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventType: { type: String, required: true }, // meal, sleep, nap, diaper
  notes: {
    type: String,
  },
  eventStart: {
    // editable later
    type: Date,
    default: Date.now,
  },
  eventEnd: {
    // editable later
    type: Date,
    default: Date.now,
  },
  dayId: {
    type: Schema.Types.ObjectId,
    ref: "Day",
    required: true,
  },
});

module.exports = mongoose.model("Event", EventSchema);
