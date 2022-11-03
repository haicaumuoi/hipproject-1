import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dateFormat from "../functions/dateFormat";
import Applicant from "./Applicant";

interface jobFullProps {
  state: boolean;
}

function ProjectState({ state }: jobFullProps) {
  const applicationSent = useSelector(
    (state: any) => state.application.application
  );

  const applicantList = useSelector((state: any) => state.applicant.applicant);

  switch (state) {
    case true:
      return (
        <div>
          {applicantList.length > 0 ? (
            applicantList.map((item: any) => (
              <Applicant
                prjName={item.prjName}
                role={item.role}
                applicant={item}
                projectId={item.prjId}
                applicationId={item._id}
              />
            ))
          ) : (
            <div className="w-full h-20 shadow-sm flex justify-center px-10 my-5 items-center font-bold text-2xl">
              No Applicant Avaiable
            </div>
          )}
        </div>
      );
    default:
      return (
        <div>
          {applicationSent.length > 0 ? (
            applicationSent.map((item: any) => (
              <div className="w-full h-20 shadow-sm flex justify-between px-10 my-5 items-center">
                <div className="font-semibold text-xl">{item.prjName}</div>
                <div className="flex items-center">
                  <p className="pr-10 text-center">{item.role}</p>
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
                    className="text-white bg-gray-700 hover:bg-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 cursor-not-allowed"
                  >
                    {item.status}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-20 shadow-sm flex justify-center px-10 my-5 items-center font-bold text-2xl">
              No Application Sent
            </div>
          )}
        </div>
      );
  }
}

export default ProjectState;
