require("dotenv").config();
const Event = require("../models/Event");
const Day = require("../models/Day");
const { faker } = require("@faker-js/faker");
const dayjs = require("dayjs");
const mongoose = require("mongoose");

const getTodayMidnight = () => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

async function createFakeData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB");

    const startDate = dayjs("2024-06-07");
    const endDate = dayjs("2024-06-12");

    let currentDate = startDate;

    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, "day")
    ) {
      // create day document if no day exists already
      let day = await Day.findOne({
        dayStart: currentDate.startOf("day").toISOString(),
      });
      if (!day) {
        day = new Day({
          dayStart: currentDate.startOf("day").toISOString(),
        });
        await day.save();
      }

      // Sleep event
      let sleepStart = currentDate.hour(20).minute(0).second(0);
      let sleepEnd = currentDate.add(1, "day").hour(6).minute(0).second(0);
      const sleepEvent = new Event({
        eventType: "sleep",
        notes: faker.lorem.sentence(3),
        eventStart: sleepStart.toISOString(),
        eventEnd: sleepEnd.toISOString(),
        dayId: day._id,
      });
      await sleepEvent.save();

      // Nap events
      let napStart1 = currentDate.hour(10).minute(0).second(0);
      let napEnd1 = napStart1.add(1.5, "hour");
      const napEvent1 = new Event({
        eventType: "nap",
        notes: faker.lorem.sentence(3),
        eventStart: napStart1.toISOString(),
        eventEnd: napEnd1.toISOString(),
        dayId: day._id,
      });
      await napEvent1.save();

      let napStart2 = currentDate.hour(14).minute(0).second(0);
      let napEnd2 = napStart2.add(1.5, "hour");
      const napEvent2 = new Event({
        eventType: "nap",
        notes: faker.lorem.sentence(3),
        eventStart: napStart2.toISOString(),
        eventEnd: napEnd2.toISOString(),
        dayId: day._id,
      });
      await napEvent2.save();

      // Meal events
      let mealTimes = [];
      let mealEvent;
      for (let i = 1; i <= 5; i++) {
        let mealTime = sleepEnd.add(i * 3, "hour");
        let mealStart = mealTime;
        let mealEnd = mealStart.add(15, "minute");
        mealEvent = new Event({
          eventType: "meal",
          notes: faker.lorem.sentence(3),
          eventStart: mealStart.toISOString(),
          eventEnd: mealEnd.toISOString(),
          dayId: day._id,
        });

        await mealEvent.save();
        mealTimes.push(mealEvent);
      }

      // Diaper change events
      let diaperTimes = [];
      let diaperEvent;
      for (let i = 0; i < 6; i++) {
        let diaperTime = sleepEnd.add(i * 3, "hour");
        let diaperStart = diaperTime;
        let diaperEnd = diaperStart.add(15, "minute");
        diaperEvent = new Event({
          eventType: "diaper",
          notes: faker.lorem.sentence(3),
          eventStart: diaperStart.toISOString(),
          eventEnd: diaperEnd.toISOString(),
          dayId: day._id,
        });

        await diaperEvent.save();
        diaperTimes.push(diaperEvent);
      }

      day.events.push(
        sleepEvent._id,
        napEvent1._id,
        napEvent2._id,
        ...mealTimes.map((meal) => meal._id),
        ...diaperTimes.map((diaper) => diaper._id)
      );
      day.totalEvents += 1 + mealTimes.length + diaperTimes.length;
      day.totalSleepEvents += 1;
      day.totalNapEvents += 2;
      day.totalMealEvents += mealTimes.length;
      day.totalDiaperChanges += diaperTimes.length;

      await day.save();

      currentDate = currentDate.add(1, "day");
    }
    console.log("Fake data uploaded successfully!");
  } catch (error) {
    console.error("Error generating data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}
module.exports = createFakeData;
