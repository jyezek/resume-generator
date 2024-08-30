const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MasterResumeSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  resumeData: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model('MasterResume', MasterResumeSchema);
