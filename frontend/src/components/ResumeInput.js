import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  color: #2C3E50;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px;
  margin-bottom: 20px;
  resize: vertical;
`;

const ResumeInput = ({ masterResume, jobDescription, onResumeChange, onJobDescriptionChange }) => {
  return (
    <>
      <InputContainer>
        <Label>Master Resume</Label>
        <TextArea
          value={masterResume}
          onChange={(e) => onResumeChange(e.target.value)}
          placeholder="Paste your master resume here"
        />
      </InputContainer>

      <InputContainer>
        <Label>Job Description</Label>
        <TextArea
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the job description here"
        />
      </InputContainer>
    </>
  );
};

export default ResumeInput;
