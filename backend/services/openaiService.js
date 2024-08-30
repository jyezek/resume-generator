// backend/services/openaiService.js
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is set in your environment variables
});

const openai = new OpenAIApi(configuration);

const generateResume = async (masterResume, jobDescription, selectedTemplate, tone) => {
  try {
    const prompt = `Based on the following information, generate a resume:
    Master Resume: ${JSON.stringify(masterResume)},
    Job Description: ${jobDescription},
    Template: ${selectedTemplate},
    Tone: ${tone}.
    Please format the response according to the selected template.`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.7,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
};

module.exports = {
  generateResume,
};
