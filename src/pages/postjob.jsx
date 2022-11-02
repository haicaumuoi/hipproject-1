import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import logo from '../assets/logos/logo.png';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import 'react-datepicker/dist/react-datepicker.css';
import {  useSelector } from 'react-redux';
import axios from 'axios';;

function Postjob() {



  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const user = useSelector((state) => state.user);
  const userID = user._id;


  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [uni, setUni] = useState('');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');
  const participants = [];
  const applications = [];

  const [field, setInputFields] = useState([
    {
      position: [''],
      skill: '', 
    },
  ]);

  const addInputField = () => {
    setInputFields([
      ...field,
      {
      position: [''], 
      skill: '',
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
    applications
  };

  // const dispatch = useDispatch();
  const client = axios.create({
    baseURL: "https://hipproback.herokuapp.com",
  });
  

  const handlePostJob = async () => {
  const respone = await client
    .post("/api/prj/create", {
      data: dataReturn
    });
    respone.status === 200 ? 
      console.log('success')
     : console.log('error');
  }


  
  return (
    <div className="flex justify-center mt-20">
      <div className="flex justify-between w-8/12 h-screen" >
        <div className="space-y-5 font-semibold text-lg xl:w-7/12">
          <div className=" text-4xl ">Create a project</div>
          <div>
            <h1>Your Project Name</h1>
            <input
              className="font-normal text-base border border-black rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
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
              className="font-normal text-base border border-black rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
              type="text"
              required
              placeholder='Short Description For People to find your project interesting'
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
            />
          </div>

          <div>
            <h1>Project University</h1>
            <input
              className="font-normal text-base border border-black rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
              type="text"
              required
              placeholder='e.g. "University of Toronto"'
              value={uni}
              onChange={(e) => setUni(e.target.value)}
            />
          </div>
          <div>
            <h1>Project Location</h1>
            <input
              className="font-normal text-base border border-black rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
              type="text"
              required
              placeholder='e.g. "Toronto, ON'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
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
              className="font-normal text-base border border-black rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={addDays(startDate, 1)}
              endDate={endDate}
              maxDate={addDays(new Date(), 100)}
              minDate={startDate}
              className="font-normal text-base border border-black rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
            />
          </div>

        {field.map((inputField, index) => (
           <div className="border border-black" key={index}>
           <div>
             <h1>Position Needed</h1>
             <input
               className="font-normal text-base border border-black rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
               type="text"
               required
               placeholder='e.g. "React, Excel, Photoshop, etc."'
               value={inputField.position}
               onChange={(e) => handleChange(index, e)}
               name='position'
             />

             <h1>Skill Needed</h1>
             {/* <Autocomplete
               multiple
               id="tags-standard"
               ref={ref0}
               options={fields}
               getOptionLabel={(option) => option}
               renderInput={(params) => (
                 <TextField
                   {...params}
                   variant="standard"
                   label="Multiple values"
                   placeholder="Favorites"
                 />
               )}
               onChange={(e) => handleChange(index, e)}
               componentName='skill'
             /> */}
             <input
               className="font-normal text-base border border-black rounded-lg h-10 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center  xl:col-span-3 focus:shadow-md pl-3"
               type="text"
               required
               placeholder='e.g. "React, Excel, Photoshop, etc."'
               value={inputField.skill}
               onChange={(e) => handleChange(index, e)}
               name='skill'
             />
           </div>
           <div>
           <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={addInputField}>Add Field</button>

             <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => {
              removeInputFields(index)
             }}>Remove Field</button>{' '}
           </div>

         </div>
        ))}
         

          <div></div>
          <div>
            <h1>Project Description </h1>
            <textarea
              className="font-normal text-base border border-black rounded-lg h-24 w-full xl:w-11/12 mt-2 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center xl:col-span-3 focus:shadow-md pl-3"
              required
              placeholder='e.g. "I need a website for my business that is easy to use and looks good."'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <button
            onClick={
              handlePostJob
            }
            className="w-11/12 h-12 bg-blue-800 font-semibold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md "
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
        </div>
        <div className="hidden xl:flex justify-end items-center">
          <img src={logo} alt="logos" className="w-96 h-96" />
        </div>
      </div>

    </div>
  );
}

export default Postjob;


