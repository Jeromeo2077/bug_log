import { Schema } from "mongoose";

export const BugsSchema = new Schema({
  title: { type: String, minlength: 10, maxlength: 50, required: true },
  description: { type: String, minlength: 10, maxlength: 500, required: true },
  priority: [{ type: Number, min: 1, max: 5, required: true }],
  closed: { type: Boolean, default: false, required: true },
  closedDate: { type: Date, required: false },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

BugsSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

