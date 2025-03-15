import express from "express";
import StudentGroup from "../models/StudentGroup";

const router = express.Router();


router.get("/", async (req, res) => {
  const groups = await StudentGroup.find();
  res.json(groups);
});


router.post("/", async (req, res) => {
  const group = new StudentGroup(req.body);
  await group.save();
  res.status(201).json(group);
});


router.get("/:id", async (req, res) => {
  const group = await StudentGroup.findById(req.params.id);
  res.json(group);
});


router.put("/:id", async (req, res) => {
  const group = await StudentGroup.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(group);
});


router.delete("/:id", async (req, res) => {
  await StudentGroup.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
