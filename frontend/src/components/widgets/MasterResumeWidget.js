import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { PencilIcon } from '@heroicons/react/24/solid';
import MasterResumeBuilder from '../MasterResumeBuilder'; // Assuming this is the component's correct path

const MasterResumeWidget = ({ userId }) => {
  const [masterResume, setMasterResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMasterResume = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/resumes/master/${userId}`);
        if (response.data) {
          setMasterResume(response.data.resumeData);
        }
      } catch (error) {
        console.error('Failed to load master resume:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMasterResume();
  }, [userId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-gray-800 p-4 shadow-lg rounded-lg flex flex-col">
        {isLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : masterResume ? (
          <div className="flex ">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-white">
                {masterResume.contactInformation?.name || 'Your Name'}
              </h3>
              <p className="text-gray-400">
                {masterResume.professionalSummary || 'Your professional summary goes here.'}
              </p>
            </div>
            <div className="flex-shrink-0 ml-4 w-72 h-40 overflow-y-auto bg-gray-700 rounded p-3">
              <h4 className="text-lg font-semibold text-white mb-2">Work Experience</h4>
              {masterResume.professionalExperience && masterResume.professionalExperience.length > 0 ? (
                masterResume.professionalExperience.map((experience, index) => (
                  <div key={index} className="mb-4 border-b border-gray-600 pb-2">
                    <h5 className="text-md font-medium text-white">{experience.roles[0]?.title}</h5>
                    <p className="text-gray-400">{experience.company}</p>
                    <p className="text-gray-500 text-sm">
                      {experience.period}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No work experience added.</p>
              )}
            </div>
            <div className="flex-shrink-0 ml-4">
              <PencilIcon
                className="w-5 h-5 text-gray-300 cursor-pointer hover:text-white"
                onClick={openModal}
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No master resume found. Create one to get started.</p>
        )}
      </div>

      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-gray-900 p-6">
                    <MasterResumeBuilder masterResume={masterResume} onClose={closeModal} />
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MasterResumeWidget;
