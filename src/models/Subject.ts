import mongoose, { Schema, Document } from "mongoose";

interface ISubject extends Document {
  name: string;
  requires_lab: boolean;
  equipment_needed: string[];
  difficulty_level: number; // 1 to 5
}

const SubjectSchema = new Schema<ISubject>({
  name: { type: String, required: true },
  requires_lab: { type: Boolean, default: false },
  equipment_needed: { type: [String], default: [] },
  difficulty_level: { type: Number, min: 1, max: 5, default: 1 },
});

export default mongoose.model<ISubject>("Subject", SubjectSchema);
