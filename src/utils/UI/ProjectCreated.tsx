import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSlice } from "../../redux/UserReducer";
import LoadingSpinner from "./LoadingSpinner";
import Status from "./Status";

function ProjectCreated() {
  const [userProjects, setUserProject] = React.useState([
    useSelector((state: any) => state.user.project),
  ]);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const response = axios
      .get(`https://hipproback.herokuapp.com/api/prj/getbyuser?id=${user._id}`)
      .then((res) => {
        dispatch(userSlice.actions.setUserProject(res.data.projects));
        setUserProject(res.data.projects);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : userProjects.length !== 0 ? (
        userProjects.map((items: any) => (
          <div className="w-full h-20 shadow-sm flex justify-between px-10 my-5 items-center">
            <div className="font-semibold text-xl">{items.name}</div>
            <div className="flex items-center">
              <Link to={`/findProject/${items._id}`}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  View Project
                </button>
              </Link>
              <Status status={items.status} />
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-56 shadow-sm flex justify-center px-10 my-5 items-center font-bold text-2xl">
          No Project Created
        </div>
      )}
    </div>
  );
}

export default ProjectCreated;
