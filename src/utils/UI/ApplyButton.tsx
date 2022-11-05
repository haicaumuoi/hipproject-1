import React from "react";
import "../../animation/shine.css";

type Props = {
  sendApplicationHandle: () => void;
};

function ApplyButton({ sendApplicationHandle }: Props) {
  return (
    <button
      className="w-56 xl:w-40 xl:h-10 h-14 bg-blue-800 font-bold text-white rounded-lg p-5 hover:bg-blue-900 transition-all flex justify-center items-center self-center hover:shadow-md shine"
      onClick={sendApplicationHandle}
    >
      Apply Now
    </button>
  );
}

export default ApplyButton;
