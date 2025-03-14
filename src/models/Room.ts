import mongoose, { Schema, Document } from "mongoose";

interface IRoom extends Document {
  name: string;
  capacity: number;
  is_lab: boolean;
  special_equipment: string[];
  available_periods: Record<string, number[]>; // {"Monday": [1,2,3]}
}

const RoomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  is_lab: { type: Boolean, default: false },
  special_equipment: { type: [String], default: [] },
  available_periods: { type: Map, of: [Number], default: {} },
});

export default mongoose.model<IRoom>("Room", RoomSchema);
