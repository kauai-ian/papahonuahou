const Event = require("../models/Event");
const Day = require("../models/Day");

const response = require("../helpers/response");

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

    const day = await Day.findById(_id);
    let newDay;

    if (!day) {
      newDay = new Day({ events: [], dayStart: new Date() });
      await newDay.save();
      console.log("New day created:", newDay);

      const newEvent = new Event({
        eventType,
        notes,
        eventStart,
        eventEnd,
        dayId: newDay._id,
      });
      await newEvent.save();
      console.log("new event created:", newEvent);

      newDay.events.push(newEvent._id);
      await newDay.save();

      await exports.updateStatistics(newDay._id);

      return response({
        res,
        status: 201,
        message: "Event created successfully",
        data: newDay,
      });
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

    await updateStatistics(day._id);
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
    const { _id } = req.params;
    const { eventType, notes, eventStart, eventEnd } = req.body;
    if (!_id || !eventType || !notes || !eventStart || !eventEnd) {
      return response({
        res,
        status: 400,
        message: "missing required fields",
      });
    }

    const event = await Event.findById(_id);
    if (!event) {
      return response({
        res,
        status: 404,
        message: "Event not found",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      _id,
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
    const { _id } = req.params;
    if (!_id) {
      return response({
        res,
        status: 400,
        message: "missing required fields",
      });
    }

    const event = await Event.findByIdAndDelete(_id);
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

exports.listDays = async (req, res) => {
  try {
    const days = await Day.find().sort({ dayStart: -1 });
    return response({
      res,
      status: 200,
      message: "Days retrieved",
      data: days,
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

exports.getDays = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return response({
        res,
        status: 400,
        message: "Missing required fields",
      });
    }

    const day = await Day.findById(_id);
    return response({
      res,
      status: 200,
      message: "Day retrieved",
      data: day,
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
    const events = await Event.find({
      eventType,
      eventTime: { $gte: eventStart, $lte: eventEnd },
    });

    let totalEvents = 0;
    let totalSleepTime = 0;
    let totalSleepEvents = 0;
    let totalNapTime = 0;
    let totalNapEvents = 0;
    let totalMealEvents = 0;
    let averageSleepTime = 0;
    let averageNapTime = 0;

    events.forEach((event) => {
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
      if ((eventType = "sleep")) {
        const sleepDuration =
          (event.eventEnd - event.eventStart) / (1000 * 60 * 60);
        totalSleepTime += sleepDuration;
        totalSleepEvents++;
      } else if ((eventType = "nap")) {
        const napDuration =
          (event.eventEnd - event.eventStart) / (1000 * 60 * 60);
        totalNapTime += napDuration;
        totalNapEvents++;
      } else if ((eventType = "meal")) {
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
      data: { data }, // needs to be an object to access the properties
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

    // Update day statistics
    day.totalSleepTime = totalSleepTime;
    day.totalSleepEvents = totalSleepEvents;
    day.totalNapTime = totalNapTime;
    day.totalNapEvents = totalNapEvents;
    day.totalMealEvents = totalMealEvents;

    day.save();
    console.log("statistics updated successfully");
    return day;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while updating statistics");
  }
};
