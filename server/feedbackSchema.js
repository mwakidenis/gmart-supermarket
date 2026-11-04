import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  // Removes extra whitespace
    maxlength: 100, // Limits name length to improve data consistency
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true, // Ensures consistent email formatting
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Basic email validation
  },
  feedbackText: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000, // Limits feedback length to avoid overly lengthy comments
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Sets rating scale between 1 and 5
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets date on document creation
    immutable: true,  // Prevents date from being modified
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
