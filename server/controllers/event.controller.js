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
    const { body, _id } = req.body;
    if (!body || !_id) {
      statusCode = 400;
      throw new Error("Missing required fields");
    }

    // ensure day exists
    const day = await Day.findById(_id);
    if (!day) {
      // create new day of none exists
      const newDay = new Day({ events: [], dayStart: new Date() });
      await newDay.save();
      console.log("New day created:", newDay);
    }
    // create new event
    const newEvent = new Event({ type, notes, eventTime });
    await newEvent.save();
    console.log("new event created:", newEvent);

    // TODO: after event creation, call stats helper function, return updated to current day in stats.

    return response({
      res,
      status: 201,
      message: "Event created successfully",
      data: day ? day : newDay, // return existing day or newly created day
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
    const { type, notes, eventTime } = req.body;
    if (!_id || !type || !notes || !eventTime) {
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
      { type, notes, eventTime },
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
