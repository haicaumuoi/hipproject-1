import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { applicantSlice } from "../../redux/Applicant";

type applicant = {
  _id: string;
  applicantId: string;
  prjId: string;
  prjName: string;
  role: string;
  status: string;
};

type Props = {
  prjName: string;
  role: string;
  applicant: applicant;
  projectId: string;
  applicationId: string;
};

function Applicant({
  applicationId,
  prjName,
  role,
  applicant,
  projectId,
}: Props) {
  const userList = useSelector((state: any) => state.userList.userList);
  const user = userList.find((item: any) => {
    return item._id === applicant.applicantId;
  });
  const dispatch = useDispatch();

  const setApplicationStatus = async (status: string) => {
    const statusData = {
      userID: user._id,
      applicationId: applicationId,
      projectId: projectId,
      role: role,
      status: status,
    };
    if (status === "Accepted") {
      const response = await axios.put(
        "https://hipproback.herokuapp.com/api/appl/accept",
        {
          data: statusData,
        }
      );
      console.log(response);
    } else {
      const response = await axios.put(
        "https://hipproback.herokuapp.com/api/appl/reject",
        {
          data: statusData,
        }
      );
      console.log(response);
    }
    dispatch(applicantSlice.actions.deleteApplicant(applicationId));
    console.log(statusData);
  };

  return (
    <div className="w-full h-20 shadow-sm flex justify-between px-10 my-5 items-center">
      <div className="font-semibold text-xl">
        {prjName} as {role}{" "}
      </div>
      <div className="flex items-center">
        <Link to={"/profile"} className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src={user.avatar}
            alt=""
          />
          <p className="pr-10">{user.email}</p>
        </Link>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setApplicationStatus("Accepted")}
        >
          Accept
        </button>
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          onClick={() => setApplicationStatus("Rejected")}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default Applicant;
