const mongoose = require('mongoose');
const { Schema } = mongoose;

const resumeSchema = new Schema({
  userId: { type: String, required: true },
  resumeData: {
    contactInformation: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      linkedin: { type: String },
      portfolio: { type: String },
    },
    professionalSummary: { type: String, required: true },
    technicalSkills: {
      primarySoftwareExperience: [String],
      primaryProgrammingLanguages: [String],
    },
    professionalExperience: [
      {
        company: String,
        location: String,
        period: String,
        roles: [
          {
            title: String,
            description: [String],
          },
        ],
      },
    ],
    education: {
      institution: String,
      degree: String,
      period: String,
    },
    keyProjectsAndAchievements: [String],
    managementToolkit: [String],
  },
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;





// backend/models/Resume.js

// const mongoose = require('mongoose');

// const ResumeSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true,
//   },
//   resumeData: {
//     contactInformation: {
//       name: { type: String, required: true },
//       phone: { type: String, required: true },
//       email: { type: String, required: true },
//       linkedin: { type: String },
//       portfolio: { type: String },
//     },
//     professionalSummary: { type: String, required: true },
//     technicalSkills: {
//       primarySoftwareExperience: [String],
//       primaryProgrammingLanguages: [String],
//     },
//     professionalExperience: [
//       {
//         company: String,
//         location: String,
//         period: String,
//         roles: [
//           {
//             title: String,
//             description: [String],
//           },
//         ],
//       },
//     ],
//     education: {
//       institution: String,
//       degree: String,
//       period: String,
//     },
//     keyProjectsAndAchievements: [String],
//     managementToolkit: [String],
//   },
// });

// module.exports = mongoose.model('Resume', ResumeSchema);





// const mongoose = require('mongoose');

// const contactInformationSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   email: String,
//   linkedin: String,
//   portfolio: String
// });

// const professionalExperienceSchema = new mongoose.Schema({
//   company: String,
//   location: String,
//   period: String,
//   roles: [{
//     title: String,
//     description: [String]
//   }]
// });

// const resumeSchema = new mongoose.Schema({
//   contactInformation: contactInformationSchema,
//   professionalSummary: String,
//   technicalSkills: Object,
//   professionalExperience: [professionalExperienceSchema],
//   education: Object,
//   keyProjectsAndAchievements: [String],
//   managementToolkit: [String],
//   userId: String // to associate with the logged-in user
// });

// const Resume = mongoose.model('Resume', resumeSchema);

// module.exports = Resume;
