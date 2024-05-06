const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  type: { type: String, required: true }, // meal, sleep start, sleep end, nap start, nap end
  notes: {
    type: String,
  },
  eventTime: {
    // editable later
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", EventSchema);
