import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import MasterResumeWidget from './widgets/MasterResumeWidget';
import TailoredResumeWidget from './widgets/TailoredResumeWidget';
import GeneratedResumes from './widgets/GeneratedResumes';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [generatedResumes, setGeneratedResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingMasterResume, setIsEditingMasterResume] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  useEffect(() => {
    const fetchGeneratedResumes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
        if (generatedResumesResponse.data) {
          setGeneratedResumes(generatedResumesResponse.data);
        }
      } catch (error) {
        console.error('Failed to load resumes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeneratedResumes();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleEditMasterResume = () => {
    setIsEditingMasterResume(true);
  };

  const closeEditMasterResumeModal = () => {
    setIsEditingMasterResume(false);
  };

  const handleEditResume = (resumeId) => {
    setSelectedResumeId(resumeId);
    // You might handle opening a modal or navigating to a different route for editing resumes
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
              Profile
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={classNames(
                        active ? 'bg-gray-700 text-white' : 'text-gray-300',
                        'group flex items-center px-4 py-2 text-sm'
                      )}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <MasterResumeWidget
          userId={localStorage.getItem('userId')}
          onEdit={handleEditMasterResume}
        />
        {/* Ensure TailoredResumeWidget is working properly */}
        <TailoredResumeWidget userId={localStorage.getItem('userId')} />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white">Generated Resumes</h2>
      <GeneratedResumes resumes={generatedResumes} onEditResume={handleEditResume} />

      {/* Modal for Editing Master Resume */}
      <Dialog
        open={isEditingMasterResume}
        onClose={closeEditMasterResumeModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <Dialog.Title className="text-lg font-medium text-white">
              Edit Master Resume
            </Dialog.Title>
            {/* Include the form or content to edit the master resume */}
            <button
              onClick={closeEditMasterResumeModal}
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Dashboard;



// import React, { useEffect, useState, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Menu, Transition, Dialog } from '@headlessui/react';
// import { UserCircleIcon } from '@heroicons/react/24/solid';
// import MasterResumeWidget from './widgets/MasterResumeWidget';
// import TailoredResumeWidget from './widgets/TailoredResumeWidget';
// import GeneratedResumes from './widgets/GeneratedResumes';
// // import ResumeGenerationFlow from './ResumeGenerationFlow';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditingMasterResume, setIsEditingMasterResume] = useState(false);
//   const [isResumeModalOpen, setResumeModalOpen] = useState(false);
//   const [selectedResumeId, setSelectedResumeId] = useState(null);

//   useEffect(() => {
//     const fetchGeneratedResumes = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) return;

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchGeneratedResumes();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleEditMasterResume = () => {
//     setIsEditingMasterResume(true);
//   };

//   const closeEditMasterResumeModal = () => {
//     setIsEditingMasterResume(false);
//   };

//   const handleEditResume = (resumeId) => {
//     setSelectedResumeId(resumeId);
//     setResumeModalOpen(true);
//   };


//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//         <Menu as="div" className="relative inline-block text-left">
//           <div>
//             <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
//               <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
//               Profile
//             </Menu.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
//               <div className="py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={handleLogout}
//                       className={classNames(
//                         active ? 'bg-gray-700 text-white' : 'text-gray-300',
//                         'group flex items-center px-4 py-2 text-sm'
//                       )}
//                     >
//                       Logout
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>

//       <div className="grid grid-cols-1 gap-6 mb-6">
//         <MasterResumeWidget
//           userId={localStorage.getItem('userId')}
//           onEdit={handleEditMasterResume}
//         />
//         <TailoredResumeWidget userId={localStorage.getItem('userId')} />
//       </div>

//       <h2 className="text-2xl font-semibold mb-4 text-white">Generated Resumes</h2>
//       <GeneratedResumes resumes={generatedResumes} onEditResume={handleEditResume} />

//       {/* Modal for Editing Master Resume */}
//       <Dialog
//         open={isEditingMasterResume}
//         onClose={closeEditMasterResumeModal}
//         className="fixed inset-0 z-10 overflow-y-auto"
//       >
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
//           <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full">
//             <Dialog.Title className="text-lg font-medium text-white">
//               Edit Master Resume
//             </Dialog.Title>
//             {/* Here you would include your form for editing the master resume */}
//             <button
//               onClick={closeEditMasterResumeModal}
//               className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>

//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Menu, Transition, Dialog } from '@headlessui/react';
// import { UserCircleIcon } from '@heroicons/react/24/solid';
// import MasterResumeWidget from './widgets/MasterResumeWidget';  // Import the MasterResumeWidget component
// import TailoredResumeWidget from './widgets/TailoredResumeWidget'; 
// import GeneratedResumes from './widgets/GeneratedResumes';  // Import the GeneratedResumes component

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditingMasterResume, setIsEditingMasterResume] = useState(false);

//   useEffect(() => {
//     const fetchGeneratedResumes = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) return;

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchGeneratedResumes();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleEditMasterResume = () => {
//     setIsEditingMasterResume(true);
//   };

//   const closeEditMasterResumeModal = () => {
//     setIsEditingMasterResume(false);
//   };


//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//         <Menu as="div" className="relative inline-block text-left">
//           <div>
//             <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
//               <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
//               Profile
//             </Menu.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
//               <div className="py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={handleLogout}
//                       className={classNames(
//                         active ? 'bg-gray-700 text-white' : 'text-gray-300',
//                         'group flex items-center px-4 py-2 text-sm'
//                       )}
//                     >
//                       Logout
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>

//       <div className="grid grid-cols-1  gap-6 mb-6">
//         <MasterResumeWidget
//           userId={localStorage.getItem('userId')}
//           onEdit={handleEditMasterResume}
//         />
        
// <TailoredResumeWidget
//           userId={localStorage.getItem('userId')}
//         />


//       </div>

//       <h2 className="text-2xl font-semibold mb-4 text-white">Generated Resumes</h2>
//       <GeneratedResumes resumes={generatedResumes} onEditResume={handleEditResume} />

//       <Dialog
//         open={isEditingMasterResume}
//         onClose={closeEditMasterResumeModal}
//         className="fixed inset-0 z-10 overflow-y-auto"
//       >
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
//           <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full">
//             <Dialog.Title className="text-lg font-medium text-white">
//               Edit Master Resume
//             </Dialog.Title>
//             {/* Here you would include your form for editing the master resume */}
//             <button
//               onClick={closeEditMasterResumeModal}
//               className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Menu, Transition, Dialog } from '@headlessui/react';
// import { UserCircleIcon } from '@heroicons/react/24/solid';
// import MiniModernResumeTemplate from './templates/ModernResumeTemplate';
// import MiniClassicResumeTemplate from './templates/ResumeTemplate';
// import MasterResumeWidget from './widgets/MasterResumeWidget';  // Import the MasterResumeWidget component

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditingMasterResume, setIsEditingMasterResume] = useState(false);

//   useEffect(() => {
//     const fetchGeneratedResumes = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) return;

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchGeneratedResumes();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleEditMasterResume = () => {
//     setIsEditingMasterResume(true);
//   };

//   const closeEditMasterResumeModal = () => {
//     setIsEditingMasterResume(false);
//   };

//   const handleCreateNewResume = () => {
//     navigate('/resume-generation');
//   };

//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };

//   const renderMiniResume = (resume) => {
//     const selectedTemplate = resume.template || 'modern';

//     switch (selectedTemplate) {
//       case 'modern':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniModernResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       case 'classic':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniClassicResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       default:
//         return <p>Template not found</p>;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//         <Menu as="div" className="relative inline-block text-left">
//           <div>
//             <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
//               <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
//               Profile
//             </Menu.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
//               <div className="py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={handleLogout}
//                       className={classNames(
//                         active ? 'bg-gray-700 text-white' : 'text-gray-300',
//                         'group flex items-center px-4 py-2 text-sm'
//                       )}
//                     >
//                       Logout
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//         <MasterResumeWidget
//           userId={localStorage.getItem('userId')}
//           onEdit={handleEditMasterResume}
//         />
//         <div className="bg-gray-800 p-4 shadow-lg rounded-lg h-40 flex items-center justify-center text-white">
//           <button 
//             onClick={handleCreateNewResume} 
//             className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600"
//           >
//             Tailored Resume +
//           </button>
//         </div>
//       </div>

//       <h2 className="text-2xl font-semibold mb-4 text-white">Generated Resumes</h2>
//       {generatedResumes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {generatedResumes.map((resume) => (
//             <div 
//               key={resume._id} 
//               className="bg-gray-800 p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-700 h-96 flex flex-col justify-between overflow-hidden" 
//               onClick={() => handleEditResume(resume._id)}
//             >
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-white">
//                   {resume.resumeData.contactInformation?.name || 'Unnamed Resume'}
//                 </h3>
//                 <p className="text-gray-400 mb-4">
//                   {new Date(resume.generatedAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="border-t border-gray-600 pt-4 flex-grow overflow-hidden">
//                 <div className="w-full h-full flex justify-center items-center overflow-hidden">
//                   {renderMiniResume(resume)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-400">No resumes generated yet.</p>
//       )}

//       <Dialog
//         open={isEditingMasterResume}
//         onClose={closeEditMasterResumeModal}
//         className="fixed inset-0 z-10 overflow-y-auto"
//       >
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
//           <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full">
//             <Dialog.Title className="text-lg font-medium text-white">
//               Edit Master Resume
//             </Dialog.Title>
//             {/* Here you would include your form for editing the master resume */}
//             <button
//               onClick={closeEditMasterResumeModal}
//               className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useEffect, useState, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Menu, Transition, Dialog } from '@headlessui/react';
// import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/solid';
// import MiniModernResumeTemplate from './templates/ModernResumeTemplate';
// import MiniClassicResumeTemplate from './templates/ResumeTemplate';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const MasterResumeWidget = ({ masterResume, onEdit }) => {
//   return (
//     <div className="bg-gray-800 p-4 shadow-lg rounded-lg h-40 flex flex-col justify-between">
//       <div>
//         <h3 className="text-xl font-semibold mb-2 text-white">
//           {masterResume?.contactInformation?.name || 'Your Name'}
//         </h3>
//         <p className="text-gray-400">
//           {masterResume?.professionalSummary || 'Your professional summary goes here.'}
//         </p>
//       </div>
//       <div className="flex justify-end">
//         <PencilIcon
//           className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white"
//           onClick={onEdit}
//         />
//       </div>
//     </div>
//   );
// };

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const [masterResume, setMasterResume] = useState(null);
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditingMasterResume, setIsEditingMasterResume] = useState(false);

//   useEffect(() => {
//     const fetchResumes = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) return;

//         const masterResumeResponse = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
//         if (masterResumeResponse.data) {
//           setMasterResume(masterResumeResponse.data);
//         }

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResumes();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleEditMasterResume = () => {
//     setIsEditingMasterResume(true);
//   };

//   const closeEditMasterResumeModal = () => {
//     setIsEditingMasterResume(false);
//   };


//   const handleCreateNewResume = () => {
//     navigate('/resume-generation');
//   };

//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };
//   const renderMiniResume = (resume) => {
//     const selectedTemplate = resume.template || 'modern';

//     switch (selectedTemplate) {
//       case 'modern':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniModernResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       case 'classic':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniClassicResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       default:
//         return <p>Template not found</p>;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//         <Menu as="div" className="relative inline-block text-left">
//           <div>
//             <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
//               <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
//               Profile
//             </Menu.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
//               <div className="py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={handleLogout}
//                       className={classNames(
//                         active ? 'bg-gray-700 text-white' : 'text-gray-300',
//                         'group flex items-center px-4 py-2 text-sm'
//                       )}
//                     >
//                       Logout
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//         {masterResume && (
//           <MasterResumeWidget
//             masterResume={masterResume}
//             onEdit={handleEditMasterResume}
//           />
//         )}
//         <div className="bg-gray-800 p-4 shadow-lg rounded-lg h-40 flex items-center justify-center text-white">
//           <button 
//             onClick={handleCreateNewResume} 
//             className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600"
//           >
//             Tailored Resume +
//           </button>
//         </div>
//       </div>

//       <h2 className="text-2xl font-semibold mb-4 text-white">Generated Resumes</h2>
//       {generatedResumes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {generatedResumes.map((resume) => (
//             <div 
//               key={resume._id} 
//               className="bg-gray-800 p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-700 h-96 flex flex-col justify-between overflow-hidden" 
//               onClick={() => handleEditResume(resume._id)}
//             >
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-white">
//                   {resume.resumeData.contactInformation?.name || 'Unnamed Resume'}
//                 </h3>
//                 <p className="text-gray-400 mb-4">
//                   {new Date(resume.generatedAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="border-t border-gray-600 pt-4 flex-grow overflow-hidden">
//                 <div className="w-full h-full flex justify-center items-center overflow-hidden">
//                   {renderMiniResume(resume)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-400">No resumes generated yet.</p>
//       )}

//       <Dialog
//         open={isEditingMasterResume}
//         onClose={closeEditMasterResumeModal}
//         className="fixed inset-0 z-10 overflow-y-auto"
//       >
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
//           <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-2xl w-full">
//             <Dialog.Title className="text-lg font-medium text-white">
//               Edit Master Resume
//             </Dialog.Title>
//             {/* Here you would include your form for editing the master resume */}
//             <button
//               onClick={closeEditMasterResumeModal}
//               className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useEffect, useState, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Menu, Transition } from '@headlessui/react';
// import { UserCircleIcon, ArrowLeftEndOnRectangleIcon as LogoutIcon } from '@heroicons/react/24/solid';
// import MiniModernResumeTemplate from './templates/ModernResumeTemplate';
// import MiniClassicResumeTemplate from './templates/ResumeTemplate';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const [masterResumeExists, setMasterResumeExists] = useState(false);
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMasterResume = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
//         if (!userId) return;

//         const masterResumeResponse = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
//         if (masterResumeResponse.data) {
//           setMasterResumeExists(true);
//         }

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMasterResume();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleMasterResume = () => {
//     if (masterResumeExists) {
//       navigate('/edit-master-resume');
//     } else {
//       navigate('/create-master-resume');
//     }
//   };

//   const handleCreateNewResume = () => {
//     navigate('/resume-generation');
//   };

//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };

//   const renderMiniResume = (resume) => {
//     const selectedTemplate = resume.template || 'modern';

//     switch (selectedTemplate) {
//       case 'modern':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniModernResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       case 'classic':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniClassicResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       default:
//         return <p>Template not found</p>;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-white">Dashboard</h1>
//         <Menu as="div" className="relative inline-block text-left">
//           <div>
//             <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
//               <UserCircleIcon className="w-5 h-5 mr-2" aria-hidden="true" />

//             </Menu.Button>
//           </div>
//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
//               <div className="py-1">
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       onClick={handleLogout}
//                       className={classNames(
//                         active ? 'bg-gray-700 text-white' : 'text-gray-300',
//                         'group flex items-center px-4 py-2 text-sm'
//                       )}
//                     >
//                       <LogoutIcon className="w-5 h-5 mr-3" aria-hidden="true" />
//                       Logout
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>

//       <div className="flex space-x-4 mb-6">
//         <button 
//           onClick={handleCreateNewResume} 
//           className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Tailored Resume +
//         </button>
//         <button 
//           onClick={handleMasterResume} 
//           className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           {isLoading ? 'Loading...' : masterResumeExists ? 'Edit Master Resume' : 'Add Master Resume'}
//         </button>
//       </div>
      
//       <h2 className="text-2xl font-semibold mb-4 text-white">Generated Resumes</h2>
//       {generatedResumes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {generatedResumes.map((resume) => (
//             <div 
//               key={resume._id} 
//               className="bg-gray-800 p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-700 h-96 flex flex-col justify-between overflow-hidden" 
//               onClick={() => handleEditResume(resume._id)}
//             >
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-white">
//                   {resume.resumeData.contactInformation?.name || 'Unnamed Resume'}
//                 </h3>
//                 <p className="text-gray-400 mb-4">
//                   {new Date(resume.generatedAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="border-t border-gray-600 pt-4 flex-grow overflow-hidden">
//                 <div className="w-full h-full flex justify-center items-center overflow-hidden">
//                   {renderMiniResume(resume)}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-400">No resumes generated yet.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useEffect, useState, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import MiniModernResumeTemplate from './templates/ModernResumeTemplate';
// import MiniClassicResumeTemplate from './templates/ResumeTemplate';
// import { Menu, Transition } from '@headlessui/react';
// import { ChevronDownIcon } from '@heroicons/react/24/solid';


// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [masterResumeExists, setMasterResumeExists] = useState(false);
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMasterResume = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
//         if (!userId) return;

//         const masterResumeResponse = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
//         if (masterResumeResponse.data) {
//           setMasterResumeExists(true);
//         }

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMasterResume();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleMasterResume = () => {
//     if (masterResumeExists) {
//       navigate('/edit-master-resume');
//     } else {
//       navigate('/create-master-resume');
//     }
//   };

//   const handleCreateNewResume = () => {
//     navigate('/resume-generation');
//   };

//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };

//   const renderMiniResume = (resume) => {
//     const selectedTemplate = resume.template || 'modern'; // Default to modern if not specified

//     switch (selectedTemplate) {
//       case 'modern':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniModernResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       case 'classic':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniClassicResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       default:
//         return <p>Template not found</p>;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>
      
//       <div className="flex space-x-4 mb-6">
//         <button 
//           onClick={handleCreateNewResume} 
//           className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Create New Resume
//         </button>
//         <button 
//           onClick={handleMasterResume} 
//           className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           {isLoading ? 'Loading...' : masterResumeExists ? 'Edit Master Resume' : 'Create Master Resume'}
//         </button>
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       <Menu as="div" className="relative inline-block text-left mb-4">
//         <div>
//           <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
//             Sort Resumes
//             <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
//           </Menu.Button>
//         </div>
//         <Transition
//           as={Fragment}
//           enter="transition ease-out duration-100"
//           enterFrom="transform opacity-0 scale-95"
//           enterTo="transform opacity-100 scale-100"
//           leave="transition ease-in duration-75"
//           leaveFrom="transform opacity-100 scale-100"
//           leaveTo="transform opacity-0 scale-95"
//         >
//           <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//             <div className="py-1">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={classNames(
//                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                       'block px-4 py-2 text-sm w-full text-left'
//                     )}
//                   >
//                     Date Created
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={classNames(
//                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                       'block px-4 py-2 text-sm w-full text-left'
//                     )}
//                   >
//                     Name
//                   </button>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={classNames(
//                       active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                       'block px-4 py-2 text-sm w-full text-left'
//                     )}
//                   >
//                     Template
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Transition>
//       </Menu>

//       <h2 className="text-2xl font-semibold mb-4 text-white">Generated Resumes</h2>
//       {generatedResumes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {generatedResumes.map((resume) => (
//             <div 
//               key={resume._id} 
//               className="bg-gray-800 p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-700 h-72 flex flex-col justify-between overflow-hidden" 
//               onClick={() => handleEditResume(resume._id)}
//             >
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-white">
//                   {resume.resumeData.contactInformation?.name || 'Unnamed Resume'}
//                 </h3>
//                 <p className="text-gray-400 mb-4">
//                   {new Date(resume.generatedAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="border-t border-gray-600 pt-4 flex-grow overflow-hidden">
//                 <div className="w-full h-full flex justify-center items-center overflow-hidden">
//                   {renderMiniResume(resume)} {/* Render the mini version of the resume */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-400">No resumes generated yet.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;








// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import MiniModernResumeTemplate from './templates/ModernResumeTemplate'; 
// import MiniClassicResumeTemplate from './templates/ResumeTemplate';

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const [masterResumeExists, setMasterResumeExists] = useState(false);
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMasterResume = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
//         if (!userId) return;

//         const masterResumeResponse = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
//         if (masterResumeResponse.data) {
//           setMasterResumeExists(true);
//         }

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMasterResume();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleMasterResume = () => {
//     if (masterResumeExists) {
//       navigate('/edit-master-resume');
//     } else {
//       navigate('/create-master-resume');
//     }
//   };

//   const handleCreateNewResume = () => {
//     navigate('/resume-generation');
//   };

//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };


//   const renderMiniResume = (resume) => {
//     const selectedTemplate = resume.template || 'modern'; // Default to modern if not specified
  
//     switch (selectedTemplate) {
//       case 'modern':
//         return (
//           <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniModernResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       case 'classic':
//         return (
//           <div style={{  transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
//             <MiniClassicResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
//           </div>
//         );
//       default:
//         return <p>Template not found</p>;
//     }
//   };
  

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4 text-white">Dashboard</h1>
      
//       <div className="flex space-x-4 mb-6">
//         <button 
//           onClick={handleCreateNewResume} 
//           className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Create New Resume
//         </button>
//         <button 
//           onClick={handleMasterResume} 
//           className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           {isLoading ? 'Loading...' : masterResumeExists ? 'Edit Master Resume' : 'Create Master Resume'}
//         </button>
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
      
//       <h2 className="text-2xl font-semibold mb-4 text-white">Generated Resumes</h2>
//       {generatedResumes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {generatedResumes.map((resume) => (
//             <div 
//               key={resume._id} 
//               className="bg-gray-800 p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-700 h-96 flex flex-col justify-between overflow-hidden" 
//               onClick={() => handleEditResume(resume._id)}
//             >
//               <div>
//                 <h3 className="text-xl font-semibold mb-2 text-white">
//                   {resume.resumeData.contactInformation?.name || 'Unnamed Resume'}
//                 </h3>
//                 <p className="text-gray-400 mb-4">
//                   {new Date(resume.generatedAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <div className="border-t border-gray-600 pt-4 flex-grow overflow-hidden">
//                 <div className="w-full h-full flex justify-center items-center overflow-hidden">
//                   {renderMiniResume(resume)} {/* Render the mini version of the resume */}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-400">No resumes generated yet.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import MiniModernResumeTemplate from './templates/ModernResumeTemplate'; // Import the mini version of the resume template
// import MiniClassicResumeTemplate from './templates/ResumeTemplate';

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const [masterResumeExists, setMasterResumeExists] = useState(false);
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMasterResume = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
//         if (!userId) return;

//         const masterResumeResponse = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
//         if (masterResumeResponse.data) {
//           setMasterResumeExists(true);
//         }

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMasterResume();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleMasterResume = () => {
//     if (masterResumeExists) {
//       navigate('/edit-master-resume');
//     } else {
//       navigate('/create-master-resume');
//     }
//   };

//   const handleCreateNewResume = () => {
//     navigate('/resume-generation');
//   };

//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };

//   const renderMiniResume = (resume) => {
//     const selectedTemplate = resume.template || 'modern'; // Default to modern if not specified

//     switch (selectedTemplate) {
//       case 'modern':
//         return <MiniModernResumeTemplate data={resume.resumeData}  theme={{}} isMini={true}/>;
//       case 'classic':
//         return <MiniClassicResumeTemplate data={resume.resumeData}   theme={{}} isMini={true}/>;
//       default:
//         return <p>Template not found</p>;
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
//       <div className="flex space-x-4 mb-6">
//         <button 
//           onClick={handleCreateNewResume} 
//           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Create New Resume
//         </button>
//         <button 
//           onClick={handleMasterResume} 
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           {isLoading ? 'Loading...' : masterResumeExists ? 'Edit Master Resume' : 'Create Master Resume'}
//         </button>
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
      
//       <h2 className="text-2xl font-semibold mb-4">Generated Resumes</h2>
//       {generatedResumes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {generatedResumes.map((resume) => (
//             <div 
//               key={resume._id} 
//               className="bg-white p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-100" 
//               onClick={() => handleEditResume(resume._id)}
//             >
//               <h3 className="text-xl font-semibold mb-2">
//                 {resume.resumeData.contactInformation?.name || 'Unnamed Resume'}
//               </h3>
//               <p className="text-gray-500 mb-4">
//                 {new Date(resume.generatedAt).toLocaleDateString()}
//               </p>
//               <div className="border-t pt-4">
//                 {renderMiniResume(resume)} {/* Render the mini version of the resume */}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No resumes generated yet.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const [masterResumeExists, setMasterResumeExists] = useState(false);
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMasterResume = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
//         if (!userId) return;

//         const masterResumeResponse = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
//         if (masterResumeResponse.data) {
//           setMasterResumeExists(true);
//         }

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMasterResume();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleMasterResume = () => {
//     if (masterResumeExists) {
//       navigate('/edit-master-resume');
//     } else {
//       navigate('/create-master-resume');
//     }
//   };

//   const handleCreateNewResume = () => {
//     navigate('/resume-generation');
//   };

//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
//       <div className="flex space-x-4 mb-6">
//         <button 
//           onClick={handleCreateNewResume} 
//           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Create New Resume
//         </button>
//         <button 
//           onClick={handleMasterResume} 
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           {isLoading ? 'Loading...' : masterResumeExists ? 'Edit Master Resume' : 'Create Master Resume'}
//         </button>
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
      
//       <h2 className="text-2xl font-semibold mb-4">Generated Resumes</h2>
//       {generatedResumes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {generatedResumes.map((resume) => (
//             <div 
//               key={resume._id} 
//               className="bg-white p-4 shadow rounded-lg cursor-pointer hover:bg-gray-100" 
//               onClick={() => handleEditResume(resume._id)}
//             >
//               <h3 className="text-xl font-semibold">{resume.resumeData.contactInformation?.name || 'Unnamed Resume'}</h3>
//               <p>{new Date(resume.generatedAt).toLocaleDateString()}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No resumes generated yet.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();

//   const [masterResumeExists, setMasterResumeExists] = useState(false);
//   const [generatedResumes, setGeneratedResumes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchMasterResume = async () => {
//       try {
//         const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
//         if (!userId) return;

//         const masterResumeResponse = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
//         if (masterResumeResponse.data) {
//           setMasterResumeExists(true);
//         }

//         const generatedResumesResponse = await axios.get(`http://localhost:5001/resumes/generated/${userId}`);
//         if (generatedResumesResponse.data) {
//           setGeneratedResumes(generatedResumesResponse.data);
//         }
//       } catch (error) {
//         console.error('Failed to load resumes:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMasterResume();
//   }, []);

//   const handleLogout = () => {
//     onLogout();
//     navigate('/login');
//   };

//   const handleMasterResume = () => {
//     if (masterResumeExists) {
//       navigate('/edit-master-resume');
//     } else {
//       navigate('/create-master-resume');
//     }
//   };

//   const handleCreateNewResume = () => {
//     navigate('/resume-generation');
//   };


//   const handleEditResume = (resumeId) => {
//     navigate(`/resume-generation/${resumeId}`);
//   };
  

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
//       <div className="flex space-x-4 mb-6">
//         <button 
//           onClick={handleCreateNewResume} 
//           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Create New Resume
//         </button>
//         <button 
//           onClick={handleMasterResume} 
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           {isLoading ? 'Loading...' : masterResumeExists ? 'Edit Master Resume' : 'Create Master Resume'}
//         </button>
//         <button 
//           onClick={handleLogout} 
//           className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
      
//       <h2 className="text-2xl font-semibold mb-4">Generated Resumes</h2>
//       {generatedResumes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {generatedResumes.map((resume) => (
//             <div 
//               key={resume._id} 
//               className="bg-white p-4 shadow rounded-lg cursor-pointer hover:bg-gray-100" 
//               onClick={() => handleEditResume(resume._id)}
//             >
//               <h3 className="text-xl font-semibold">{resume.resumeData.contactInformation?.name || 'Unnamed Resume'}</h3>
//               <p>{new Date(resume.generatedAt).toLocaleDateString()}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No resumes generated yet.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


