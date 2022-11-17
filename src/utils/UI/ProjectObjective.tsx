import React from "react";

type Props = {
  objective: string | undefined;
};

function ProjectObjective({ objective }: Props) {
  return (
    <div className="w-10/12 mt-5 my-6">
      <h1 className="font-bold text-2xl mb-5">Project Objective</h1>
      <p className="text-lg">{objective}</p>
    </div>
  );
}

export default ProjectObjective;
