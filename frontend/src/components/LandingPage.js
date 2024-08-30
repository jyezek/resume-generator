import React, { useState } from 'react';
import styled from 'styled-components';
import TemplateSelector from './TemplateSelector';
import CustomizationOptions from './CustomizationOptions';
import ResumeInput from './ResumeInput';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #2C3E50;
`;

const FormSection = styled.div`
  margin-bottom: 40px;
`;

const SubmitButton = styled.button`
  background-color: #18BC9C;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2em;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #1abc9c;
  }
`;

const LandingPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [customizationOptions, setCustomizationOptions] = useState({
    color: '#2C3E50',
    font: "'Arial', sans-serif",
  });
  const [masterResume, setMasterResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleCustomizationChange = (options) => {
    setCustomizationOptions(options);
  };

  const handleResumeChange = (resume) => {
    setMasterResume(resume);
  };

  const handleJobDescriptionChange = (description) => {
    setJobDescription(description);
  };

  const handleSubmit = () => {
    // Handle form submission and integrate with the OpenAI API
    console.log('Template:', selectedTemplate);
    console.log('Customization Options:', customizationOptions);
    console.log('Master Resume:', masterResume);
    console.log('Job Description:', jobDescription);
  };

  return (
    <Container>
      <Title>Create Your Custom Resume</Title>

      <FormSection>
        <ResumeInput
          masterResume={masterResume}
          jobDescription={jobDescription}
          onResumeChange={handleResumeChange}
          onJobDescriptionChange={handleJobDescriptionChange}
        />
      </FormSection>

      <FormSection>
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
        />
      </FormSection>

      <FormSection>
        <CustomizationOptions
          customizationOptions={customizationOptions}
          onCustomizationChange={handleCustomizationChange}
        />
      </FormSection>

      <SubmitButton onClick={handleSubmit}>Generate Resume</SubmitButton>
    </Container>
  );
};

export default LandingPage;
