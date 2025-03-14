import express from "express";
import Teacher from "../models/Teacher";

const router = express.Router();

// Get all teachers
router.get("/", async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

// Create a new teacher
router.post("/", async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.status(201).json(teacher);
});

// Get a single teacher by ID
router.get("/:id", async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  res.json(teacher);
});

// Update a teacher
router.put("/:id", async (req, res) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(teacher);
});

// Delete a teacher
router.delete("/:id", async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
