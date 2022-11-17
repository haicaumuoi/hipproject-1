import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectListSlice } from "../redux/ProjectListReducer";
import Applicant from "../utils/UI/Applicant";
import LoadingSpinner from "../utils/UI/LoadingSpinner";
import ProjectDashboard from "./ProjectDashboard";

type Props = {};

function AdminDashboard({}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const projectList = useSelector(
    (state: any) => state.projectList.projectList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const response = axios
      .get("https://hipproback.herokuapp.com/api/prj/admingetall")
      .then((response) => {
        dispatch(
          projectListSlice.actions.initProjectList(response.data.project)
        );
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex items-center px-10 my-5 justify-between">
        <div className="w-1/4 font-semibold text-lg">Project Name</div>
        <div className="w-1/4 font-semibold text-lg pl-8">Project Owner</div>
        <div className="flex items-center w-1/2 justify-end">
          <div className="w-1/4 font-semibold text-lg text-end">
            Project Status
          </div>
          <div className="w-1/4 font-semibold text-lg text-center px-32">
            Action
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : projectList.length > 0 ? (
        projectList.map((item: any) => (
          <ProjectDashboard
            prjName={item.name}
            startDate={item.startDate}
            endDate={item.endDate}
            projectOwner={item.userID}
            projectId={item._id}
            status={item.status}
          />
        ))
      ) : (
        <div className="w-full h-20 shadow-sm flex justify-center px-10 my-5 items-center font-bold text-2xl">
          No Applicant Avaiable
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
