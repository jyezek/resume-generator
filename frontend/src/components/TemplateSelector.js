import React from 'react';
import styled from 'styled-components';
import { MiniResumeTemplate } from './templates/ResumeTemplate';
import { MiniModernResumeTemplate } from './templates/ModernResumeTemplate';

const TemplateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const TemplateOption = styled.div`
  border: 2px solid ${({ selected }) => (selected ? '#18BC9C' : '#ccc')};
  border-radius: 5px;
  padding: 10px;
  width: 30%;
  cursor: pointer;
  text-align: center;
  height: 300px;

  &:hover {
    border-color: #18BC9C;
  }

  & > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const TemplateLabel = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  color: ${({ selected }) => (selected ? '#18BC9C' : '#333')};
  margin-top: 10px;
`;

const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  const handleTemplateChange = (template) => {
    if (typeof onTemplateChange === 'function') {
      onTemplateChange(template);
    }
  };

  return (
    <TemplateContainer>
      <TemplateOption
        selected={selectedTemplate === 'modern'}
        onClick={() => handleTemplateChange('modern')}
      >
        <div>
          <MiniModernResumeTemplate data={{}} theme={{}} /> {/* Mini preview */}
        </div>
        <TemplateLabel selected={selectedTemplate === 'modern'}>Modern Template</TemplateLabel>
      </TemplateOption>

      <TemplateOption
        selected={selectedTemplate === 'classic'}
        onClick={() => handleTemplateChange('classic')}
      >
        <div>
          <MiniResumeTemplate data={{}} theme={{}} /> {/* Mini preview */}
        </div>
        <TemplateLabel selected={selectedTemplate === 'classic'}>Classic Template</TemplateLabel>
      </TemplateOption>
    </TemplateContainer>
  );
};

export default TemplateSelector;




// import React from 'react';
// import styled from 'styled-components';
// import { MiniResumeTemplate } from './templates/ResumeTemplate';
// import { MiniModernResumeTemplate } from './templates/ModernResumeTemplate';

// const TemplateContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-bottom: 20px;
// `;

// const TemplateOption = styled.div`
//   border: 2px solid ${({ isSelected }) => (isSelected ? '#18BC9C' : '#ccc')};
//   border-radius: 5px;
//   padding: 10px;
//   width: 30%;
//   cursor: pointer;
//   text-align: center;
//   height: 300px;

//   &:hover {
//     border-color: #18BC9C;
//   }

//   & > div {
//     width: 100%;
//     height: 100%;
//     overflow: hidden;
//   }
// `;

// const TemplateLabel = styled.p`
//   font-size: 1.1em;
//   font-weight: bold;
//   color: ${({ isSelected }) => (isSelected ? '#18BC9C' : '#333')};
//   margin-top: 10px;
// `;

// const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
//   return (
//     <TemplateContainer>
//       <TemplateOption
//         isSelected={selectedTemplate === 'modern'}
//         onClick={() => onTemplateChange('modern')}
//       >
//         <div>
//           <MiniModernResumeTemplate data={{}} theme={{}} /> {/* Mini preview */}
//         </div>
//         <TemplateLabel isSelected={selectedTemplate === 'modern'}>Modern Template</TemplateLabel>
//       </TemplateOption>

//       <TemplateOption
//         isSelected={selectedTemplate === 'classic'}
//         onClick={() => onTemplateChange('classic')}
//       >
//         <div>
//           <MiniResumeTemplate data={{}} theme={{}} /> {/* Mini preview */}
//         </div>
//         <TemplateLabel isSelected={selectedTemplate === 'classic'}>Classic Template</TemplateLabel>
//       </TemplateOption>
//     </TemplateContainer>
//   );
// };

// export default TemplateSelector;



// import React from 'react';
// import styled from 'styled-components';
// import { MiniModernResumeTemplate } from './templates/ModernResumeTemplate';
// // import ClassicResumeTemplate from './ClassicResumeTemplate';

// const TemplateContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-bottom: 20px;
// `;

// const TemplateOption = styled.div`
//   border: 2px solid ${({ isSelected }) => (isSelected ? '#18BC9C' : '#ccc')};
//   border-radius: 5px;
//   padding: 10px;
//   width: 30%;
//   cursor: pointer;
//   text-align: center;
//   height: 300px;

//   &:hover {
//     border-color: #18BC9C;
//   }

//   & > div {
//     width: 100%;
//     height: 100%;
//     overflow: hidden;
//   }
// `;

// const TemplateLabel = styled.p`
//   font-size: 1.1em;
//   font-weight: bold;
//   color: ${({ isSelected }) => (isSelected ? '#18BC9C' : '#333')};
//   margin-top: 10px;
// `;

// const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
//     const emptyData = {}; // This will trigger the use of default props in the component
  
//     return (
//       <TemplateContainer>
//         <TemplateOption
//           isSelected={selectedTemplate === 'modern'}
//           onClick={() => onTemplateChange('modern')}
//         >
//           <div>
//             <MiniModernResumeTemplate data={emptyData} theme={{}} /> {/* Mini preview */}
//           </div>
//           <TemplateLabel isSelected={selectedTemplate === 'modern'}>Modern Template</TemplateLabel>
//         </TemplateOption>
  
//         <TemplateOption
//           isSelected={selectedTemplate === 'classic'}
//           onClick={() => onTemplateChange('classic')}
//         >
//           <div>
//             {/* Assuming you create a MiniClassicResumeTemplate similarly */}
//             <ClassicResumeTemplate data={emptyData} theme={{}} /> {/* Placeholder for now */}
//           </div>
//           <TemplateLabel isSelected={selectedTemplate === 'classic'}>Classic Template</TemplateLabel>
//         </TemplateOption>
//       </TemplateContainer>
//     );
//   };
  

// export default TemplateSelector;






// import React from 'react';
// import styled from 'styled-components';
// import ModernResumeTemplate from './ModernResumeTemplate';
// import ClassicResumeTemplate from './ClassicResumeTemplate';

// const TemplateContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-bottom: 20px;
// `;

// const TemplateOption = styled.div`
//   border: 2px solid ${({ isSelected }) => (isSelected ? '#18BC9C' : '#ccc')};
//   border-radius: 5px;
//   padding: 10px;
//   width: 30%;
//   cursor: pointer;
//   text-align: center;
//   height: 300px;  /* Adjust the height to fit your previews */

//   &:hover {
//     border-color: #18BC9C;
//   }

//   & > div {
//     transform: scale(0.25);  /* Scale down the preview */
//     transform-origin: top left;
//     width: 100%;
//     height: 100%;
//     overflow: hidden;
//   }
// `;

// const TemplateLabel = styled.p`
//   font-size: 1.1em;
//   font-weight: bold;
//   color: ${({ isSelected }) => (isSelected ? '#18BC9C' : '#333')};
//   margin-top: 10px;
// `;

// const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
//   return (
//     <TemplateContainer>
//       <TemplateOption
//         isSelected={selectedTemplate === 'modern'}
//         onClick={() => onTemplateChange('modern')}
//       >
//         <div>
//           <ModernResumeTemplate data={{}} theme={{}} /> {/* Mini preview */}
//         </div>
//         <TemplateLabel isSelected={selectedTemplate === 'modern'}>Modern Template</TemplateLabel>
//       </TemplateOption>

//       <TemplateOption
//         isSelected={selectedTemplate === 'classic'}
//         onClick={() => onTemplateChange('classic')}
//       >
//         <div>
//           <ClassicResumeTemplate data={{}} theme={{}} /> {/* Mini preview */}
//         </div>
//         <TemplateLabel isSelected={selectedTemplate === 'classic'}>Classic Template</TemplateLabel>
//       </TemplateOption>
//     </TemplateContainer>
//   );
// };

// export default TemplateSelector;





// import React from 'react';
// import styled from 'styled-components';

// const TemplateContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-bottom: 20px;
// `;

// const TemplateOption = styled.div`
//   border: 2px solid ${({ isSelected }) => (isSelected ? '#18BC9C' : '#ccc')};
//   border-radius: 5px;
//   padding: 20px;
//   width: 30%;
//   cursor: pointer;
//   text-align: center;

//   &:hover {
//     border-color: #18BC9C;
//   }
// `;

// const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
//   return (
//     <TemplateContainer>
//       <TemplateOption
//         isSelected={selectedTemplate === 'modern'}
//         onClick={() => onTemplateChange('modern')}
//       >
//         Modern Template
//       </TemplateOption>
//       <TemplateOption
//         isSelected={selectedTemplate === 'classic'}
//         onClick={() => onTemplateChange('classic')}
//       >
//         Classic Template
//       </TemplateOption>
//       {/* Add more templates as needed */}
//     </TemplateContainer>
//   );
// };

// export default TemplateSelector;
