import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { applicationSlice } from "../../redux/Application";
import { projectListSlice } from "../../redux/ProjectListReducer";

interface jobFullProps {
  projectId: string | undefined;
  jobName: string | undefined;
  email: string | undefined;
  school: string | undefined;
  city: string | undefined;
  time: string | undefined;
  numberOfPeople: string | undefined;
  typeOfJob: string | undefined;
  jobField: Array<string> | undefined;
}

function JobFull({
  projectId,
  jobName,
  email,
  school,
  city,
  time,
  jobField,
  typeOfJob,
}: jobFullProps) {

  const user = useSelector((state: any) => state.user);
  const userID = user._id;
  const status = 'pending';
  const projectRole = 'data analysis';
  const application = { userID, projectId, status, projectRole };
  const applicationToProject = { application, projectId };
  const dispatch = useDispatch();
  const sendApplicationHandle = () => {
    dispatch(applicationSlice.actions.sendApplication(application));
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

  console.log(jobField)

  return (
    <div className="w-full  my-1 h-full xl:pr-10 space-y-2">
      <div className="text-2xl font-bold mb-1">{jobName}</div>
      <div className="text-blue-800">{email}</div>
      <div>{city}</div>
      <div>{time}</div>


      {user.email === '' ? 
        <Link to={'/login'}>
          <div className="flex flex-col"> 
          {jobField?.map((item: any) => (
            <div className="flex">
             <div>{item.position}</div>
            <div>{item.skill}</div> 
            <button className="w-56 xl:w-72 xl:h-10 h-12 bg-blue-800 font-bold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md">
              Apply Now
            </button>
          </div>
          ))}
          
          
      </div>

        </Link>
        : <div className="flex flex-col"> 
         {jobField?.map((item: any) => (
            <div className="flex">
            <div>{item.position}</div>
            <div>{item.skill}</div> 
            <button className="w-56 xl:w-72 xl:h-10 h-12 bg-blue-800 font-bold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md" onClick={sendApplicationHandle}>
              Apply Now
            </button>
          </div>
          ))}


        </div>}

      {/* </Link> */}
      <div className="text-xl font-semibold my-3">Project Details</div>
      <div className="font-semibold mb-2">School</div>
      <div> {school}</div>
      {user.email !== '' ? 
      <div>
      <div className="font-semibold my-2 ">Number Of People in Group</div>
      <div>
        <div className="flex items-center">
          <img className="w-10 h-10" src={user.avatar} alt="avt" />
          <p>{user.email}</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10" src={user.avatar} alt="avt" />
          <p>{user.email}</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10" src={user.avatar} alt="avt" />
          <p>{user.email}</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10" src={user.avatar} alt="avt" />
          <p>{user.email}</p>
        </div>
      </div></div> : null}
    
    </div>
  );
}

export default JobFull;
