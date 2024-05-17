// events (ref to events) (list of events)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function GetTodayMidnight() {
  let today = new Date();
  today.setHours(0, 1, 0, 0); // Set hours to 0 (midnight), minutes to 1, seconds to 0, and milliseconds to 0
  return today;
}

const DaySchema = new Schema({
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  dayStart: {
    type: Date,
    default: GetTodayMidnight,
  },
  totalSleepTime: {
    type: Number, default: 0 // in hours
  },
  totalSleepEvents: {
    type: Number, default: 0
  },
  totalNapTime: {
    type: Number, default: 0 // in hours
  },
  totalNapEvents: {
    type: Number, default: 0
  },
  totalMealEvents: {
    type: Number, default: 0
  },
  
});

module.exports = mongoose.model("Day", DaySchema);
