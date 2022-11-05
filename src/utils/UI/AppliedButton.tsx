import React from "react";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../redux/messageReducer";

function AppliedButton() {
  const dispatch = useDispatch();
  return (
    <button
      className="w-56 xl:w-40 xl:h-10 h-14 bg-blue-800 font-bold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md cursor-not-allowed"
      onClick={() => {
        dispatch(setErrorMessage("You have already applied for this job"));
      }}
    >
      Applied
    </button>
  );
}

export default AppliedButton;
