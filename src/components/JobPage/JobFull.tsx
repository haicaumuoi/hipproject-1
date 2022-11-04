import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  const userList = useSelector((state: any) => state.userList.userList);

  return (
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
          <p>There are {participants?.length} people working in this project</p>
        </div>
      )}
    </div>
  );
}

export default JobFull;
