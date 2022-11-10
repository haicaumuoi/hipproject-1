import React from "react";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../../redux/messageReducer";

function AppliedButton({ state, prompt }: any) {
  const dispatch = useDispatch();
  return (
    <button
      className="w-56 xl:w-40 xl:h-10 h-14 bg-gray-800 font-bold text-white rounded-lg p-5 hover:bg-gray-900 transition-all flex justify-center items-center self-center hover:shadow-md cursor-not-allowed"
      onClick={() => {
        dispatch(setErrorMessage(prompt));
      }}
    >
      {state}
    </button>
  );
}

export default AppliedButton;
