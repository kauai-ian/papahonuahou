const Event = require("../models/Event");
const Day = require("../models/Day");
const response = require("../helpers/response");

const getMidnightDate = (date) => {
  let midnight = new Date(date);
  midnight.setHours(0, 0, 0, 0);
  return midnight;
};

exports.createEvent = async (req, res) => {
  let statusCode = 200;
  try {
    if (!req?.body) {
      statusCode = 400;
      throw new Error("request body is missing");
    }
    const { eventType, notes, eventStart, eventEnd, _id } = req.body;
    if (!eventType || !_id) {
      statusCode = 400;
      throw new Error("Missing required fields");
    }
    const eventDateMidnight = getMidnightDate(eventStart);
    let day = await Day.findOne({ dayStart: eventDateMidnight });

    if (!day) {
      day = new Day({ events: [], dayStart: eventDateMidnight });
      await day.save(); 
      console.log("New day created:", day);
    }

    const newEvent = new Event({
      eventType,
      notes,
      eventStart,
      eventEnd,
      dayId: day._id, 
    });
    await newEvent.save();
    console.log("new event created:", newEvent);

    day.events.push(newEvent._id); 
    await day.save();

    await exports.updateStatistics(day._id);

    return response({
      res,
      status: 201,
      message: "Event created successfully",
      data: day,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: statusCode,
      message: error.message,
    });
  }
};

exports.editEvent = async (req, res) => {
  let statusCode = 200;
  try {
    const { id } = req.params;
    const { eventType, notes, eventStart, eventEnd } = req.body;
    console.log(req.body)
    if (!id || !eventType || !notes || !eventStart || !eventEnd) {
      return response({
        res,
        status: 400,
        message: "missing required fields",
      });
    }

    const event = await Event.findById(id);
    if (!event) {
      return response({
        res,
        status: 404,
        message: "Event not found",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { eventType, notes, eventStart, eventEnd },
      { new: true }
    );

    return response({
      res,
      status: 200,
      message: "event updated",
      data: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: statusCode,
      message: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return response({
        res,
        status: 400,
        message: "missing required fields",
      });
    }

    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return response({
        res,
        status: 404,
        message: "Event not found",
      });
    }

    return response({
      res,
      status: 200,
      message: "Event deleted",
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "Server error",
    });
  }
};



exports.getStatistics = async (req, res) => {
  try {
    const { eventType, eventStart, eventEnd } = req.body;

    if (!['sleep', 'nap', 'meal'].includes(eventType)) {
      return response({
        res,
        status: 400,
        message: "Invalid event type",
      });
    }

    const events = await Event.find({
      eventType,
      eventStart: { $gte: new Date(eventStart), $lte: new Date(eventEnd) },
    });

    let totalEvents = 0;
    let totalSleepTime = 0;
    let totalSleepEvents = 0;
    let totalNapTime = 0;
    let totalNapEvents = 0;
    let totalMealEvents = 0;
    let averageSleepTime = 0;
    let averageNapTime = 0;

    console.log({
      eventType: eventType,
      eventStart: { $gte: new Date(eventStart) },
      eventEnd: { $lte: new Date(eventEnd) }
    });

    events.forEach((event) => {
      totalEvents++; 
      if (
        eventType !== "sleep" &&
        eventType !== "nap" &&
        eventType !== "meal"
      ) {
        return response({
          res,
          status: 400,
          message: "missing required fields",
        });
      }
      if ((eventType === "sleep")) {
        const sleepDuration =
          (event.eventEnd - event.eventStart) / (1000 * 60 * 60);
        totalSleepTime += sleepDuration;
        totalSleepEvents++;
      } else if ((eventType === "nap")) {
        const napDuration =
          (event.eventEnd - event.eventStart) / (1000 * 60 * 60);
        totalNapTime += napDuration;
        totalNapEvents++;
      } else if ((eventType === "meal")) {
        totalMealEvents++;
      }
    });

    if (totalSleepEvents > 0) {
      averageSleepTime = totalSleepTime / totalSleepEvents;
    }
    if (totalNapEvents > 0) {
      averageNapTime = totalNapTime / totalNapEvents;
    }

    const data = {
      totalEvents,
      totalSleepTime,
      totalSleepEvents,
      totalNapTime,
      totalNapEvents,
      totalMealEvents,
      averageSleepTime,
      averageNapTime,
    };

    return response({
      res,
      status: 200,
      message: "Statistics retrieved successfully",
      data: data , // might need to be an object to access the properties 
    });
  } catch (error) {
    console.error(error);
    return response({
      res,
      status: 500,
      message: "An error occurred while fetching statistics",
      error: error.message,
    });
  }
};

exports.updateStatistics = async (dayId) => {
  try {
    const day = await Day.findById(dayId).populate("events");
    if (!day) {
      throw new Error("Day not found");
    }

    let totalSleepTime = 0;
    let totalSleepEvents = 0;
    let totalNapTime = 0;
    let totalNapEvents = 0;
    let totalMealEvents = 0;

    day.events.forEach((event) => {
      const { eventType, eventStart, eventEnd } = event;
      if ( ! ['sleep', 'nap', 'meal'].includes(eventType))
         {
        return response({
          res,
          status: 400,
          message: "invalid event type",
        });
      }

      if (eventType === "sleep") {
        const sleepDuration =
          (new Date(eventEnd) - new Date(eventStart)) / (1000 * 60 * 60);
        totalSleepTime += sleepDuration;
        totalSleepEvents++;
      } else if (eventType === "nap") {
        const napDuration =
          (new Date(eventEnd) - new Date(eventStart)) / (1000 * 60 * 60);
        totalNapTime += napDuration;
        totalNapEvents++;
      } else if (eventType === "meal") {
        totalMealEvents++;
      }
    });

    day.totalSleepTime = totalSleepTime;
    day.totalSleepEvents = totalSleepEvents;
    day.totalNapTime = totalNapTime;
    day.totalNapEvents = totalNapEvents;
    day.totalMealEvents = totalMealEvents;

    await day.save();
    console.log("statistics updated successfully");
    return day;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating statistics");
  }
};
