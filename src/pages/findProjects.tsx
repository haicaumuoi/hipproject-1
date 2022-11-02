import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/JobPage/ProjectCard';
import SearchBar from '../components/SearchBar';
import { fetchProject } from '../utils/functions/fetchProject';
import { Project } from '../../typing';

import dateFormat from '../utils/functions/dateFormat';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { projectListSlice } from '../redux/ProjectListReducer';

const FindProjects = () => {

  const [projects, setProjects] = useState<Project[]>([]);

  const dispatch = useDispatch();
  dispatch(projectListSlice.actions.initProjectList(projects));
  
  useEffect(() => {
    fetchProject().then((res) => {
      setProjects(res);
    });
  }, []);

  console.log(projects)

  const projectList = useSelector((state: any) => state.projectList.projectList);

  const searchText = useSelector((state: any) => state.searchList);

  return (
    <div className="flex flex-col items-center h-full justify-start">
      <SearchBar />
      <div className="w-full border-t border-t-gray-400 h-full flex justify-center items-center mt-5 pt-10">
        <ul className="w-9/12 h-full flex flex-col items-center xl:w-8/12 justify-center xl:grid xl:grid-cols-2 2xl:grid-cols-3 2xl:w-10/12">
          {projectList.map((project:any) => (
            <div key={project._id}>
              <Link to={`/findProject/${project._id}`}>
                <ProjectCard
                  key={project._id}
                  projectId={project._id}
                  projectName={project.name}
                  projectCity={project.location}
                  projectSchool={project.uni}
                  projectTime={`${dateFormat(project.startDate)} - ${dateFormat(
                    project.endDate
                  )}`}
                  projectField={project.userID}
                  projectSkills={project.field.skill}
                  projectSmallDes={project.shortDesc}
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

