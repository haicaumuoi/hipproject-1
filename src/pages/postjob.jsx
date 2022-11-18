import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import logo from "../assets/logos/logo.png";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dateFormat from "../utils/functions/dateFormat";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../utils/UI/LoadingSpinner";
import { setErrorMessage, setSuccessMessage } from "../redux/messageReducer";
import { universities } from "../assets/data/university";
import { locationList } from "../assets/data/location";

function Postjob() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const user = useSelector((state) => state.user);
  const userID = user._id;

  const [name, setName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [uni, setUni] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const participants = [];
  const applications = [];

  const [field, setInputFields] = useState([
    {
      position: [""],
      skill: "",
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...field,
      {
        position: [""],
        skill: "",
      },
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...field];
    rows.splice(index, 1);
    setInputFields(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...field];
    list[index][name] = value;
    setInputFields(list);
  };

  const dataReturn = {
    userID,
    name,
    shortDesc,
    uni,
    location,
    startDate,
    endDate,
    desc,
    field,
    participants,
    applications,
  };

  const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useDispatch();
  const client = axios.create({
    baseURL: "https://hipproback.herokuapp.com",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePostJob = async () => {
    setIsLoading(true);
    const respone = await client.post("/api/prj/create", {
      data: dataReturn,
    });
    setIsLoading(false);
    respone.status === 201
      ? dispatch(setSuccessMessage("Post Project Successfully"))
      : dispatch(setErrorMessage("Post Project Failed"));
    setShowModal(false);
    navigate("/");
  };

  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="flex justify-center mt-20">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-between w-8/12 h-fit">
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Post Project Confirmation
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-col">
                      <p className="my-4 text-gray-600 text-lg">
                        Project name: {name}
                      </p>
                      <p className="my-4 text-gray-600 text-lg">
                        Project short description: {shortDesc}
                      </p>
                      <p className="my-4 text-gray-600 text-lg">
                        Project location: {location}
                      </p>
                      <p className="my-4 text-gray-600 text-lg">
                        Project University: {uni}
                      </p>
                      <p className="my-4 text-gray-600 text-lg">
                        Project duration: {dateFormat(startDate)} -{" "}
                        {dateFormat(endDate)}
                      </p>
                      {field.map((inputField, index) => (
                        <div key={index}>
                          <p>Project Positions</p>
                          <p className="my-4 text-gray-600 text-lg">
                            Role: {inputField.position}
                          </p>
                          <p className="my-4 text-gray-600 text-lg">
                            Skill: {inputField.skill}
                          </p>
                        </div>
                      ))}
                      <p className="my-4 text-gray-600 text-lg">
                        Project Description: {desc}
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handlePostJob}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
          <form className="space-y-5 font-semibold text-lg xl:w-7/12">
            <div className="text-4xl ">Create a project</div>
            <div>
              <h1>Your Project Name</h1>
              <input
                className="font-normal text-base border border-gray-400 rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
                type="text"
                required
                placeholder='e.g. "Build a website for my business"'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <h1>Your Project Short Description</h1>
              <input
                className="font-normal text-base border border-gray-400 rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
                type="text"
                required
                placeholder="Short Description For People to find your project interesting"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>

            <div>
              <h1>Project University</h1>
              <select
                className="select select-bordered select-lg w-full max-w-xs p-2 my-2 bg-white rounded-lg border border-gray-400 "
                value={uni}
                onChange={(e) => {
                  setUni(e.target.value);
                }}
              >
                {universities.map((uni) => (
                  <option
                    className="hover:bg-white hover:scale-105"
                    value={uni}
                  >
                    {uni}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h1>Project Location</h1>
              <select
                className="select select-bordered select-lg w-full max-w-xs p-2 my-2 bg-white rounded-lg border border-gray-400"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              >
                {locationList.map((location) => (
                  <option value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <h1>Project Duration</h1>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                minDate={startDate}
                endDate={endDate}
                className="font-normal text-base border border-gray-400 rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={addDays(startDate, 1)}
                endDate={endDate}
                maxDate={addDays(new Date(), 100)}
                minDate={startDate}
                className="font-normal text-base border border-gray-400 rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
              />
            </div>

            {field.length > 1
              ? field.map((inputField, index) => (
                  <div
                    className="border border-gray-400 w-full xl:w-11/12 rounded-xl px-5 py-3"
                    key={index}
                  >
                    <div className="text-xl">Postion</div>
                    <div className="space-y-3">
                      <h1>Role</h1>
                      <input
                        className="font-normal text-base border border-gray-400 rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
                        type="text"
                        required
                        placeholder='e.g. "React, Excel, Photoshop, etc."'
                        value={inputField.position}
                        onChange={(e) => handleChange(index, e)}
                        name="position"
                      />

                      <h1>Skill</h1>

                      <input
                        className="font-normal text-base border border-gray-400 rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
                        type="text"
                        required
                        placeholder='e.g. "React, Excel, Photoshop, etc."'
                        value={inputField.skill}
                        onChange={(e) => handleChange(index, e)}
                        name="skill"
                      />
                    </div>
                    <div className="mt-3 space-x-5">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                        onClick={addInputField}
                      >
                        Add Field
                      </button>
                      <button
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        onClick={() => {
                          removeInputFields(index);
                        }}
                      >
                        Remove Field
                      </button>{" "}
                    </div>
                  </div>
                ))
              : field.map((inputField, index) => (
                  <div
                    className="border border-gray-400 w-full xl:w-11/12 rounded-xl px-5 py-3"
                    key={index}
                  >
                    <div className="text-xl">Postion</div>
                    <div className="space-y-3">
                      <h1>Role</h1>
                      <input
                        className="font-normal text-base border border-gray-400 rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
                        type="text"
                        required
                        placeholder='e.g. "React, Excel, Photoshop, etc."'
                        value={inputField.position}
                        onChange={(e) => handleChange(index, e)}
                        name="position"
                      />

                      <h1>Skill</h1>

                      <input
                        className="font-normal text-base border border-gray-400 rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
                        type="text"
                        required
                        placeholder='e.g. "React, Excel, Photoshop, etc."'
                        value={inputField.skill}
                        onChange={(e) => handleChange(index, e)}
                        name="skill"
                      />
                    </div>
                    <div className="mt-3 space-x-5">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                        onClick={addInputField}
                      >
                        Add Field
                      </button>
                    </div>
                  </div>
                ))}

            <div></div>
            <div>
              <h1>Project Description </h1>
              <textarea
                className="font-normal text-base border border-gray-400 rounded-lg h-24 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center xl:col-span-3 focus:shadow-md pl-3"
                required
                placeholder='e.g. "I need a website for my business that is easy to use and looks good."'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-11/12 h-12 bg-blue-800 font-semibold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md shadow outline-none focus:outline-none mr-1 mb-1 ease-linear  duration-150"
            >
              <h1 className="mr-2">Post Job</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mt-[0.15rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </form>
          <div className="hidden xl:flex justify-end items-center">
            <img src={logo} alt="logos" className="w-96 h-96" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Postjob;
