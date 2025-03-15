import express from "express";
import Room from "../models/Room";

const router = express.Router();


router.get("/", async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});


router.post("/", async (req, res) => {
  const room = new Room(req.body);
  await room.save();
  res.status(201).json(room);
});


router.get("/:id", async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.json(room);
});


router.put("/:id", async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(room);
});


router.delete("/:id", async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
