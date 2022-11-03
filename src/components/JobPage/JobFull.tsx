import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dateFormat from "../../utils/functions/dateFormat";
import JobApply from "../../utils/UI/JobApply";
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
}

function JobFull({
  projectId,
  jobName,
  jobField,
  numberOfPeople,
  city,
  startDate,
  endDate,
  school,
  desc,
}: jobFullProps) {
  const user = useSelector((state: any) => state.user);

  return (
    <div className="w-8/12 my-1 h-full xl:pr-10 space-y-4">
      <div className="text-3xl font-bold mb-1">{jobName}</div>
      {user.email === "" ? (
        <Link to={"/login"}>
          <div className="flex flex-col">
            {jobField?.map((item: any) => (
              <JobApply
                role={item.position}
                skill={item.skill}
                projectId={projectId}
              />
            ))}
          </div>
        </Link>
      ) : (
        <div className="flex flex-col">
          {jobField?.map((item: any) => (
            <JobApply
              role={item.position}
              skill={item.skill}
              projectId={projectId}
            />
          ))}
        </div>
      )}
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
            <div className="flex items-center space-x-2">
              <img
                className="w-10 h-10 rounded-full"
                src={user.avatar}
                alt="avt"
              />
              <p>{user.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <img
                className="w-10 h-10 rounded-full"
                src={user.avatar}
                alt="avt"
              />
              <p>{user.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <img
                className="w-10 h-10 rounded-full"
                src={user.avatar}
                alt="avt"
              />
              <p>{user.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <img
                className="w-10 h-10 rounded-full"
                src={user.avatar}
                alt="avt"
              />
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <p>There are {4} people working in this project</p>
        </div>
      )}
    </div>
  );
}

export default JobFull;
