import React from 'react';
import styled from 'styled-components';

const CustomizationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
  color: #2C3E50;
`;

const ColorInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const FontSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const CustomizationOptions = ({ customizationOptions, onCustomizationChange }) => {
  const handleColorChange = (e) => {
    onCustomizationChange({ ...customizationOptions, color: e.target.value });
  };

  const handleFontChange = (e) => {
    onCustomizationChange({ ...customizationOptions, font: e.target.value });
  };

  return (
    <CustomizationContainer>
      <InputContainer>
        <Label>Primary Color</Label>
        <ColorInput
          type="color"
          value={customizationOptions.color}
          onChange={handleColorChange}
        />
      </InputContainer>

      <InputContainer>
        <Label>Font</Label>
        <FontSelect value={customizationOptions.font} onChange={handleFontChange}>
          <option value="'Arial', sans-serif">Arial</option>
          <option value="'Georgia', serif">Georgia</option>
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          {/* Add more fonts as needed */}
        </FontSelect>
      </InputContainer>
    </CustomizationContainer>
  );
};

export default CustomizationOptions;
