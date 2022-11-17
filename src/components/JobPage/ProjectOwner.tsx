import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

type Props = {
  projectOwnerID: string | undefined;
};

function ProjectOwner({ projectOwnerID }: Props) {
  const userList = useSelector((state: any) => state.userList.userList);
  const projectOwner = userList.find((user: any) => {
    return user._id === projectOwnerID;
  });

  return (
    <div className="w-1/3 h-fit ">
      <Link
        to={`/profile/${projectOwnerID}`}
        className="flex flex-col space-y-7 items-center pr-20"
      >
        <img
          className="w-72 h-72 rounded-full"
          src={projectOwner.avatar}
          alt="avatar"
        />
        <h1 className="font-bold text-xl mt-8">{projectOwner.email}</h1>
      </Link>
    </div>
  );
}

export default ProjectOwner;
