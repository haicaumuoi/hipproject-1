import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Project } from '../../typing';
import JobDescription from '../components/JobPage/JobDescription';
import JobFull from '../components/JobPage/JobFull';
import SearchBar from '../components/SearchBar';
import dateFormat from '../utils/functions/dateFormat';
import { fetchProject } from '../utils/functions/fetchProject';
import data from '../utils/functions/testing';

function ProjectDetails() {
  const jobData = useParams();

  const projectList = useSelector((state: any) => state.projectList);
  const project = projectList.projectList.find((obj:any) => {
    return obj._id === jobData.id;
  });

  return (
    <div className="flex flex-col items-center h-full justify-start">
      <div className="w-full h-full justify-center hidden xl:flex">
        <SearchBar />
      </div>

      <div className="w-full border-t border-t-gray-200 h-full flex justify-center">
        <div className="w-9/12 h-full flex justify-start mt-5 pt-10">
          <JobFull
            jobName={project?.Project_Name}
            email={project?.User_id}
            school={project?.User_University}
            city={project?.Project_Location}
            time={dateFormat(project?.Post_Date)}
            numberOfPeople={project?.Employee_Amount}
            typeOfJob={project?.Project_Field}
          />
          <JobDescription desc={dateFormat(project?.Post_Date)} />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
