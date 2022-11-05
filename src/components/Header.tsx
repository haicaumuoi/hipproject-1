import React from "react";
// import PopUpUser from './PopUpUser';
import { Link, useNavigate } from "react-router-dom";
import PopUpUser from "../utils/UI/PopUpUser";
import logo from "../assets/logos/logo.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { applicationSlice } from "../redux/Application";
import { applicantSlice } from "../redux/Applicant";

function Header() {
  const user = useSelector((state: any) => state.user);
  const userLS = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initApplication = async () => {
    const responeApplication = await axios.get(
      `https://hipproback.herokuapp.com/api/appl/getallappl`,
      {
        params: {
          userId: user._id,
        },
      }
    );
    responeApplication.status === 200
      ? dispatch(
          applicationSlice.actions.initApplication(responeApplication.data)
        )
      : console.log("application error");

    const responeApplicant = await axios.get(
      `https://hipproback.herokuapp.com/api/appl/getallrc`,
      {
        params: {
          userId: user._id,
        },
      }
    );
    responeApplicant.status === 200
      ? dispatch(applicantSlice.actions.initApplicant(responeApplicant.data))
      : console.log("applicant error");
  };

  const logout = () => {
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex w-full h-[4.7rem] items-center justify-between border-b border-gray-200">
      <div className="flex">
        <div className="hidden xl:flex my-3 ml-5 fill-gray-800 justify-center items-center cursor-pointer">
          <Link to={"/"}>
            <img src={logo} width={50} height={50} alt={"logo"} />
          </Link>
        </div>

        <div className="flex items-center">
          <Link to={"/findProject"}>
            <div className="text-gray-800 mx-5 h-full flex justify-center border-2 border-transparent items-center hover:border-b-2 hover:border-b-blue-700 home">
              Find Projects
            </div>
          </Link>

          {/* <Link to={'/messages'}>
            <a className="text-gray-800  mx-5 h-full justify-center border-2 border-transparent items-center hover:border-b-2 hover:border-b-blue-700 messages hidden xl:flex">
              Messages
            </a>
          </Link>
          <Link to={'/messages'}>
            <a className="text-gray-800  mx-5 h-full justify-center border-2 border-transparent items-center hover:border-b-2 hover:border-b-blue-700 messages flex xl:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            </a>
          </Link> */}
        </div>
      </div>

      {userLS ? (
        <div className="flex items-center mx-2 xl:mx-10 h-full">
          <div className=" flex w-10 xl:w-52 justify-around items-end border-r border-r-gray-300 pr-5">
            <div className="hidden xl:block">
              <Link to={"/profile"}>
                <div className=" cursor-pointer hover:bg-blue-400 transition-all rounded-full p-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            <Link to={"/notification"}>
              <div className="cursor-pointer hover:bg-blue-400 transition-all rounded-full p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>

            <Link to={"/projects"}>
              <div
                className="cursor-pointer hover:bg-blue-400 transition-all rounded-full p-1"
                onClick={initApplication}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                  <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                </svg>
              </div>
            </Link>

            <div
              className="cursor-pointer hover:bg-blue-400 transition-all rounded-full p-1"
              onClick={logout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <Link to={"/postjob"}>
            <div className="mx-5 h-full flex border-2 border-transparent justify-center items-center hover:border-b-2 hover:border-b-blue-700 postjob">
              Post Project
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex items-center mx-2 xl:mx-10 h-full">
          <Link to={"/login"}>
            <div className="cursor-pointer hover:bg-blue-400 transition-all rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
