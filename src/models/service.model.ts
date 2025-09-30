import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  category: mongoose.Types.ObjectId;
  name: string;
  type: "Normal" | "VIP";
}

const ServiceSchema: Schema = new Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["Normal", "VIP"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IService>("Service", ServiceSchema);

