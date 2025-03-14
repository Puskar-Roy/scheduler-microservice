import mongoose, { Schema, Document } from "mongoose";

interface IStudentGroup extends Document {
  name: string;
  size: number;
  subjects: string[];
  electives: Record<string, string[]>; // {"Science": ["Physics", "Chemistry"]}
}

const StudentGroupSchema = new Schema<IStudentGroup>({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  subjects: { type: [String], required: true },
  electives: { type: Map, of: [String], default: {} },
});

export default mongoose.model<IStudentGroup>(
  "StudentGroup",
  StudentGroupSchema
);
