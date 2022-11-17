import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectState from "../utils/UI/ProjectState";

function Projects() {
  const [projectState, setProjectState] = useState("projectCreated");
  return (
    <div className="w-screen h-fit  flex justify-center items-center my-20">
      <div className="w-9/12 h-5/6 ">
        <div className="flex">
          {projectState === "projectCreated" ? (
            <div
              className="w-1/2 h-20 border border-gray-200 flex px-10 items-center cursor-pointer justify-center bg-blue-50 text-blue-800 rounded-tl-3xl rounded-bl-3xl"
              onClick={() => {
                setProjectState("projectCreated");
              }}
            >
              <h1 className="font-semibold text-2xl pr-5">Project Created</h1>
            </div>
          ) : (
            <div
              className="w-1/2 h-20 border border-gray-200 flex px-10 items-center cursor-pointer justify-center rounded-tl-3xl rounded-bl-3xl "
              onClick={() => {
                setProjectState("projectCreated");
              }}
            >
              <h1 className="font-semibold text-2xl pr-5">Project Created</h1>
            </div>
          )}

          {projectState === "applicationRecieved" ? (
            <div
              className="w-1/2 h-20 border border-gray-200 flex px-10 items-center cursor-pointer justify-center bg-blue-50 text-blue-800"
              onClick={() => {
                setProjectState("applicationRecieved");
              }}
            >
              <h1 className="font-semibold text-2xl pr-5">
                Application Received
              </h1>
            </div>
          ) : (
            <div
              className="w-1/2 h-20 border border-gray-200 flex px-10 items-center cursor-pointer justify-center"
              onClick={() => {
                setProjectState("applicationRecieved");
              }}
            >
              <h1 className="font-semibold text-2xl pr-5">
                Application Received
              </h1>
            </div>
          )}

          {projectState === "applicationSent" ? (
            <div
              className="w-1/2 h-20 border border-gray-200 flex px-10 items-center cursor-pointer justify-center bg-blue-50 text-blue-800 rounded-br-3xl rounded-tr-3xl"
              onClick={() => {
                setProjectState("applicationSent");
              }}
            >
              <h1 className="font-semibold text-2xl pr-5">Application Sent</h1>
            </div>
          ) : (
            <div
              className="w-1/2 h-20 border border-gray-200 flex px-10 items-center cursor-pointer justify-center rounded-br-3xl rounded-tr-3xl"
              onClick={() => {
                setProjectState("applicationSent");
              }}
            >
              <h1 className="font-semibold text-2xl pr-5">Application Sent</h1>
            </div>
          )}
        </div>
        <ProjectState state={projectState} />
      </div>
    </div>
  );
}

export default Projects;
