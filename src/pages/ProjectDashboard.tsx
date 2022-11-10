import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { applicantSlice } from "../redux/Applicant";
import "../animation/strikethrough.css";
import "../animation/highlight.css";
import { setErrorMessage, setSuccessMessage } from "../redux/messageReducer";
import LoadingSpinner from "../utils/UI/LoadingSpinner";

type Props = {
  prjName: string;
  projectId: string;
  startDate: Date;
  endDate: Date;
  projectOwner: string;
};

function ProjectDashboard({
  prjName,
  startDate,
  endDate,
  projectOwner,
  projectId,
}: Props) {
  const userList = useSelector((state: any) => state.userList.userList);
  const user = userList.find((item: any) => {
    return item._id === projectOwner;
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  //   const setApplicationStatus = async (status: string) => {
  //     setIsLoading(true);
  //     const statusData = {
  //       userID: user._id,
  //       applicationId: applicationId,
  //       projectId: projectId,
  //       role: role,
  //       status: status,
  //     };
  //     if (status === "Accepted") {
  //       const response = await axios.put(
  //         "https://hipproback.herokuapp.com/api/appl/accept",
  //         {
  //           data: statusData,
  //         }
  //       );
  //       setIsLoading(false);
  //       response.status === 200
  //         ? dispatch(setSuccessMessage("Accept Application Successfully"))
  //         : dispatch(setErrorMessage("Accept Application Failed"));
  //     } else {
  //       const response = await axios.put(
  //         "https://hipproback.herokuapp.com/api/appl/reject",
  //         {
  //           data: statusData,
  //         }
  //       );
  //       setIsLoading(false);
  //       response.status === 200
  //         ? dispatch(setSuccessMessage("Declined Application Successfully"))
  //         : dispatch(setErrorMessage("Declined Application Failed"));
  //     }
  //     dispatch(applicantSlice.actions.deleteApplicant(applicationId));
  //   };

  return (
    <div className="w-full h-20 shadow-sm flex justify-between px-10 my-5 items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div>{prjName}</div>
          <div className="flex items-center w-1/2 justify-between">
            <Link to={"/profile"} className="flex items-center justify-between">
              <img
                className="w-10 h-10 rounded-full mr-3"
                src={user.avatar}
                alt=""
              />
              <p className="pr-10">{user.email}</p>
            </Link>
            <div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 highlight"
              >
                <p>Accept</p>
              </button>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              >
                <p className="strikethrough">Decline</p>
              </button>
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                <p className="strikethrough">Expired</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectDashboard;
