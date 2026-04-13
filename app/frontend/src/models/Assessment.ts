import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
  },
  woundType: {
    type: String,
  },
  sizeCm2: {
    type: Number,
  },
});

export default mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);
