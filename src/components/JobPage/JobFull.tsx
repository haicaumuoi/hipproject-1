import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { applicationSlice } from "../../redux/Application";
import { projectListSlice } from "../../redux/ProjectListReducer";
import dateFormat from "../../utils/functions/dateFormat";
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
  desc
}: jobFullProps) {

  const user = useSelector((state: any) => state.user);
  const userID = user._id;
  const status = 'pending';
  const projectRole = 'data analysis';
  const application = { userID, projectId, status, projectRole };
  const applicationToProject = { application, projectId };
  const dispatch = useDispatch();
  const sendApplicationHandle = () => {
    // dispatch(applicationSlice.actions.sendApplication(application));
    // dispatch(projectListSlice.actions.addApplicationToProject(applicationToProject));
    handlePostJob();
  }

  const client = axios.create({
    baseURL: "https://hipproback.herokuapp.com",
  });
  

  const handlePostJob = async () => {
  const respone = await client
    .post("/api/appl/create", {
      data: application
    });
    respone.status === 200 ? 
      console.log('success')
     : console.log('error');
  }


  return (
    <div className="w-8/12 my-1 h-full xl:pr-10 space-y-4">
      <div className="text-3xl font-bold mb-1">{jobName}</div>
      {user.email === '' ? 
        <Link to={'/login'}>
          <div className="flex flex-col"> 
          {jobField?.map((item: any) => (
            <div className="flex items-center justify-between my-2">
            <div className="text-lg mr-5">Position: {item.position}</div>
            <div className="text-lg">{item.skill}</div> 
            <button className="w-56 xl:w-40 xl:h-10 h-14 bg-blue-800 font-bold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md" onClick={sendApplicationHandle}>
              Login To Apply
            </button>
          </div>
          ))}  
      </div>
        </Link>
        : <div className="flex flex-col"> 
         {jobField?.map((item: any) => (
           <div className="flex items-center justify-between my-2">
            <div className="text-lg mr-5">Position: {item.position}</div>
            <div className="text-lg">{item.skill}</div> 
            <button className="w-56 xl:w-40 xl:h-10 h-14 bg-blue-800 font-bold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md" onClick={sendApplicationHandle}>
              Apply Now
            </button>
          </div>
          ))}
        </div>}
        <div className="text-lg">This project lasted from {dateFormat(startDate)} to {dateFormat(endDate)}</div>
        <JobDescription desc={desc} />


      <div className="font-semibold mb-2 text-lg">School</div>
      <div>{school}</div>
      {user.email !== '' ? 
      <div>
      <div className="font-semibold my-2 text-lg">Number Of People in Group</div>
      <div className="space-y-2 mt-4">
        <div className="flex items-center space-x-2">
          <img className="w-10 h-10" src={user.avatar} alt="avt" />
          <p>{user.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <img className="w-10 h-10" src={user.avatar} alt="avt" />
          <p>{user.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <img className="w-10 h-10" src={user.avatar} alt="avt" />
          <p>{user.email}</p>
        </div>
        <div className="flex items-center space-x-2">
          <img className="w-10 h-10" src={user.avatar} alt="avt" />
          <p>{user.email}</p>
        </div>
      </div></div> : <div className="flex items-center">
          <p>There are {4} people working in this project</p>
        </div>}
    
    </div>
  );
}

export default JobFull;
