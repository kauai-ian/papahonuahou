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
    const newEvent = new Event({ eventType, notes, eventStart, eventEnd });
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
    if (_id) {
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
    const {eventType, eventStart, eventEnd} = req.body
    const events = await Event.find({
      eventType, eventTime: { $gte: eventStart, $lte: eventEnd }
    })

// initialize variables
let totalEvents = 0;
let totalTime = 0
let totalSleepTime = 0
let totalSleepEvents = 0;
let totalNapTime = 0
let totalNapEvents = 0;
let totalMealEvents = 0;
let averageSleepTime = 0
let averageNapTime= 0

// get all events of the given event type within a specific range

// loop through each event:
events.forEach(event => {
  if (eventType !== "sleep" && eventType !== "nap" && eventType !== "meal") {return response({
    res,
    status: 400,
    message: "missing required fields",
  })
};
  if (eventType = "sleep") {
    // create a variable called sleep duration
    const sleepDuration = (event.eventEnd - event.eventStart) / (1000 * 60 * 60) // convert milliseconds to hours
    //  calculate the sleep duration. by subtracting the eventStart from the eventEnd in hours
    totalSleepTime += sleepDuration
    // example sleep event starts at 7 P.M. and sleep event ends at 7 A.M.. The result is 12 hours.
    // increment total sleep events by 1
    totalSleepEvents++;
  }  
  else if (eventType = "nap") {
    // create a variable called nap duration
    const napDuration = (event.eventEnd - event.eventStart) / (1000 * 60 * 60)
    //  calculate the nap duration by subtracting the eventStart from the eventEnd in hours. 
    totalNapTime += napDuration
    // example nap event starts at 10 A.M. and ends at 11 A.M.
    // increment total nap events by 1
    totalNapEvents++;
  }
 else if (eventType = "meal") {
    // create a variable called total meals
    // increment total meals events by 1
    totalMealEvents++
  }

})

if (totalEvents > 0) {
  averageSleepTime = totalSleepTime / totalSleepEvents
averageNapTime = totalNapTime / totalNapEvents 
}

return response({
  res, status: 200, message: "Statistics retrieved successfully", data: { data } // needs to be an object to access the properties 
})


  }
  catch (error){
    console.error(error);
    return response({
        res, status: 500,
        message: "An error occurred while fetching statistics",
        error: error.message
    });
  }
}

// helper function runs on each event creation and returns stats updated.  
exports.updateStatistics = async (req, res) => {
  try{
// calcualte the time for the specific event type (bed time, wake time, meal time)

// update the statistics for the speicific event type based on the calculated time:
// add the time to the total time
// Increment the total number of events 

// save the updated statistics

  }
  catch (error){
    console.error(error);
    return response({
        res, status: 500,
        message: "An error occurred while updating statistics",
        error: error.message
    });
  }
}