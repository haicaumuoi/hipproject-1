import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/JobPage/ProjectCard';
import SearchBar from '../components/SearchBar';
import { fetchProject } from '../utils/functions/fetchProject';
import { Project } from '../../typing';

import dateFormat from '../utils/functions/dateFormat';
import data from '../utils/functions/testing';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FindProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { state } = useLocation();
  const user = state;
  console.log(user)

  useEffect(() => {
    fetchProject().then((res) => {
      setProjects(res);
    });
  }, []);

  return (
    <div className="flex flex-col items-center h-full justify-start">
      <SearchBar />
      <div className="w-full border-t border-t-gray-400 h-full flex justify-center items-center mt-5 pt-10">
        <ul className="w-9/12 h-full flex flex-col items-center xl:w-8/12 justify-center xl:grid xl:grid-cols-2 2xl:grid-cols-3 2xl:w-10/12">
          {projects.map((project) => (
            <div key={project._id}>
              <Link to={`/findProject/${project._id}`}>
                <ProjectCard
                  key={project._id}
                  projectId={project._id}
                  projectName={project.Project_Name}
                  projectCity={project.Project_Location}
                  projectSchool={project.User_University}
                  projectTime={`${dateFormat(project.Post_Date)} - ${dateFormat(
                    project.End_Date
                  )}`}
                  projectField={project.Project_Field}
                  projectSkills={project.Project_Skill}
                  projectCriteria1="abc"
                  projectCriteria2="abc"
                  projectCriteria3="abc"
                />
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default FindProjects;
