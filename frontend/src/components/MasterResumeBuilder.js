import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: monospace;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #18BC9C;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

const MasterResumeBuilder = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve the userId from local storage

        if (!userId) {
          console.error('No user ID found in local storage.');
          setIsLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
        
        if (response.data) {
          setJsonInput(JSON.stringify(response.data.resumeData, null, 2)); // Load and format the existing resume JSON
          setEditMode(true); // Switch to edit mode if a resume exists
        } else {
          setEditMode(false);
        }
      } catch (error) {
        console.error('Failed to load resume', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleSave = async () => {
    try {
      const resumeData = JSON.parse(jsonInput); // Parse the JSON input before saving
      const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

      if (editMode) {
        await axios.put(`http://localhost:5001/resumes/master/${userId}`, { resumeData });
      } else {
        await axios.post('http://localhost:5001/resumes/master', { userId, resumeData });
      }
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Failed to save resume', error);
      alert('Failed to save resume. Please make sure the JSON is correctly formatted.');
    }
  };

  return (
    <Container>
      <h1>{editMode ? 'Edit' : 'Create'} Your Master Resume</h1>
      {isLoading ? (
        <p>Loading resume...</p>
      ) : (
        <>
          <TextArea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Paste your resume JSON here..."
          />
          <Button onClick={handleSave}>{editMode ? 'Save Changes' : 'Create Resume'}</Button>
        </>
      )}
    </Container>
  );
};

export default MasterResumeBuilder;




// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';

// const Container = styled.div`
//   padding: 20px;
//   max-width: 800px;
//   margin: 0 auto;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   height: 300px;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-family: monospace;
//   font-size: 14px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #18BC9C;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #16a085;
//   }
// `;

// const MasterResumeBuilder = ({ userId, editMode }) => {
//   const [jsonInput, setJsonInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     console.log(editMode)
//     if (editMode) {
//       const fetchResume = async () => {
//         try {
//           setIsLoading(true);
//           const response = await axios.get(`http://localhost:5001/api/resumes/master/${userId}`);
          
//           if (response.data) {
//             setJsonInput(JSON.stringify(response.data.resumeData, null, 2)); // Load and format the existing resume JSON
//           } 
//         } catch (error) {
//           console.error('Failed to load resume', error);
//           alert('Failed to load resume. Please try again.');
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       fetchResume();
//     }
//   }, [editMode, userId]);


//   const handleSave = async () => {
//     try {
//       const resumeData = JSON.parse(jsonInput); // Parse the JSON input before saving
//       const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
//   console.log(editMode)
//       if (editMode) {
//         await axios.put(`http://localhost:5001/api/resumes/master/${userId}`, { resumeData });
//       } else {
//         await axios.post('http://localhost:5001/api/resumes/master/', { userId, resumeData });
//       }
//       alert('Resume saved successfully!');
//     } catch (error) {
//       console.error('Failed to save resume', error);
//       alert('Failed to save resume. Please make sure the JSON is correctly formatted.');
//     }
//   };
  



//   return (
//     <Container>
//       <h1>{editMode ? 'Edit' : 'Create'} Your Master Resume</h1>
//       {isLoading ? (
//         <p>Loading resume...</p>
//       ) : (
//         <>
//           <TextArea
//             value={jsonInput}
//             onChange={(e) => setJsonInput(e.target.value)}
//             placeholder="Paste your resume JSON here..."
//           />
//           <Button onClick={handleSave}>{editMode ? 'Save Changes' : 'Create Resume'}</Button>
//         </>
//       )}
//     </Container>
//   );
// };

// export default MasterResumeBuilder;



// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';

// const Container = styled.div`
//   padding: 20px;
//   max-width: 800px;
//   margin: 0 auto;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   height: 300px;
//   padding: 10px;
//   margin-bottom: 20px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   font-family: monospace;
//   font-size: 14px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background-color: #18BC9C;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #16a085;
//   }
// `;

// const MasterResumeBuilder = ({ userId, editMode }) => {
//   const [jsonInput, setJsonInput] = useState('');

//   useEffect(() => {
//     if (editMode) {
//       const fetchResume = async () => {
//         try {
//           console.log(userId)
//           const response = await axios.get(`http://localhost:5001/api/resumes/${userId}`);
          
//           if (response.data) {
//             setJsonInput(JSON.stringify(response.data, null, 2)); // Load and format the existing resume JSON
//           }
//         } catch (error) {
//           console.error('Failed to load resume', error);
//         }
//       };

//       fetchResume();
//     }
//   }, [editMode, userId]);

//   const handleSave = async () => {
//     try {
//       const resumeData = JSON.parse(jsonInput); // Parse the JSON input before saving

//       if (editMode) {
//         await axios.put(`http://localhost:5001/api/resumes/${userId}`, { resumeData });
//       } else {
//         await axios.post('http://localhost:5001/api/resumes', { userId, resumeData });
//       }
//       alert('Resume saved successfully!');
//     } catch (error) {
//       console.error('Failed to save resume');
//       alert('Failed to save resume. Please make sure the JSON is correctly formatted.');
//     }
//   };

//   return (
//     <Container>
//       <h1>{editMode ? 'Edit' : 'Create'} Your Master Resume</h1>
//       <TextArea
//         value={jsonInput}
//         onChange={(e) => setJsonInput(e.target.value)}
//         placeholder="Paste your resume JSON here..."
//       />
//       <Button onClick={handleSave}>{editMode ? 'Save Changes' : 'Create Resume'}</Button>
//     </Container>
//   );
// };

// export default MasterResumeBuilder;
