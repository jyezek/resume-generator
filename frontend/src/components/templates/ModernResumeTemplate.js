// ModernResumeTemplate.js
import React, { useState, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Container = styled.div`
  display: flex;
  max-width: 900px;
  margin: 20px auto;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const Sidebar = styled.div`
  background-color: ${({ theme }) => theme.primaryColor || '#2C3E50'};
  color: white;
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.font};
`;

const MainContent = styled.div`
  width: 70%;
  padding: 40px 30px;
  color: ${({ theme }) => theme.textColor || '#333'};
  font-family: ${({ theme }) => theme.font};
`;

const Section = styled.section`
  margin-bottom: 40px;

  h3 {
    font-size: 1.5em;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.primaryColor || '#2C3E50'};
  }
`;

const EditableField = styled.div`
  margin-bottom: 10px;
  padding: 5px;
  border: 1px dashed ${({ theme }) => theme.primaryColor};
  cursor: pointer;
  outline: none;
`;

const ModernResumeTemplate = ({ data, theme, onUpdate }) => {
  const { contactInformation, professionalSummary, technicalSkills, professionalExperience, education } = data;

  const [activeSection, setActiveSection] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef();

  const handleFieldClick = (section, value) => {
    setActiveSection(section);
    setEditorContent(value || '');
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
    if (onUpdate && activeSection) {
      onUpdate(activeSection, data);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* Unified CKEditor Toolbar */}
        <CKEditor
          editor={ClassicEditor}
          data={editorContent}
          onChange={handleEditorChange}
          config={{
            toolbar: ['bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', 'undo', 'redo'],
          }}
        /> 

        <Container>
          <Sidebar>
            <EditableField
              onClick={() => handleFieldClick('contactInformation.name', contactInformation?.name)}
              ref={editorRef}
            >
              {contactInformation?.name || 'Your Name'}
            </EditableField>
            <EditableField
              onClick={() => handleFieldClick('contactInformation.title', contactInformation?.title)}
            >
              {contactInformation?.title || 'Your Title'}
            </EditableField>
            <EditableField
              onClick={() => handleFieldClick('contactInformation.email', contactInformation?.email)}
            >
              {contactInformation?.email || 'youremail@example.com'}
            </EditableField>
            <EditableField
              onClick={() => handleFieldClick('contactInformation.phone', contactInformation?.phone)}
            >
              {contactInformation?.phone || '(555) 555-5555'}
            </EditableField>
          </Sidebar>

          <MainContent>
            <Section>
              <h3>Professional Summary</h3>
              <EditableField onClick={() => handleFieldClick('professionalSummary', professionalSummary)}>
                {professionalSummary || 'Enter your professional summary here...'}
              </EditableField>
            </Section>

            <Section>
              <h3>Technical Skills</h3>
              <ul>
                {technicalSkills?.primaryProgrammingLanguages?.map((skill, index) => (
                  <EditableField
                    key={index}
                    onClick={() =>
                      handleFieldClick(`technicalSkills.primaryProgrammingLanguages[${index}]`, skill)
                    }
                  >
                    {skill || 'Enter a technical skill...'}
                  </EditableField>
                ))}
              </ul>
            </Section>

            <Section>
              <h3>Professional Experience</h3>
              {professionalExperience?.map((experience, index) => (
                <div key={index}>
                  <EditableField
                    onClick={() => handleFieldClick(`professionalExperience[${index}].company`, experience.company)}
                  >
                    {experience.company} - {experience.location}
                  </EditableField>
                  <EditableField
                    onClick={() => handleFieldClick(`professionalExperience[${index}].period`, experience.period)}
                  >
                    {experience.period}
                  </EditableField>

                  {experience.roles?.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      <EditableField
                        onClick={() =>
                          handleFieldClick(`professionalExperience[${index}].roles[${roleIndex}].title`, role.title)
                        }
                      >
                        {role.title}
                      </EditableField>

                      <ul>
                        {role.description?.map((desc, descIndex) => (
                          <EditableField
                            key={descIndex}
                            onClick={() =>
                              handleFieldClick(
                                `professionalExperience[${index}].roles[${roleIndex}].description[${descIndex}]`,
                                desc
                              )
                            }
                          >
                            {desc}
                          </EditableField>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </Section>

            <Section>
              <h3>Education</h3>
              <EditableField
                onClick={() => handleFieldClick('education.institution', education?.institution)}
              >
                {education?.institution || 'Enter your institution here...'}
              </EditableField>
              <EditableField onClick={() => handleFieldClick('education.degree', education?.degree)}>
                {education?.degree || 'Enter your degree here...'}
              </EditableField>
              <EditableField onClick={() => handleFieldClick('education.period', education?.period)}>
                {education?.period || 'Enter your graduation period here...'}
              </EditableField>
            </Section>
          </MainContent>
        </Container>
      </div>
    </ThemeProvider>
  );
};


export const MiniModernResumeTemplate = (props) => <ModernResumeTemplate {...props} isMini={true} />;

export default ModernResumeTemplate;





// import React from 'react';
// import styled, { ThemeProvider } from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   max-width: 900px;
//   margin: 20px auto;
//   background-color: white;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   border-radius: 10px;
//   overflow: hidden;
// `;

// const Sidebar = styled.div`
//   background-color: ${({ theme }) => theme.primaryColor || '#2C3E50'};
//   color: white;
//   width: 30%;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   font-family: ${({ theme }) => theme.font}; // Apply the custom font
// `;

// const MainContent = styled.div`
//   width: 70%;
//   padding: 40px 30px;
//   color: ${({ theme }) => theme.textColor || '#333'};
//   font-family: ${({ theme }) => theme.font}; // Apply the custom font
// `;

// const EditableText = styled.div`
//   font-size: ${({ size }) => size || 'inherit'};
//   margin-bottom: 10px;
//   outline: none;
//   cursor: text;
//   color: ${({ theme }) => theme.textColor || '#333'}; // Apply text color
//   font-family: ${({ theme }) => theme.font}; // Apply the custom font

//   &:focus {
//     border-bottom: 1px dashed ${({ theme }) => theme.primaryColor}; // Apply the custom color
//   }
// `;

// const Section = styled.section`
//   margin-bottom: 40px;

//   h3 {
//     font-size: 1.5em;
//     margin-bottom: 20px;
//     color: ${({ theme }) => theme.primaryColor || '#2C3E50'};
//   }

//   p, ul {
//     margin-bottom: 15px;
//     line-height: 1.5;
//   }

//   ul {
//     padding-left: 20px;
//     list-style-type: disc;

//     li {
//       margin-bottom: 10px;
//     }
//   }
// `;

// // Main ModernResumeTemplate Component
// const ModernResumeTemplate = ({ data, theme, isMini = false, onUpdate }) => {
//   // console.log(data)

//   const { contactInformation, professionalSummary, technicalSkills, professionalExperience, education } = data;

//   const handleContentChange = (key, value) => {
//     // console.log(key)
//     // console.log(value)
//     if (onUpdate) {
//       onUpdate(key, value);
//     }
//   };


  // const handleContentChange = (section, key, value) => {
  //   const updatedData = { ...data };
  //   if (section === 'contactInformation') {
  //     updatedData[section][key] = value;
  //   } else if (section === 'professionalSummary') {
  //     updatedData[section] = value;
  //   } else if (section === 'technicalSkills') {
  //     updatedData[section][key] = value;
  //   } else if (section === 'professionalExperience') {
  //     const [field, index] = key.split('[');
  //     const cleanIndex = index.replace(']', '');
  //     updatedData[section][cleanIndex][field] = value;
  //   } else if (section === 'education') {
  //     updatedData[section][key] = value;
  //   }
  //   onUpdate(updatedData);
  // };
  

  // const handleContentChange = (section, key, value) => {
  //   const updatedData = { ...data };
  //   if (section === 'contactInformation') {
  //     updatedData[section][key] = value;
  //   } else if (section === 'professionalSummary') {
  //     updatedData[section] = value;
  //   } else if (section === 'technicalSkills') {
  //     updatedData[section][key] = value;
  //   } else if (section === 'professionalExperience') {
  //     const [field, index] = key.split('[');
  //     const cleanIndex = index.replace(']', '');
  //     updatedData[section][cleanIndex][field] = value;
  //   } else if (section === 'education') {
  //     updatedData[section][key] = value;
  //   }
  //   onUpdate(updatedData);
  // };
  

//   return (

//     <ThemeProvider theme={theme}>
//       <div style={isMini ? { transform: 'scale(0.25)', transformOrigin: 'top left', width: '400%', height: '400%', overflow: 'hidden' } : {}}>
//         <Container>
//           <Sidebar>
//             <div>
//               <EditableText
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleContentChange('contactInformation', 'name', e.target.innerText)}
//               >
//                 {contactInformation?.name || 'Your Name'}
//               </EditableText>
//               <EditableText
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleContentChange('contactInformation', 'title', e.target.innerText)}
//               >
//                 {contactInformation?.title || 'Your Title'}
//               </EditableText>
//               <EditableText
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleContentChange('contactInformation', 'email', e.target.innerText)}
//               >
//                 {contactInformation?.email || 'youremail@example.com'}
//               </EditableText>
//               <EditableText
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleContentChange('contactInformation', 'phone', e.target.innerText)}
//               >
//                 {contactInformation?.phone || '(555) 555-5555'}
//               </EditableText>
//             </div>
//           </Sidebar>
//           <MainContent>
//             <Section>
//               <h3>Professional Summary</h3>
//               <EditableText
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleContentChange('professionalSummary', e.target.innerText)}
//                 size="1.5em"
//               >
//                 {professionalSummary || 'Enter your professional summary here...'}
//               </EditableText>
//             </Section>
//             <Section>
//               <h3>Technical Skills</h3>
//               <ul>
//                 {technicalSkills?.primaryProgrammingLanguages?.map((skill, index) => (
//                   <EditableText
//                     key={index}
//                     contentEditable
//                     suppressContentEditableWarning
//                     onBlur={(e) => handleContentChange('technicalSkills', `primaryProgrammingLanguages[${index}]`, e.target.innerText)}
//                   >
//                     {skill || 'Enter a technical skill...'}
//                   </EditableText>
//                 ))}
//               </ul>
//             </Section>
//             <Section>
//               <h3>Professional Experience</h3>
//               {professionalExperience?.map((experience, index) => (
//                 <div key={index}>
//                   <EditableText
//                     contentEditable
//                     suppressContentEditableWarning
//                     onBlur={(e) => handleContentChange('professionalExperience', `company[${index}]`, e.target.innerText)}
//                   >
//                     {experience.company} - {experience.location}
//                   </EditableText>
//                   <EditableText
//                     contentEditable
//                     suppressContentEditableWarning
//                     onBlur={(e) => handleContentChange('professionalExperience', `period[${index}]`, e.target.innerText)}
//                   >
//                     {experience.period}
//                   </EditableText>
//                   {experience.roles?.map((role, roleIndex) => (
//                     <div key={roleIndex}>
//                       <EditableText
//                         contentEditable
//                         suppressContentEditableWarning
//                         onBlur={(e) => handleContentChange('professionalExperience', `roles[${index}][${roleIndex}].title`, e.target.innerText)}
//                       >
//                         {role.title}
//                       </EditableText>
//                       <ul>
//                         {role.description?.map((desc, descIndex) => (
//                           <EditableText
//                             key={descIndex}
//                             contentEditable
//                             suppressContentEditableWarning
//                             onBlur={(e) => handleContentChange('professionalExperience', `roles[${index}][${roleIndex}].description[${descIndex}]`, e.target.innerText)}
//                           >
//                             {desc}
//                           </EditableText>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </Section>
//             <Section>
//               <h3>Education</h3>
//               <EditableText
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleContentChange('education', 'institution', e.target.innerText)}
//               >
//                 {education?.institution || 'Enter your institution here...'}
//               </EditableText>
//               <EditableText
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleContentChange('education', 'degree', e.target.innerText)}
//               >
//                 {education?.degree || 'Enter your degree here...'}
//               </EditableText>
//               <EditableText
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleContentChange('education', 'period', e.target.innerText)}
//               >
//                 {education?.period || 'Enter your graduation period here...'}
//               </EditableText>
//             </Section>
//           </MainContent>
//         </Container>
//       </div>
//     </ThemeProvider>

//   );
// };

// export const MiniModernResumeTemplate = (props) => <ModernResumeTemplate {...props} isMini={true} />;

// export default ModernResumeTemplate;



