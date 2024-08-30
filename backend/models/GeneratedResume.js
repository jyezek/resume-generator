const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeneratedResumeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
  resumeData: {
    type: Object,
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  customizationOptions: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model('GeneratedResume', GeneratedResumeSchema);
