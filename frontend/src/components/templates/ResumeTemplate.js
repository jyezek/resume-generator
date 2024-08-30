import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Container = styled.div`
  margin: 20px auto;
  padding: 0;
  max-width: 800px;
  background-color: white;
`;

const Page = styled.div`
  padding: 20mm 10mm;
  box-sizing: border-box;

  @media print {
    padding: 0mm 10mm;
  }
`;

const ExportButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
  }

  @media print {
    display: none;
  }
`;

const Section = styled.section`
  margin-bottom: 30px;

  @media print {
    page-break-inside: avoid;
  }

  h2 {
    color: ${({ theme }) => theme.primaryColor};
    border-bottom: 2px solid ${({ theme }) => theme.secondaryColor};
    padding-bottom: 5px;
    margin-bottom: 15px;
    font-size: 1.5em;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
    }
  }
`;

const ResumeTemplate = ({ data, theme, isMini = false }) => {
  const { contactInformation, professionalSummary, technicalSkills, professionalExperience, education, keyProjectsAndAchievements, managementToolkit } = data;

  // Scale style for mini version
  const scaleStyle = isMini ? { transform: 'scale(0.25)', transformOrigin: 'top left', width: '400%', height: '400%', overflow: 'hidden' } : {};

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={scaleStyle}>
        <Container className="resume-container">
          <Page className="resume-page">
            <header>
              <h1>{contactInformation?.name || 'Your Name'}</h1>
              <p>
                {contactInformation?.email} | {contactInformation?.phone} | 
                <a href={contactInformation?.linkedin}>LinkedIn</a> | 
                <a href={contactInformation?.portfolio}>Portfolio</a>
              </p>
            </header>

            <Section className="professional-summary">
              <h2>Professional Summary</h2>
              <p>{professionalSummary}</p>
            </Section>

            <Section className="technical-skills">
              <h2>Technical Skills</h2>
              <ul>
                {Object.keys(technicalSkills || {}).map((skillCategory, index) => (
                  <li key={index}>
                    <strong>{skillCategory.replace(/([A-Z])/g, ' $1').trim()}:</strong> {technicalSkills[skillCategory].join(', ')}
                  </li>
                ))}
              </ul>
            </Section>

            <Section className="professional-experience">
              <h2>Professional Experience</h2>
              {professionalExperience?.map((experience, index) => (
                <div key={index}>
                  <h3>{experience.company} - {experience.location}</h3>
                  <p>{experience.period}</p>
                  {experience.roles?.map((role, roleIndex) => (
                    <div key={roleIndex}>
                      <h4>{role.title}</h4>
                      <ul>
                        {role.description?.map((desc, descIndex) => (
                          <li key={descIndex}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </Section>

            <Section className="education">
              <h2>Education</h2>
              <p>{education?.institution} - {education?.degree}</p>
              <p>{education?.period}</p>
            </Section>

            <Section className="key-projects">
              <h2>Key Projects and Achievements</h2>
              <ul>
                {keyProjectsAndAchievements?.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </Section>

            <Section className="management-toolkit">
              <h2>Management Toolkit</h2>
              <ul>
                {managementToolkit?.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </Section>
          </Page>
          {!isMini && (
            <ExportButton className="export-button" onClick={handleExportPDF}>
              Export to PDF
            </ExportButton>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
};

// Export both full and mini versions
export const MiniResumeTemplate = (props) => <ResumeTemplate {...props} isMini={true} />;
export default ResumeTemplate;



// import React from 'react';
// import styled, { ThemeProvider } from 'styled-components';

// const Container = styled.div`
//   margin: 20px auto;
//   padding: 0; /* Remove padding to avoid duplication */
//   max-width: 800px;
//   background-color: white;

// `;

// const Page = styled.div`
//   padding: 20mm 10mm; /* Add padding inside the page margins for print */
//   box-sizing: border-box;

//   @media print {
//     padding: 0mm 10mm; /* Ensure padding in print */
//   }
// `;

// const ExportButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   background-color: ${({ theme }) => theme.primaryColor};
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${({ theme }) => theme.secondaryColor};
//   }

//   @media print {
//     display: none;
//   }
// `;

// const Section = styled.section`
//   margin-bottom: 30px;

//   @media print {
//     page-break-inside: avoid;
//   }

//   h2 {
//     color: ${({ theme }) => theme.primaryColor};
//     border-bottom: 2px solid ${({ theme }) => theme.secondaryColor};
//     padding-bottom: 5px;
//     margin-bottom: 15px;
//     font-size: 1.5em;
//   }

//   ul {
//     list-style-type: disc;
//     padding-left: 20px;

//     li {
//       margin-bottom: 8px;
//     }
//   }
// `;

// const ResumeTemplate = ({ data, theme }) => {
//   const { contactInformation, professionalSummary, technicalSkills, professionalExperience, education, keyProjectsAndAchievements, managementToolkit } = data;

//   const handleExportPDF = () => {
//     window.print();
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container className="resume-container">
//         <Page className="resume-page">
//           <header>
//             <h1>{contactInformation.name}</h1>
//             <p>{contactInformation.email} | {contactInformation.phone} | <a href={contactInformation.linkedin}>LinkedIn</a> | <a href={contactInformation.portfolio}>Portfolio</a></p>
//           </header>

//           <Section className="professional-summary">
//             <h2>Professional Summary</h2>
//             <p>{professionalSummary}</p>
//           </Section>

//           <Section className="technical-skills">
//             <h2>Technical Skills</h2>
//             <ul>
//               {Object.keys(technicalSkills).map((skillCategory, index) => (
//                 <li key={index}>
//                   <strong>{skillCategory.replace(/([A-Z])/g, ' $1').trim()}:</strong> {technicalSkills[skillCategory].join(', ')}
//                 </li>
//               ))}
//             </ul>
//           </Section>

//           <Section className="professional-experience">
//             <h2>Professional Experience</h2>
//             {professionalExperience.map((experience, index) => (
//               <div key={index}>
//                 <h3>{experience.company} - {experience.location}</h3>
//                 <p>{experience.period}</p>
//                 {experience.roles.map((role, roleIndex) => (
//                   <div key={roleIndex}>
//                     <h4>{role.title}</h4>
//                     <ul>
//                       {role.description.map((desc, descIndex) => (
//                         <li key={descIndex}>{desc}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </Section>

//           <Section className="education">
//             <h2>Education</h2>
//             <p>{education.institution} - {education.degree}</p>
//             <p>{education.period}</p>
//           </Section>

//           <Section className="key-projects">
//             <h2>Key Projects and Achievements</h2>
//             <ul>
//               {keyProjectsAndAchievements.map((project, index) => (
//                 <li key={index}>{project}</li>
//               ))}
//             </ul>
//           </Section>

//           <Section className="management-toolkit">
//             <h2>Management Toolkit</h2>
//             <ul>
//               {managementToolkit.map((tool, index) => (
//                 <li key={index}>{tool}</li>
//               ))}
//             </ul>
//           </Section>
//         </Page>
//         <ExportButton className="export-button" onClick={handleExportPDF}>
//           Export to PDF
//         </ExportButton>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default ResumeTemplate;






// import React from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import styled, { ThemeProvider } from 'styled-components';

// const defaultTheme = {
//     primaryColor: '#2C3E50',
//     secondaryColor: '#18BC9C',
//     textColor: '#333',
//     backgroundColor: '#f7f7f7',
//     fontSize: '16px',
//     fontFamily: "'Arial', sans-serif",
//   };

// const ExportButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   background-color: ${({ theme }) => theme.primaryColor};
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${({ theme }) => theme.secondaryColor};
//   }
// `;


// const Container = styled.div`
//   background-color: ${({ theme }) => theme.backgroundColor};
//   color: ${({ theme }) => theme.textColor};
//   font-family: ${({ theme }) => theme.fontFamily};
//   font-size: ${({ theme }) => theme.fontSize};
//   padding: 20px;
//   max-width: 800px;
//   margin: 0 auto;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Header = styled.header`
//   text-align: center;
//   margin-bottom: 20px;

//   h1 {
//     color: ${({ theme }) => theme.primaryColor};
//     font-size: 2.5em;
//     margin-bottom: 10px;
//   }

//   p {
//     font-size: 1.2em;
//     margin: 0;
//     a {
//       color: ${({ theme }) => theme.secondaryColor};
//       text-decoration: none;
//     }
//   }
// `;

// const Section = styled.section`
//   margin-bottom: 30px;

//   h2 {
//     color: ${({ theme }) => theme.primaryColor};
//     border-bottom: 2px solid ${({ theme }) => theme.secondaryColor};
//     padding-bottom: 5px;
//     margin-bottom: 15px;
//     font-size: 1.5em;
//   }

//   ul {
//     list-style-type: disc;
//     padding-left: 20px;

//     li {
//       margin-bottom: 8px;
//     }
//   }
// `;

// const ResumeTemplate = ({ data, theme = defaultTheme }) => {
//   const { contactInformation, professionalSummary, technicalSkills, professionalExperience, education, keyProjectsAndAchievements, managementToolkit } = data;


// //   const exportToPDF = () => {
// //     const input = document.getElementById('resume');
// //     html2canvas(input).then((canvas) => {
// //       const imgData = canvas.toDataURL('image/png');
// //       const pdf = new jsPDF('p', 'mm', 'a4');
// //       const imgWidth = 210; // A4 width in mm
// //       const pageHeight = 297; // A4 height in mm
// //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
// //       let heightLeft = imgHeight;
// //       let position = 0;

// //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
// //       heightLeft -= pageHeight;

// //       while (heightLeft >= 0) {
// //         position = heightLeft - imgHeight;
// //         pdf.addPage();
// //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
// //         heightLeft -= pageHeight;
// //       }
// //       pdf.save('resume.pdf');
// //     });
// //   };



// // const exportToPDF = () => {
// //     const input = document.getElementById('resume');
// //     const pdf = new jsPDF('p', 'mm', 'a4');
// //     const margin = 10; 
// //     const pageWidth = pdf.internal.pageSize.getWidth();
// //     const pageHeight = pdf.internal.pageSize.getHeight();
  
// //     html2canvas(input, { scale: 2 }).then((canvas) => {
// //       const imgData = canvas.toDataURL('image/png');
// //       const imgWidth = pageWidth - 2 * margin;
// //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
// //       let position = margin;
// //       let remainingHeight = imgHeight;
  
// //       while (remainingHeight > 0) {
// //         if (position + imgHeight <= pageHeight - margin) {
// //           pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
// //           remainingHeight -= pageHeight - position - margin;
// //           break;
// //         } else {
// //           const splitCanvas = document.createElement('canvas');
// //           splitCanvas.width = canvas.width;
// //           splitCanvas.height = canvas.height / 2;
// //           const splitCtx = splitCanvas.getContext('2d');
// //           splitCtx.drawImage(canvas, 0, -(remainingHeight - imgHeight));
  
// //           const splitImgData = splitCanvas.toDataURL('image/png');
// //           pdf.addImage(splitImgData, 'PNG', margin, position, imgWidth, imgHeight / 2);
// //           pdf.addPage();
// //           remainingHeight -= pageHeight - margin;
// //         }
// //       }
  
// //       pdf.save('resume.pdf');
// //     });
// //   };
  




// const exportToPDF = () => {
//     const input = document.getElementById('resume');
//     const margin = 10; // Add some padding to the PDF
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
  
//     html2canvas(input, {
//       scale: 2, // Increase scale for better quality
//       useCORS: true, // Handle cross-origin images if needed
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const imgWidth = pageWidth - 2 * margin;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = margin;
  
//       pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight - 2 * margin;
  
//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight + margin;
//         pdf.addPage();
//         pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight - 2 * margin;
//       }
  
//       pdf.save('resume.pdf');
//     });
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container id="resume">
//         <Header>
//           <h1>{contactInformation.name}</h1>
//           <p>{contactInformation.email} | {contactInformation.phone} | <a href={contactInformation.linkedin}>LinkedIn</a> | <a href={contactInformation.portfolio}>Portfolio</a></p>
//         </Header>

//         <Section className="professional-summary">
//           <h2>Professional Summary</h2>
//           <p>{professionalSummary}</p>
//         </Section>

//         <Section className="technical-skills">
//           <h2>Technical Skills</h2>
//           <ul>
//             {Object.keys(technicalSkills).map((skillCategory, index) => (
//               <li key={index}>
//                 <strong>{skillCategory.replace(/([A-Z])/g, ' $1').trim()}:</strong> {technicalSkills[skillCategory].join(', ')}
//               </li>
//             ))}
//           </ul>
//         </Section>

//         <Section className="professional-experience">
//           <h2>Professional Experience</h2>
//           {professionalExperience.map((experience, index) => (
//             <div key={index}>
//               <h3>{experience.company} - {experience.location}</h3>
//               <p>{experience.period}</p>
//               {experience.roles.map((role, roleIndex) => (
//                 <div key={roleIndex}>
//                   <h4>{role.title}</h4>
//                   <ul>
//                     {role.description.map((desc, descIndex) => (
//                       <li key={descIndex}>{desc}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </Section>

//         <Section className="education">
//           <h2>Education</h2>
//           <p>{education.institution} - {education.degree}</p>
//           <p>{education.period}</p>
//         </Section>

//         <Section className="key-projects">
//           <h2>Key Projects and Achievements</h2>
//           <ul>
//             {keyProjectsAndAchievements.map((project, index) => (
//               <li key={index}>{project}</li>
//             ))}
//           </ul>
//         </Section>

//         <Section className="management-toolkit">
//           <h2>Management Toolkit</h2>
//           <ul>
//             {managementToolkit.map((tool, index) => (
//               <li key={index}>{tool}</li>
//             ))}
//           </ul>
//         </Section>
//       </Container>
//       <ExportButton onClick={exportToPDF}>Export to PDF</ExportButton>
//     </ThemeProvider>
//   );
// };

// export default ResumeTemplate;
