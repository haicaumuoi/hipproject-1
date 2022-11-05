import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { applicationSlice } from "../../redux/Application";
import AppliedButton from "./AppliedButton";
import ApplyButton from "./ApplyButton";
import { useState } from "react";
import { setErrorMessage, setSuccessMessage } from "../../redux/messageReducer";
import LoadingSpinner from "./LoadingSpinner";

type Props = {
  role: string;
  skill: string;
  projectId: string | undefined;
  number: number | undefined;
};

function JobApply({ role, skill, projectId, number }: Props) {
  const user = useSelector((state: any) => state.user);
  const userID = user._id;
  const status = "Pending";
  const application = { userID, projectId, status, role };

  const dispatch = useDispatch();

  const projectList = useSelector(
    (state: any) => state.projectList.projectList
  );
  const sendApplicationHandle = () => {
    setIsApplied(true);
    handlePostJob();
  };
  const currentProject = projectList.find(
    (project: any) => project._id === projectId
  );

  const applicationPrj = currentProject.application.find(
    (participant: any) => participant.applicantId === userID
  );

  const participant = currentProject.participants.find(
    (participant: any) => participant.applicantId === userID
  );

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePostJob = async () => {
    setIsLoading(true);
    const respone = await axios.post(
      "https://hipproback.herokuapp.com/api/appl/create",
      {
        data: application,
      }
    );
    setIsLoading(false);
    if (respone.status === 201) {
      dispatch(applicationSlice.actions.sendApplication(respone.data));
      dispatch(setSuccessMessage("Send Application Successfully"));
      navigate("/");
    } else {
      console.log("error");
      dispatch(setErrorMessage("Send Application Failed"));
    }
  };

  const [isApplied, setIsApplied] = useState(false);

  return (
    <div className="flex items-center justify-between my-5 pb-2 border-b border-b-gray-200">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="text-lg mr-5 w-56">Position: {role}</div>
          <div className="text-lg w-56">{skill}</div>
          {user.email !== "" ? (
            number === 4 ? (
              <AppliedButton />
            ) : !participant && !applicationPrj && !isApplied ? (
              <ApplyButton sendApplicationHandle={sendApplicationHandle} />
            ) : (
              <AppliedButton />
            )
          ) : (
            <Link to={"/login"}>
              <button className="w-56 xl:w-40 xl:h-10 h-14 bg-blue-800 font-bold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md">
                Login To Apply
              </button>
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default JobApply;
