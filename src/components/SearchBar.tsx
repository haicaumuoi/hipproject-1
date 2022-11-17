import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../animation/shine.css";
import { setErrorMessage, setSuccessMessage } from "../redux/messageReducer";
import { searchListSlice } from "../redux/SearchListReducer";
import { universities } from "../assets/data/university";
import { locationList } from "../assets/data/location";
import { paginationSlice } from "../redux/PaginationSlice";

function SearchBar() {
  const dispatch = useDispatch();

  const [uniState, setUniState] = useState(universities[0]);
  const [locationState, setLocationState] = useState(locationList[0]);
  const [descTime, setDescTime] = useState("desc");

  const sendSearchText = async () => {
    const search = document.getElementById("search") as HTMLInputElement;
    const searchText = search.value;
    console.log(searchText);
    const response = await axios.get(
      `https://hipproback.herokuapp.com/api/prj/searchname?name=${searchText}`
    );
    dispatch(searchListSlice.actions.searchProjectList(response.data.project));
    dispatch(setSuccessMessage("Search Successfully"));
    dispatch(paginationSlice.actions.setPagination(1));
  };

  const handleSortUni = async (value: string) => {
    setUniState(value);
    const search = document.getElementById("search") as HTMLInputElement;
    const searchText = search.value;
    const response = await axios.get(
      `https://hipproback.herokuapp.com/api/prj/search?university=${value}&location=${locationState}`
    );
    dispatch(searchListSlice.actions.searchProjectList(response.data.project));
    dispatch(setSuccessMessage(`Sort By ${value} Successfully`));
    dispatch(paginationSlice.actions.setPagination(1));
  };
  const handleSortLocation = async (value: string) => {
    setLocationState(value);
    const search = document.getElementById("search") as HTMLInputElement;
    const searchText = search.value;
    const response = await axios.get(
      `https://hipproback.herokuapp.com/api/prj/search?location=${value}&university=${uniState}`
    );

    dispatch(searchListSlice.actions.searchProjectList(response.data.project));
    dispatch(setSuccessMessage(`Sort By ${value} Successfully`));
    dispatch(paginationSlice.actions.setPagination(1));
  };
  const handleSortTime = async (value: string) => {
    setDescTime(value);
    if (value === "desc") {
      const response = await axios.get(
        `https://hipproback.herokuapp.com/api/prj/sortdesc`
      );
      if (response.status === 200) {
        dispatch(searchListSlice.actions.searchProjectList(response.data));
        dispatch(setSuccessMessage(`Sort Time by Descending Successfully`));
        dispatch(paginationSlice.actions.setPagination(1));
      } else {
        dispatch(setErrorMessage(`Sort Time by Descending Failed`));
      }
    } else {
      const response = await axios.get(
        `https://hipproback.herokuapp.com/api/prj/sortasc`
      );
      if (response.status === 200) {
        dispatch(searchListSlice.actions.searchProjectList(response.data));
        dispatch(setSuccessMessage(`Sort Time by Ascending Successfully`));
        dispatch(paginationSlice.actions.setPagination(1));
      } else {
        dispatch(setErrorMessage(`Sort Time by Ascending Failed`));
      }
    }
  };

  return (
    <div className="w-7/12 h-60 xl:h-40 flex flex-col justify-center">
      <div className="inline-grid grid-cols-1 xl:grid-cols-7 gap-5 w-full text-center justify-around content-center">
        <input
          type="text"
          className="w-full h-12 border border-gray-500 rounded-lg mr-3 pl-3  focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 self-center xl:col-span-6 focus:shadow-md"
          placeholder="Search for projects"
          id="search"
        />
        <button
          className="w-full xl:w-32 h-12 bg-blue-800 font-semibold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md shine"
          onClick={sendSearchText}
        >
          Find Project
        </button>
      </div>
      <div className="inline-grid grid-cols-1 xl:grid-cols-7 gap-5 w-full text-center justify-around content-center pt-6">
        <div className="col-span-2">
          <select
            className="w-1/2 max-w-xs py-2 pl-3 pr-10 text-xl border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md hover:scale-105 transition-transform font-semibold"
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
        <div className="col-span-2">
          <select
            className="w-1/2 max-w-xs py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md hover:scale-105 transition-transform font-semibold"
            value={locationState}
            onChange={(e) => {
              handleSortLocation(e.target.value);
            }}
          >
            {locationList.map((location) => (
              <option value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <select
            className="w-full max-w-xs py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md hover:scale-105 transition-transform font-semibold"
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
