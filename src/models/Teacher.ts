import mongoose, { Schema, Document } from "mongoose";

interface ITeacher extends Document {
  name: string;
  primary_subject: string;
  secondary_subjects: string[];
  availability: Record<string, number[]>; // {"Monday": [1,2,3], "Tuesday": [4,5]}
  max_classes_per_day: number;
  max_consecutive_classes: number;
  preferred_time_slots: mongoose.Schema.Types.ObjectId[];
  leave_days: string[];
}

const TeacherSchema = new Schema<ITeacher>({
  name: { type: String, required: true },
  primary_subject: { type: String, required: true },
  secondary_subjects: { type: [String], default: [] },
  availability: { type: Map, of: [Number], required: true },
  max_classes_per_day: { type: Number, required: true },
  max_consecutive_classes: { type: Number, default: 3 },
  preferred_time_slots: [{ type: Schema.Types.ObjectId, ref: "TimeSlot" }],
  leave_days: { type: [String], default: [] },
});

export default mongoose.model<ITeacher>("Teacher", TeacherSchema);
