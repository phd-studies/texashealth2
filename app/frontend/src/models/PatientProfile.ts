import mongoose from 'mongoose';

const PatientProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  height: {
    type: String,
  },
});

export default mongoose.models.PatientProfile || mongoose.model('PatientProfile', PatientProfileSchema);
