// resumeRoutes.js

const express = require('express');
const dotenv = require('dotenv');
const OpenAI = require('openai');
// const Resume = require('../models/Resume'); // Import the Resume model
const MasterResume = require('../models/MasterResume');
const GeneratedResume = require('../models/GeneratedResume');
const router = express.Router();

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const assistantId = 'asst_9GevFByB4CfzCpQPdfZbJzhd'; // Replace with your actual assistant ID

// In-memory store for thread ID (For demonstration purposes; consider using a database for production)
let threadId = null;

// GET resume for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });
    if (!resume) return res.status(404).send('Resume not found');
    res.json(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


router.get('/master/:userId', async (req, res) => {
  console.log('master resume')
  console.log(req.params.userId)
  try {
    const resume = await MasterResume.findOne({ userId: req.params.userId });
    if (!resume) return res.status(404).send('Master resume not found');
    res.json(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/master', async (req, res) => {
  try {
    const newResume = new MasterResume(req.body);
    const resume = await newResume.save();
    res.json(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/master/:userId', async (req, res) => {
 
  try {
    
    const resume = await MasterResume.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    res.json(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Routes for Generated Resume
router.get('/generated/:userId', async (req, res) => {
  
  try {
    const resumes = await GeneratedResume.find({ userId: req.params.userId });
    res.json(resumes);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/generated/resume/:resumeId', async (req, res) => {
  try {
    const resume = await GeneratedResume.find({ _id: req.params.resumeId });
    res.json(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// POST a new resume
router.post('/generated/', async (req, res) => {
  try {
    const newResume = new GeneratedResume(req.body);
    const resume = await newResume.save();
    res.json(resume);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


// PUT route to update an existing generated resume
router.put('/generated/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, resumeData, template, tone, jobDescription, customizationOptions } = req.body;
console.log(resumeData)
  try {
    const updatedResume = await GeneratedResume.findByIdAndUpdate(
      id,
      {
        userId,
        resumeData,
        template,
        tone,
        jobDescription,
        customizationOptions,
      },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json(updatedResume);
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ error: 'Error updating resume' });
  }
});




router.post('/generate-resume', async (req, res) => {
  const { userId, jobDescription, selectedTemplate, tone } = req.body;

  try {
    const masterResume = await MasterResume.findOne({ userId });

    if (!masterResume) {
      return res.status(404).json({ error: 'Master resume not found' });
    }


    const assistantMessage = {
      role: "user",
      content: `Generate a resume based on the following details:
      - Master Resume: ${JSON.stringify(masterResume.resumeData, null, 2)}
      - Job Description: ${jobDescription}
      - Template: ${selectedTemplate}
      - Tone: ${tone}
      Please provide the response in the following JSON format:
     "resume": {
        "contactInformation": {
          "name": "string",
          "title": "string",
          "email": "string",
          "phone": "string",
          "linkedin": "string",
          "portfolio": "string"
        },
        "professionalSummary": "string",
        "technicalSkills": {
          "primaryProgrammingLanguages": ["string", "string", ...]
        },
        "professionalExperience": [
          {
            "company": "string",
            "location": "string",
            "period": "string",
            "roles": [
              {
                "title": "string",
                "description": ["string", "string", ...]
              }
            ]
          }
        ],
        "education": {
          "institution": "string",
          "degree": "string",
          "period": "string"
        }
      }`
    };

    if (!threadId) {
      const thread = await openai.beta.threads.create({});
      threadId = thread.id;
    }

    const message = await openai.beta.threads.messages.create(threadId, assistantMessage);

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId
    });

    const checkRun = async () => {
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          const retrieveRun = await openai.beta.threads.runs.retrieve(threadId, run.id);

          if (retrieveRun.status === 'completed') {
            clearInterval(interval);
            resolve(retrieveRun);
          } else if (retrieveRun.status === 'requires_action') {
            clearInterval(interval);
            reject(new Error('Run requires action. Please check the assistant configuration.'));
          }
        }, 3000);
      });
    };

    await checkRun();

    const messages = await openai.beta.threads.messages.list(threadId);
    const answer = (messages.data ?? []).find((m) => m?.role === 'assistant')?.content?.[0]?.text?.value;

    if (!answer) {
      throw new Error("Received null response from OpenAI Assistant");
    }

    let resumeContent;
    try {
      resumeContent = JSON.parse(answer).resume; // Parse and extract the resume content
    } catch (parseError) {
      return res.status(500).json({ error: 'Error parsing resume content', details: parseError.message });
    }

    // Save the generated resume to the database
    const newGeneratedResume = new GeneratedResume({
      userId,
      resumeData: resumeContent,
      template: selectedTemplate,
      tone,
      jobDescription,
    });

    await newGeneratedResume.save();

    res.json(newGeneratedResume); // Send the saved resume as the response
  } catch (error) {
    console.error('Error generating resume:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error generating resume', details: error.message });
  }
});



module.exports = router;


