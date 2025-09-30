import mongoose, { Schema, Document } from "mongoose";

export interface IPriceOption extends Document {
  service: mongoose.Types.ObjectId;
  duration: string;
  price: number;
  type: "Hourly" | "Weekly" | "Monthly";
}

const PriceOptionSchema: Schema = new Schema(
  {
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ["Hourly", "Weekly", "Monthly"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPriceOption>("PriceOption", PriceOptionSchema);
