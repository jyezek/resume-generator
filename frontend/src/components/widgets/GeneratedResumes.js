// src/components/widgets/GeneratedResumes.js
import React from 'react';
import MiniModernResumeTemplate from '../templates/ModernResumeTemplate';
import MiniClassicResumeTemplate from '../templates/ResumeTemplate';

const GeneratedResumes = ({ resumes, onEditResume }) => {

  const renderMiniResume = (resume) => {
    const selectedTemplate = resume.template || 'modern';

    switch (selectedTemplate) {
      case 'modern':
        return (
          <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
            <MiniModernResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
          </div>
        );
      case 'classic':
        return (
          <div style={{ transformOrigin: 'top left', width: '100%', height: '100%', overflow: 'hidden' }}>
            <MiniClassicResumeTemplate data={resume.resumeData} theme={{}} isMini={true} />
          </div>
        );
      default:
        return <p>Template not found</p>;
    }
  };

  return (
    <div>
      {resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div 
              key={resume._id} 
              className="bg-gray-800 p-4 shadow-lg rounded-lg cursor-pointer hover:bg-gray-700 h-96 flex flex-col justify-between overflow-hidden" 
              onClick={() => onEditResume(resume._id)}
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {resume.resumeData.contactInformation?.name || 'Unnamed Resume'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {new Date(resume.generatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="border-t border-gray-600 pt-4 flex-grow overflow-hidden">
                <div className="w-full h-full flex justify-center items-center overflow-hidden">
                  {renderMiniResume(resume)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No resumes generated yet.</p>
      )}
    </div>
  );
};

export default GeneratedResumes;

