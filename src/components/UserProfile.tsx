import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import EditIcon from "../utils/UI/EditIcon";
import LoadingSpinner from "../utils/UI/LoadingSpinner";

type Props = {};

function UserProfile() {
  const userData = useParams();

  const userList = useSelector((state: any) => state.userList.userList);
  const [userProject, setUserProject] = React.useState(
    useSelector((state: any) => state.user.project)
  );
  const user = userList.find((obj: any) => {
    return obj._id === userData.id;
  });

  return (
    <div className="flex justify-center mt-5 ">
      <div className="flex flex-col justify-start items-start w-10/12 xl:w-[33%] h-screen ">
        <div className="w-full h-32 bg-white flex items-center">
          <div className="text-black font-extrabold text-2xl w-20 h-20 flex justify-center items-center">
            <img className="rounded-full" src={user.avatar} alt="avatar" />
          </div>
          <div className="flex flex-col space-y-2 pl-5">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>

              <h1 className="ml-2">{user.location}</h1>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg border border-gray-300 h-44 mt-10 pl-3 relative">
          <div className="font-semibold text-lg my-2">Contact Information</div>
          <div className="text-gray-600 space-y-1 pt-2">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>0{user.phone}</div>
          </div>
        </div>
        <div className="w-full relative rounded-lg  border border-gray-300 h-44 mt-10 pl-3">
          <div className="font-semibold text-lg my-2">Personal Information</div>
          <div className="text-gray-600 space-y-1 pt-2">
            <div>{user.location}</div>
            <div>{user.uni} University</div>
            <div>{user.skillset[0]}</div>
          </div>
        </div>
        <div className="w-full relative rounded-lg border border-gray-300 h-fit pb-5 mt-10 pl-3">
          <div className="font-semibold text-lg my-2">Profile Bio</div>
          <div className="text-gray-600 space-y-1 pt-2 w-10/12">
            <div>{user.bio}</div>
          </div>
        </div>
      </div>
      <div className="h-fit w-1/3 border-gray-300 rounded-xl border mt-20">
        <div className="text-center text-xl font-semibold p-4 mb-4">
          User's Projects
        </div>
        {userProject === null ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          userProject?.map((project: any) => (
            <div className="flex justify-around my-4">
              <div className="font-semibold text-xl">{project.name}</div>
              <div className="flex items-center">
                <Link to={`/findProject/${project._id}`}>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    View Project
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserProfile;
