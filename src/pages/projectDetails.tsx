import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import JobFull from "../components/JobPage/JobFull";
import ProjectOwner from "../components/JobPage/ProjectOwner";

function ProjectDetails() {
  const jobData = useParams();

  const projectList = useSelector((state: any) => state.projectList);

  const project = projectList.projectList.find((obj: any) => {
    return obj._id === jobData.id;
  });

  return (
    <div className="flex flex-col items-center h-full justify-start">
      <div className="w-full border-t border-t-gray-200 h-full flex justify-center">
        <div className="w-9/12 h-full flex justify-between mt-5 pt-10">
          <JobFull
            userId={project?.userID}
            projectId={project?._id}
            jobName={project?.name}
            school={project?.uni}
            jobField={project?.field}
            numberOfPeople={project?.Employee_Amount}
            desc={project?.desc}
            city={project?.location}
            startDate={project?.startDate}
            endDate={project?.endDate}
            participants={project?.participants}
          />
          <ProjectOwner projectOwnerID={project?.userID} />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
