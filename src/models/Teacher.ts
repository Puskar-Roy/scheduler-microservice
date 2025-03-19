import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface ITeacher extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  profile_pic?: string;
  address?: {
    city?: string;
    state?: string;
    country?: string;
  };
  primary_subject: string;
  secondary_subjects: string[];
  availability: Record<string, number[]>;
  max_classes_per_day: number;
  max_consecutive_classes: number;
  preferred_time_slots: mongoose.Schema.Types.ObjectId[];
  leave_days: string[];
  joining_date: Date;
  role: "teacher" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_pic: { type: String },
    address: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
    primary_subject: { type: String, required: true },
    secondary_subjects: { type: [String], default: [] },
    availability: { type: Map, of: [Number], required: true },
    max_classes_per_day: { type: Number, required: true },
    max_consecutive_classes: { type: Number, default: 3 },
    preferred_time_slots: [{ type: Schema.Types.ObjectId, ref: "TimeSlot" }],
    leave_days: { type: [String], default: [] },
    joining_date: { type: Date, default: Date.now },
    role: { type: String, enum: ["teacher", "admin"], default: "teacher" },
  },
  { timestamps: true }
);


TeacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


TeacherSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<ITeacher>("Teacher", TeacherSchema);
