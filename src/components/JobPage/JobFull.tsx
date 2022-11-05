import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userListSlice } from "../../redux/UserListReducer";
import dateFormat from "../../utils/functions/dateFormat";
import JobApply from "../../utils/UI/JobApply";
import Participant from "../../utils/UI/Participant";
import JobDescription from "./JobDescription";

interface jobFullProps {
  projectId: string | undefined;
  jobName: string | undefined;
  numberOfPeople: string | undefined;
  jobField: Array<string> | undefined;
  desc: string | undefined;
  school: string | undefined;
  city: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  participants: Array<Object> | undefined;
  userId: string | undefined;
}

function JobFull({
  projectId,
  jobName,
  jobField,
  participants,
  city,
  userId,
  startDate,
  endDate,
  school,
  desc,
}: jobFullProps) {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const deleteProject = async () => {
    const response = await axios.delete(
      `https://hipproback.herokuapp.com/api/prj/delete`,
      {
        data: {
          projectId: projectId,
        },
      }
    );
    navigate("/");
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete Project {jobName}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    onClick={deleteProject}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="w-8/12 my-1 h-full xl:pr-10 space-y-4">
        <div className="text-3xl font-bold mb-1">{jobName}</div>
        {user._id !== userId ? (
          <div className="flex flex-col">
            {jobField?.map((item: any) => (
              <JobApply
                role={item.position}
                skill={item.skill}
                projectId={projectId}
              />
            ))}
          </div>
        ) : null}
        <div className="text-lg">
          This project lasted from {dateFormat(startDate)} to{" "}
          {dateFormat(endDate)}
        </div>
        <JobDescription desc={desc} />

        <div className="font-semibold mb-2 text-lg">School</div>
        <div>{school}</div>
        {user.email !== "" ? (
          <div>
            <div className="font-semibold my-2 text-lg">
              Number Of People in Group
            </div>
            <div className="space-y-2 mt-4">
              {participants?.length !== 0 ? (
                participants?.map((item: any) => (
                  <Participant avatar={item.avatar} email={item.email} />
                ))
              ) : (
                <div>There hasn't been any participant</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            {participants?.length !== 0 ? (
              <p>
                There are {participants?.length} people working in this project
              </p>
            ) : (
              <p>There hasn't been any participant</p>
            )}
          </div>
        )}
        {user._id === userId ? (
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Delete Project
          </button>
        ) : null}
      </div>
    </>
  );
}

export default JobFull;
