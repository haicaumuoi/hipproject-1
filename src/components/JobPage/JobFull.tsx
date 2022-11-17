import axios from "axios";
import { divide } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setErrorMessage, setSuccessMessage } from "../../redux/messageReducer";
import dateFormat from "../../utils/functions/dateFormat";
import JobApply from "../../utils/UI/JobApply";
import LoadingSpinner from "../../utils/UI/LoadingSpinner";
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
  endDate: Date;
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
  const dispatch = useDispatch();
  const deleteProject = async () => {
    setIsLoading(true);
    const response = await axios.delete(
      `https://hipproback.herokuapp.com/api/prj/delete`,
      {
        data: {
          projectId: projectId,
        },
      }
    );
    setIsLoading(false);
    response.status === 200
      ? dispatch(setSuccessMessage("Delete Project Successfully"))
      : dispatch(setErrorMessage("Delete Project Failed"));
    navigate("/");
  };

  const userList = useSelector((state: any) => state.userList.userList);
  const projectOwner = userList.find((user: any) => {
    return user._id === userId;
  });
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const now = new Date();
  const today = new Date(now.setMonth(now.getMonth() + 1));
  const projectEndDateFormatted = new Date(endDate);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : showModal ? (
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
                number={participants?.length}
                expired={today > projectEndDateFormatted}
              />
            ))}
          </div>
        ) : null}
        {today > projectEndDateFormatted ? (
          <div className="text-lg">
            This project has expired. You can no longer apply for this
          </div>
        ) : (
          <div className="text-lg">
            This project lasted from {dateFormat(startDate)} to{" "}
            {dateFormat(endDate)}
          </div>
        )}

        <JobDescription desc={desc} />

        <div className="font-semibold mb-2 text-lg">School</div>
        <div>{school}</div>
        {user.email !== "" ? (
          <div>
            <div className="font-semibold my-2 text-lg">
              Number Of Participants (Max 5)
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex items-center space-x-2">
                <Link to={`/profile/${projectOwner._id}`}>
                  <Participant
                    avatar={projectOwner.avatar}
                    email={projectOwner.email}
                  />
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                  <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                  <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                </svg>
              </div>
              {participants?.map((item: any) => (
                <Link to={`/profile/${item._id}`}>
                  <Participant avatar={item.avatar} email={item.email} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <Participant avatar={user.avatar} email={user.email} />
          </div>
        )}
        {user._id === userId || user.email === "haianh12122002@gmail.com" ? (
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
