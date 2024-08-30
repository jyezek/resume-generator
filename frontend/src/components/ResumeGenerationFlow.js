// ResumeGenerationFlow.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ParameterInput from './ParameterInput';
import TemplateSelector from './TemplateSelector';
import ResumeEditor from './ResumeEditor'; // CKEditor Component
import CustomizationOptions from './CustomizationOptions';
import { PencilIcon } from '@heroicons/react/24/solid';
// import TemplateSelector from './TemplateSelector';
import ModernResumeTemplate from './templates/ModernResumeTemplate';
import ClassicResumeTemplate from './templates/ResumeTemplate';

const Container = styled.div`
  padding: 20px;
  background-color: #1a202c;
  color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #18BC9C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #16a085;
  }
`;

const defaultTheme = {
  primaryColor: '#2C3E50',
  secondaryColor: '#18BC9C',
  textColor: '#fff',
  backgroundColor: '#1a202c',
  font: "'Arial', sans-serif",
};

const ResumeGenerationFlow = ({ userId, jobDescription: initialJobDescription, tone: initialTone, onBack }) => {
  const [step, setStep] = useState(1);
  const [jobDescription, setJobDescription] = useState(initialJobDescription || '');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [tone, setTone] = useState(initialTone || 'Friendly, Professional');
  const [resumeResult, setResumeResult] = useState('');
  const [resumeResultId, setResumeResultId] = useState('');
  const [customizationOptions, setCustomizationOptions] = useState({
    color: defaultTheme.primaryColor,
    font: defaultTheme.font,
  });

  useEffect(() => {
    // Fetching existing resume if resumeId is provided
    const fetchResume = async () => {
      if (!resumeResultId) return;

      try {
        const response = await axios.get(`http://localhost:5001/resumes/generated/resume/${resumeResultId}`);
        const { resumeData, jobDescription, tone, selectedTemplate, customizationOptions } = response.data[0];
        setResumeResult(resumeData);
        setJobDescription(jobDescription || '');
        setTone(tone || 'Friendly, Professional');
        setSelectedTemplate(selectedTemplate || 'modern');
        setCustomizationOptions(customizationOptions || defaultTheme);
      } catch (error) {
        console.error('Failed to load resume for editing', error);
      }
    };

    fetchResume();
  }, [resumeResultId]);

  const handleGenerateResume = async () => {
    try {
      const response = await axios.post('http://localhost:5001/resumes/generate-resume', {
        userId,
        jobDescription,
        selectedTemplate,
        tone,
      });

      setResumeResult(response.data.resumeData);
      setResumeResultId(response.data._id);
      setStep(3); // Move to the resume display step
    } catch (error) {
      console.error('Failed to generate resume', error);
    }
  };

  const handleContentChange = (updatedContent) => {
    setResumeResult((prevResult) => ({
      ...prevResult,
      content: updatedContent,
    }));
  };

    const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernResumeTemplate data={resumeResult} theme={customizationOptions} />;
      case 'classic':
        return <ClassicResumeTemplate data={resumeResult} theme={customizationOptions} />;
      default:
        return <p>No template selected or template not found.</p>;
    }
  };

  return (
    <Container>
      {step === 1 && (
        <>
          <h2>Step 1: Enter Job Description</h2>
          <ParameterInput
            label="Job Description"
            value={jobDescription}
            onChange={setJobDescription}
            type="textarea"
          />
          <h3>Step 2: Select Tone</h3>
          <ParameterInput
            label="Tone"
            value={tone}
            onChange={setTone}
          />
          <Button onClick={() => setStep(2)}>Next: Select Template</Button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Step 3: Select a Template</h2>
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
          <Button onClick={handleGenerateResume}>Generate Resume</Button>
          <Button onClick={onBack}>Back</Button>
        </>
      )}

      {step === 3 && (
        <div>
           
          {/* {resumeResult ? ( */}
          
                  <div style={{ position: 'relative' }}>
          {/* <EditIcon onClick={() => setStep(1)} /> */}
          {resumeResult ? (
            <>
              <h2 className="text-xl font-bold mb-4">Generated Resume</h2>
              {renderTemplate()}
            </>
          ) : (
            <div className="text-center text-gray-500">
              <p>Your generated resume will appear here...</p>
            </div>
          )}
        </div>
        </div>
       
      )}
    </Container>
  );
};

export default ResumeGenerationFlow;




// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import ParameterInput from './ParameterInput';
// import TemplateSelector from './TemplateSelector';
// import ModernResumeTemplate from './templates/ModernResumeTemplate';
// import ClassicResumeTemplate from './templates/ResumeTemplate';
// import CustomizationOptions from './CustomizationOptions';
// import { PencilIcon } from '@heroicons/react/24/solid';

// const Container = styled.div`
//   padding: 20px;
//   background-color: #1a202c;
//   color: #fff;
//   border-radius: 8px;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #18BC9C;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 10px;
//   margin-right: 10px;

//   &:hover {
//     background-color: #16a085;
//   }
// `;

// const EditIcon = styled(PencilIcon)`
//   width: 24px;
//   height: 24px;
//   color: #fff;
//   cursor: pointer;
//   position: absolute;
//   top: 20px;
//   right: 20px;

//   &:hover {
//     color: #18BC9C;
//   }
// `;

// const defaultTheme = {
//   primaryColor: '#2C3E50',
//   secondaryColor: '#18BC9C',
//   textColor: '#fff',
//   backgroundColor: '#1a202c',
//   font: "'Arial', sans-serif",
// };

// const ResumeGenerationFlow = ({ userId, jobDescription: initialJobDescription, tone: initialTone, onBack }) => {
//   const [step, setStep] = useState(1);
//   const [jobDescription, setJobDescription] = useState(initialJobDescription || '');
//   const [selectedTemplate, setSelectedTemplate] = useState('modern');
//   const [tone, setTone] = useState(initialTone || 'Friendly, Professional');
//   const [resumeResult, setResumeResult] = useState('');
//   const [resumeResultId, setResumeResultId] = useState('');
//   const [customizationOptions, setCustomizationOptions] = useState({
//     color: defaultTheme.primaryColor,
//     font: defaultTheme.font,
//   });

//   const handleGenerateResume = async () => {
//     try {
//       const response = await axios.post('http://localhost:5001/resumes/generate-resume', {
//         userId,
//         jobDescription,
//         selectedTemplate,
//         tone,
//       });

//       setResumeResult(response.data.resumeData);
//       setResumeResultId(response.data._id);
//       setStep(3); // Move to the resume display step
//     } catch (error) {
//       console.error('Failed to generate resume', error);
//     }
//   };

//   const renderTemplate = () => {
//     switch (selectedTemplate) {
//       case 'modern':
//         return <ModernResumeTemplate data={resumeResult} theme={customizationOptions} />;
//       case 'classic':
//         return <ClassicResumeTemplate data={resumeResult} theme={customizationOptions} />;
//       default:
//         return <p>No template selected or template not found.</p>;
//     }
//   };

//   return (
//     <Container>
//       {step === 1 && (
//         <>
//           <h2>Step 1: Enter Job Description</h2>
//           <ParameterInput
//             label="Job Description"
//             value={jobDescription}
//             onChange={setJobDescription}
//             type="textarea"
//           />
//           <h3>Step 2: Select Tone</h3>
//           <ParameterInput
//             label="Tone"
//             value={tone}
//             onChange={setTone}
//           />
//           <Button onClick={() => setStep(2)}>Next: Select Template</Button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <h2>Step 3: Select a Template</h2>
//           <TemplateSelector
//             selectedTemplate={selectedTemplate}
//             onTemplateChange={setSelectedTemplate}
//           />
//           <Button onClick={handleGenerateResume}>Generate Resume</Button>
//           <Button onClick={onBack}>Back</Button>
//         </>
//       )}

//       {step === 3 && (



//         <div style={{ position: 'relative' }}>
//           <EditIcon onClick={() => setStep(1)} />
//           {resumeResult ? (
//             <>
//               <h2 className="text-xl font-bold mb-4">Generated Resume</h2>
//               {renderTemplate()}
//             </>
//           ) : (
//             <div className="text-center text-gray-500">
//               <p>Your generated resume will appear here...</p>
//             </div>
//           )}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default ResumeGenerationFlow;






// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import axios from 'axios';
// import ParameterInput from './ParameterInput';
// import TemplateSelector from './TemplateSelector';
// import ModernResumeTemplate from './templates/ModernResumeTemplate';
// import ClassicResumeTemplate from './templates/ResumeTemplate';
// import CustomizationOptions from './CustomizationOptions';
// import { PencilIcon } from '@heroicons/react/24/solid';

// const Container = styled.div`
//   padding: 20px;
//   max-width: 1200px;
//   margin: 0 auto;
//   background-color: #1a202c;
//   color: #fff;
//   border-radius: 8px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #18BC9C;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 10px;
//   margin-right: 10px;

//   &:hover {
//     background-color: #16a085;
//   }
// `;

// const EditIcon = styled(PencilIcon)`
//   width: 24px;
//   height: 24px;
//   color: #fff;
//   cursor: pointer;
//   position: absolute;
//   top: 20px;
//   right: 20px;

//   &:hover {
//     color: #18BC9C;
//   }
// `;

// const defaultTheme = {
//   primaryColor: '#2C3E50',
//   secondaryColor: '#18BC9C',
//   textColor: '#fff',
//   backgroundColor: '#1a202c',
//   font: "'Arial', sans-serif",
// };

// const ResumeGenerationFlow = ({ userId }) => {
//   const { resumeId } = useParams();
//   const [jobDescription, setJobDescription] = useState('');
//   const [selectedTemplate, setSelectedTemplate] = useState('modern');
//   const [tone, setTone] = useState('Friendly, Professional');
//   const [resumeResult, setResumeResult] = useState('');
//   const [resumeResultId, setResumeResultId] = useState('');
//   const [isEditingConfig, setIsEditingConfig] = useState(!resumeId);
//   const [customizationOptions, setCustomizationOptions] = useState({
//     color: defaultTheme.primaryColor,
//     font: defaultTheme.font,
//   });



//   useEffect(() => {
//     if (resumeId) {
//       const fetchResume = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5001/resumes/generated/resume/${resumeId}`);
//           const { resumeData, jobDescription, tone, selectedTemplate, customizationOptions } = response.data[0];
//           setResumeResult(resumeData);
//           setResumeResultId(resumeId);
//           setJobDescription(jobDescription || '');
//           setTone(tone || 'Friendly, Professional');
//           setSelectedTemplate(selectedTemplate || 'modern');
//           setCustomizationOptions(customizationOptions || defaultTheme);
//         } catch (error) {
//           console.error('Failed to load resume for editing', error);
//         }
//       };

//       fetchResume();
//     }
//   }, [resumeId]);

//   const handleGenerateResume = async () => {
//     try {
//       const response = await axios.post('http://localhost:5001/resumes/generate-resume', {
//         userId,
//         jobDescription,
//         selectedTemplate,
//         tone,
//       });

//       setResumeResult(response.data.resumeData);
//       setResumeResultId(response.data._id);
//       setIsEditingConfig(false);
//     } catch (error) {
//       console.error('Failed to generate resume', error);
//     }
//   };

//   const handleUpdateResumeData = (updatedData) => {
//     setResumeResult((prevResult) => ({
//       ...prevResult,
//       ...updatedData,
//     }));
//   };

//   const handleCustomizationChange = (newOptions) => {
//     setCustomizationOptions(newOptions);
//   };

//   const renderTemplate = () => {
//     switch (selectedTemplate) {
//       case 'modern':
//         return <ModernResumeTemplate data={resumeResult} theme={customizationOptions} onUpdate={handleUpdateResumeData} />;
//       case 'classic':
//         return <ClassicResumeTemplate data={resumeResult} theme={customizationOptions} />;
//       default:
//         return <p>No template selected or template not found.</p>;
//     }
//   };

//   const handleSaveResume = async () => {
//     try {
//       const resumeDataToSave = {
//         userId,
//         resumeData: resumeResult,
//         jobDescription,
//         template: selectedTemplate,
//         tone,
//         customizationOptions,
//       };

//       if (resumeResultId) {
//         await axios.put(`http://localhost:5001/resumes/generated/${resumeResultId}`, resumeDataToSave);
//         alert('Resume updated successfully!');
//       } else {
//         const response = await axios.post('http://localhost:5001/resumes/generated/', resumeDataToSave);
//         setResumeResultId(response.data._id);
//         alert('Resume saved successfully!');
//       }
//     } catch (error) {
//       console.error('Failed to save resume', error);
//     }
//   };

//   return (
//     <Container>
//       {isEditingConfig ? (
//         <>
//           <h2>Customize Your Resume</h2>

//           <h3>Step 1: Enter Job Description</h3>
//           <ParameterInput
//             label="Job Description"
//             value={jobDescription}
//             onChange={setJobDescription}
//             type="textarea"
//           />

//           <h3>Step 2: Select a Template</h3>
//           <TemplateSelector
//             selectedTemplate={selectedTemplate}
//             onTemplateChange={setSelectedTemplate}
//           />

//           <h3>Step 3: Select Tone</h3>
//           <ParameterInput
//             label="Tone"
//             value={tone}
//             onChange={setTone}
//           />

//           <h3>Step 4: Customize Appearance</h3>
//           <CustomizationOptions
//             customizationOptions={customizationOptions}
//             onCustomizationChange={handleCustomizationChange}
//           />

//           <Button onClick={handleGenerateResume}>Generate Resume</Button>
//           <Button onClick={handleSaveResume}>Save Resume</Button>
//         </>
//       ) : (
//         <div style={{ position: 'relative' }}>
//           <EditIcon onClick={() => setIsEditingConfig(true)} />
//           {resumeResult ? (
//             <>
//               <h2 className="text-xl font-bold mb-4">Generated Resume</h2>
//               {renderTemplate()}
//             </>
//           ) : (
//             <div className="text-center text-gray-500">
//               <p>Your generated resume will appear here...</p>
//             </div>
//           )}
//         </div>
//       )}
   
//     </Container>
//   );
// };

// export default ResumeGenerationFlow;


