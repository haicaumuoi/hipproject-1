import React from "react";
import { useSelector } from "react-redux";

type Props = {
  projectOwnerID: string | undefined;
};

function ProjectOwner({ projectOwnerID }: Props) {
  const userList = useSelector((state: any) => state.userList.userList);
  const projectOwner = userList.find((user: any) => {
    return user._id === projectOwnerID;
  });

  return (
    <div className="w-1/3 h-fit flex flex-col space-y-7 items-center">
      <img
        className="w-72 h-72 rounded-full"
        src={projectOwner.avatar}
        alt="avatar"
      />
      <h1 className="font-bold text-xl">{projectOwner.email}</h1>
    </div>
  );
}

export default ProjectOwner;
