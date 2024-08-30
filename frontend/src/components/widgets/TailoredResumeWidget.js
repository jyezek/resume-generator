
import React, { useState } from 'react';
import ResumeGenerationFlow from '../ResumeGenerationFlow';

const TailoredResumeWidget = ({ userId }) => {
  const [step, setStep] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('Friendly, Professional');

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="bg-gray-800 p-4 shadow-lg rounded-lg flex flex-col space-y-4 text-white">
      {step === 1 && (
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-bold">Step 1: Enter Job Description</h2>
          <textarea
            className="p-2 bg-gray-700 rounded"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter job description here..."
          />
          <h3 className="text-lg font-bold">Tone</h3>
          <input
            className="p-2 bg-gray-700 rounded"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="Enter desired tone (e.g., Friendly, Professional)"
          />
          <button
            onClick={handleNextStep}
            className="mt-4 bg-green-700 py-2 px-4 rounded hover:bg-green-600"
          >
            Next: Select Template
          </button>
        </div>
      )}

      {step === 2 && (
        <ResumeGenerationFlow
          userId={userId}
          jobDescription={jobDescription}
          tone={tone}
          onBack={() => setStep(1)}
        />
      )}
    </div>
  );
};

export default TailoredResumeWidget;



// import React, { useState } from 'react';
// import { Dialog, DialogPanel } from '@headlessui/react';
// import ResumeGenerationFlow from '../ResumeGenerationFlow'; // Make sure to adjust the import path as needed

// const TailoredResumeWidget = ({ userId }) => {
//   const [isResumeModalOpen, setResumeModalOpen] = useState(false);

//   const handleCreateNewResume = () => {
//     setResumeModalOpen(true);
//   };

//   const closeResumeModal = () => {
//     setResumeModalOpen(false);
//   };

//   return (
//     <div>
//       {/* Tailored Resume Button */}
//       <div className="bg-gray-800 p-4 shadow-lg rounded-lg h-40 flex items-center justify-center text-white">
//         <button
//           onClick={handleCreateNewResume}
//           className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Tailored Resume +
//         </button>
//       </div>

//       {/* Fullscreen Modal for Resume Generation Flow */}
//       <Dialog
//         open={isResumeModalOpen}
//         onClose={closeResumeModal}
//         className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
//       >
//         <DialogPanel className="relative w-full max-w-5xl max-h-full bg-gray-900 rounded-lg shadow-xl overflow-auto">
//           <button
//             className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2 hover:bg-red-500"
//             onClick={closeResumeModal}
//           >
//             Close
//           </button>
//           <ResumeGenerationFlow userId={userId} onClose={closeResumeModal} />
//         </DialogPanel>
//       </Dialog>
//     </div>
//   );
// };

// export default TailoredResumeWidget;


