const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event.controller");
const dayController = require("../controllers/day.controller")

router.post("/events", eventController.createEvent);
router.put("/events/:id", eventController.editEvent);
router.delete("/events/:id", eventController.deleteEvent);
router.get("/events/statistics", eventController.getStatistics);

router.get("/days", dayController.listDays);
router.get("/days/:id", dayController.getDays);

module.exports = router;
