import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import JobDescription from '../components/JobPage/JobDescription';
import JobFull from '../components/JobPage/JobFull';
import SearchBar from '../components/SearchBar';
import dateFormat from '../utils/functions/dateFormat';


function ProjectDetails() {
  const jobData = useParams();

  const projectList = useSelector((state: any) => state.projectList);
  
  const project = projectList.projectList.find((obj:any) => {
    return obj._id === jobData.id;
  });

  console.log(project.field)

  return (
    <div className="flex flex-col items-center h-full justify-start">
      <div className="w-full h-full justify-center hidden xl:flex">
        <SearchBar />
      </div>

      <div className="w-full border-t border-t-gray-200 h-full flex justify-center">
        <div className="w-9/12 h-full flex flex-col justify-start mt-5 pt-10">
          <JobFull
            projectId={project?._id}
            jobName={project?.name}
            email={project?.email}
            school={project?.uni}
            city={project?.location}
            time={`${dateFormat(project?.startDate)} - ${dateFormat(project?.endDate)}`}
            jobField={project?.field}
            numberOfPeople={project?.Employee_Amount}
            typeOfJob={project?.Project_Field}
          />
          <JobDescription desc={project?.desc} />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
