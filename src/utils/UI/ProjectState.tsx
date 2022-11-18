import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Applicant from "./Applicant";
import LoadingSpinner from "./LoadingSpinner";
import ProjectCreated from "./ProjectCreated";
import Status from "./Status";

interface jobFullProps {
  state: string;
}

function ProjectState({ state }: jobFullProps) {
  const applicationSent = useSelector(
    (state: any) => state.application.application
  );

  const [isLoading, setIsLoading] = useState(false);

  const applicantList = useSelector((state: any) => state.applicant.applicant);

  switch (state) {
    case "applicationRecieved":
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
            <div className="w-full h-56 shadow-sm flex justify-center px-10 my-5 items-center font-bold text-2xl">
              No Applicant Avaiable
            </div>
          )}
        </div>
      );
    case "applicationSent":
      return (
        <div>
          {applicationSent.length > 0 ? (
            applicationSent.map((item: any) => (
              <div className="w-full h-20 shadow-sm flex justify-between px-10 my-5 items-center">
                <div className="font-semibold text-xl">{item.prjName}</div>
                <div className="flex items-center">
                  <p className="pr-10 text-center">{item.role}</p>
                  <Link to={`/findProject/${item.prjId}`}>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      View Project
                    </button>
                  </Link>
                  <Status status={item.status} />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-56 shadow-sm flex justify-center px-10 my-5 items-center font-bold text-2xl">
              No Application Sent
            </div>
          )}
        </div>
      );
    default:
      return <ProjectCreated />;
  }
}

export default ProjectState;
