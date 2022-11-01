import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Project } from '../../typing';
import dateFormat from '../utils/functions/dateFormat';
import { fetchProject } from '../utils/functions/fetchProject';
import ProjectState from '../utils/UI/ProjectState';

function Projects() {
 
  const [projectState, setProjectState] = useState(true);

  return (
    <div className="w-screen h-fit bg-gray-50 flex justify-center items-center my-20">
      <div className="w-9/12 h-5/6">
        <div className='flex'>
        <div className="w-1/2 h-20 shadow flex px-10 items-center cursor-pointer" onClick={() => {
          setProjectState(true)
        }}>
          <h1 className="font-semibold text-2xl pr-5">Project Created</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
            />
          </svg>
        </div>
        <div className="w-1/2 h-20 shadow flex px-10 items-center cursor-pointer" onClick={() => {
          setProjectState(false)
        }}>
          <h1 className="font-semibold text-2xl pr-5">Project Joined</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
            />
          </svg>
        </div>
      </div>
        <ProjectState state={projectState} />
      </div>
    </div>
  );
}

export default Projects;
