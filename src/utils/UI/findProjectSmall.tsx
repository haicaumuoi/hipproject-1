import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProjectCard from "../../components/JobPage/ProjectCard";
import SearchBar from "../../components/SearchBar";
import { paginationSlice } from "../../redux/PaginationSlice";
import dateFormat from "../functions/dateFormat";

function FindProjectSmall({ page }: any) {
  const projectList = useSelector((state: any) => state.searchList.searchList);

  const projectListPage = projectList.slice((page - 1) * 6, page * 6);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(page);
  const maxPage = Math.ceil(projectList.length / 6);

  const addPage = (page: number) => {
    dispatch(paginationSlice.actions.setPagination(currentPage + 1));
    setCurrentPage(page + 1);
  };
  const minusPage = (page: number) => {
    dispatch(paginationSlice.actions.setPagination(currentPage - 1));
    setCurrentPage(page - 1);
  };
  return (
    <div className="flex flex-col items-center h-full justify-start">
      <SearchBar />
      <div className="w-full border-t border-t-gray-400 h-full flex justify-center items-center mt-5 pt-10 flex-col">
        {projectList.length > 0 ? (
          <ul className="w-9/12 h-full flex flex-col items-center xl:w-8/12 justify-center xl:grid xl:grid-cols-2 2xl:grid-cols-3 2xl:w-10/12">
            {projectListPage.map((project: any) => (
              <div key={project._id}>
                <Link to={`/findProject/${project._id}`}>
                  <ProjectCard
                    key={project._id}
                    projectId={project._id}
                    projectName={project.name}
                    projectCity={project.location}
                    projectSchool={project.uni}
                    projectTime={`${dateFormat(
                      project.startDate
                    )} - ${dateFormat(project.endDate)}`}
                    projectField={project.field[0].position}
                    projectSkills={project.field[0].skill}
                    projectSmallDes={project.shortDesc}
                  />
                </Link>
              </div>
            ))}
          </ul>
        ) : (
          <div className="w-full h-20 shadow-sm flex justify-center px-10 my-5 items-center font-bold text-2xl">
            No Project Avaiable
          </div>
        )}
        <div className="flex items-center pt-10">
          {currentPage > 1 ? (
            <div
              className="py-2 px-3 ml-0 leading-tight  bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
              onClick={() => {
                minusPage(currentPage);
              }}
            >
              Previous
            </div>
          ) : null}
          <div className="py-2 px-3 leading-tight  bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-default">
            {currentPage}
          </div>
          {currentPage < maxPage ? (
            <div
              className="py-2 px-3 leading-tight  bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
              onClick={() => {
                addPage(currentPage);
              }}
            >
              Next
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FindProjectSmall;
