import express from "express";
import Subject from "../models/Subject";

const router = express.Router();


router.get("/", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});


router.post("/", async (req, res) => {
  const subject = new Subject(req.body);
  await subject.save();
  res.status(201).json(subject);
});


router.get("/:id", async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.json(subject);
});


router.put("/:id", async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(subject);
});


router.delete("/:id", async (req, res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
