import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dateFormat from '../functions/dateFormat'

interface jobFullProps {
    state: boolean
}

function ProjectState( {state}: jobFullProps) {

    const projectList = useSelector((state: any) => state.projectList.projectList);
    const user = useSelector((state: any) => state.user);


    
    const [applicationList, setApplicationList] = React.useState([]);
    
    const applicationSent = useSelector((state: any) => state.application.application);

    console.log(applicationSent)

  switch(state){
    case true:
        return(
            <div>
            {projectList.map((item:any) => (
            <div className="w-full h-20 shadow-sm flex justify-between px-10 my-5 items-center">
          <div className="font-semibold text-xl">{item.Project_Name}</div>
          <div className="flex items-center">
            <Link to={'/profile'} className='flex items-center'>
                <img className='w-10 h-10' src={user.avatar} alt="" />
                <p className="pr-10">
                    {user.email}
                </p>
            </Link>
            <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                      >
                        Decline
                      </button>
          </div>
        </div>
      ))}
    </div>
        )
    default: 
            return (
                <div>
              {applicationSent.map((item:any) => (
                <div className="w-full h-20 shadow-sm flex justify-between px-10 my-5 items-center">
                  <div className="font-semibold text-xl">{item.projectId}</div>
                  <div className="flex items-center">
                    <p className="pr-10 text-center">
                       {item.projectRole}
                    </p>
                    <Link to={`/findProject/${item.projectId}`}>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                      View Project
                      </button>
                      </Link>
                    <button
                      type="button"
                      className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                      >
                      {item.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )
  }
}

export default ProjectState