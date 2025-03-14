import express from "express";
import ClassSchedule from "../models/ClassSchedule";

const router = express.Router();

// Get all schedules
router.get("/", async (req, res) => {
  const schedules = await ClassSchedule.find().populate(
    "subject teacher room student_group time_slot"
  );
  res.json(schedules);
});

// Create a new schedule
router.post("/", async (req, res) => {
  const schedule = new ClassSchedule(req.body);
  await schedule.save();
  res.status(201).json(schedule);
});

// Get a single schedule by ID
router.get("/:id", async (req, res) => {
  const schedule = await ClassSchedule.findById(req.params.id).populate(
    "subject teacher room student_group time_slot"
  );
  res.json(schedule);
});

// Update a schedule
router.put("/:id", async (req, res) => {
  const schedule = await ClassSchedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(schedule);
});

// Delete a schedule
router.delete("/:id", async (req, res) => {
  await ClassSchedule.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
