import mongoose, { Schema, Document } from "mongoose";

interface IClassSchedule extends Document {
  day: string;
  period: number;
  subject: mongoose.Schema.Types.ObjectId;
  teacher: mongoose.Schema.Types.ObjectId;
  room: mongoose.Schema.Types.ObjectId;
  student_group: mongoose.Schema.Types.ObjectId;
  time_slot: mongoose.Schema.Types.ObjectId;
}

const ClassScheduleSchema = new Schema<IClassSchedule>({
  day: { type: String, required: true },
  period: { type: Number, required: true },
  subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  student_group: {
    type: Schema.Types.ObjectId,
    ref: "StudentGroup",
    required: true,
  },
  time_slot: { type: Schema.Types.ObjectId, ref: "TimeSlot", required: true },
});

export default mongoose.model<IClassSchedule>(
  "ClassSchedule",
  ClassScheduleSchema
);
