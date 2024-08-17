// event and day routes
const express = require("express");
const { checkJWT } = require("../middleware/auth.middleware");
const eventController = require("../controllers/event.controller");
const dayController = require("../controllers/day.controller");
const router = express.Router();

// auth: the checkJWT middleware to the routes that need authorization. could simplfiy with router.use(checkJWT)

router.post("/events", checkJWT, eventController.createEvent);
router.get("/events", checkJWT, eventController.listEvents);
router.get("/events/:_id", checkJWT, eventController.getEvent);
router.put("/events/:_id", checkJWT, eventController.editEvent);
router.delete("/events/:_id", checkJWT, eventController.deleteEvent);
router.post("/events/statistics", checkJWT, eventController.getStatistics);

router.get("/days", dayController.listDays);
router.get("/days/:_id", dayController.getDay);

module.exports = router;
