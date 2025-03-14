import express from "express";
import Subject from "../models/Subject";

const router = express.Router();

// Get all subjects
router.get("/", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

// Create a new subject
router.post("/", async (req, res) => {
  const subject = new Subject(req.body);
  await subject.save();
  res.status(201).json(subject);
});

// Get a single subject by ID
router.get("/:id", async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.json(subject);
});

// Update a subject
router.put("/:id", async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(subject);
});

// Delete a subject
router.delete("/:id", async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
