import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../animation/shine.css";
import { setSuccessMessage } from "../redux/messageReducer";
import { searchListSlice } from "../redux/SearchListReducer";
import { universities } from "../assets/data/university";

function SearchBar() {
  const dispatch = useDispatch();

  const [searchProject, setSearchProject] = useState("");

  const [uniState, setUniState] = useState("apple");
  const [descTime, setDescTime] = useState("desc");

  const handleSearchProject = (e: any) => {
    setSearchProject(e.target.value);
    e.preventDefault();
  };

  const sendSearchText = async () => {
    const response = await axios.get(
      `https://hipproback.herokuapp.com/api/prj/search?name=${searchProject}`
    );

    dispatch(searchListSlice.actions.searchProjectList(response.data));
    dispatch(setSuccessMessage("Search Successfully"));
  };

  const handleSortUni = async (value: string) => {
    setUniState(value);
    // const response = await axios.get(
    //   `https://hipproback.herokuapp.com/api/prj/search?name=${searchProject}&university=${value}`
    // );
    // dispatch(searchListSlice.actions.searchProjectList(response.data));
    dispatch(setSuccessMessage(`Sort By ${value} Successfully`));
  };
  const handleSortTime = async (value: string) => {
    setDescTime(value);
    // const response = await axios.get(
    //   `https://hipproback.herokuapp.com/api/prj/search?name=${searchProject}&university=${value}`
    // );
    // dispatch(searchListSlice.actions.searchProjectList(response.data));
    value === "desc"
      ? dispatch(setSuccessMessage(`Sort Time by Descending Successfully`))
      : dispatch(setSuccessMessage(`Sort Time by Ascending Successfully`));
  };

  return (
    <div className="w-9/12 h-60 xl:h-40 flex flex-col justify-center">
      <div className="inline-grid grid-cols-1 xl:grid-cols-7 gap-5 w-full text-center justify-around content-center">
        <input
          type="text"
          className="w-full h-12 border border-gray-500 rounded-lg mr-3 pl-3  focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center xl:col-span-6 focus:shadow-md"
          placeholder="Search for projects"
          onChange={handleSearchProject}
        />
        <button
          className="w-full xl:w-32 h-12 bg-blue-800 font-semibold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md shine"
          onClick={sendSearchText}
        >
          Find Project
        </button>
      </div>
      <div className="inline-grid grid-cols-1 xl:grid-cols-7 gap-5 w-full text-center justify-around content-center">
        <div className="col-span-3">
          <select
            className="select select-bordered select-lg w-full max-w-xs"
            value={uniState}
            onChange={(e) => {
              handleSortUni(e.target.value);
            }}
          >
            {universities.map((uni) => (
              <option value={uni}>{uni}</option>
            ))}
          </select>
        </div>
        <div className="col-span-3">
          <select
            className="select select-bordered select-lg w-full max-w-xs"
            value={descTime}
            onChange={(e) => {
              handleSortTime(e.target.value);
            }}
          >
            <option value={"desc"}>Sort Time by Descending</option>
            <option value={"asc"}>Sort Time by Ascending</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
