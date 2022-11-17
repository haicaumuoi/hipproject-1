import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { applicantSlice } from "../redux/Applicant";
import "../animation/strikethrough.css";
import "../animation/highlight.css";
import { setErrorMessage, setSuccessMessage } from "../redux/messageReducer";
import LoadingSpinner from "../utils/UI/LoadingSpinner";
import StatusButton from "../utils/UI/StatusButton";
import { projectListSlice } from "../redux/ProjectListReducer";

type Props = {
  prjName: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  projectOwner: string;
  status: string;
};

function ProjectDashboard({
  prjName,
  startDate,
  endDate,
  projectOwner,
  projectId,
  status,
}: Props) {
  const userList = useSelector((state: any) => state.userList.userList);
  const user = userList.find((item: any) => {
    return item._id === projectOwner;
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const setProjectStatus = async (status: string) => {
    setIsLoading(true);
    const statusData = {
      projectId: projectId,
    };
    if (status === "Accepted") {
      const response = await axios.put(
        "https://hipproback.herokuapp.com/api/prj/approve",
        {
          data: statusData,
        }
      );
      setIsLoading(false);
      if (response.status === 200) {
        dispatch(setSuccessMessage("Accept Project Successfully"));
        dispatch(projectListSlice.actions.setProjectStatus(response.data));
        console.log(response.data);
      } else {
        dispatch(setErrorMessage("Accept Project Failed"));
      }
    } else {
      const response = await axios.put(
        "https://hipproback.herokuapp.com/api/prj/decline",
        {
          data: statusData,
        }
      );
      setIsLoading(false);
      response.status === 200
        ? dispatch(setSuccessMessage("Declined Project Successfully"))
        : dispatch(setErrorMessage("Declined Project Failed"));
    }
  };

  return (
    <div className="w-full h-20 shadow-sm flex justify-between px-10 my-5 items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full h-20 shadow-sm flex justify-between  items-center">
          <Link to={`/findProject/${projectId}`} className="w-1/4">
            <div>{prjName}</div>
          </Link>
          <Link
            to={`/profile/${projectOwner}`}
            className="flex items-center justify-start"
          >
            <img
              className="w-10 h-10 rounded-full mr-3"
              src={user.avatar}
              alt=""
            />
            <p className="pr-10">{user.email}</p>
          </Link>
          <div className="flex items-center w-1/2 justify-end">
            {status === "Pending" ? (
              <>
                <div className="w-1/2 text-end pr-20">
                  <button className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-1 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 cursor-default text-center w-fit ">
                    {status}
                  </button>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 highlight"
                    onClick={() => setProjectStatus("Accepted")}
                  >
                    <p>Accept</p>
                  </button>
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    onClick={() => setProjectStatus("Rejected")}
                  >
                    <p className="strikethrough">Decline</p>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-end w-full ">
                <div className="w-1/2 text-end pr-4">
                  <StatusButton status={status} />
                </div>
                <div className="w-1/3 text-center">
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 ml-12"
                  >
                    <p className="strikethrough">Delete</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDashboard;
