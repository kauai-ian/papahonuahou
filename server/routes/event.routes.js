const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event.controller");

router.post("/events", eventController.createEvent);
router.put("/events", eventController.editEvent);
router.delete("/events", eventController.deleteEvent);
router.get("/events", eventController.getStatistics);
router.get("/events", eventController.listDays);
router.get("/events", eventController.getDays);

module.exports = router;
