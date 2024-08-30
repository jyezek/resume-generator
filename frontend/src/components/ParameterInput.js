// src/components/ParameterInput.js

import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ParameterInput = ({ label, value, onChange, type = 'text' }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <TextInput
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputContainer>
  );
};

export default ParameterInput;
