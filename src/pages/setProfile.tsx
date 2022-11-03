import React from "react";
import indeedLogo from "../assets/logos/logo.png";

type Props = {};

function SetProfile({}: Props) {
  return (
    <div className=" w-full h-screen pt-20 flex flex-col bg-gray-100 justify-start items-center">
      <img src={indeedLogo} alt={"logo"} className="w-20" />

      <div className="w-[31%] h-fit pb-10 mt-8 border border-gray-400 flex flex-col justify-start items-start bg-white rounded-lg">
        <h1 className="mx-5 mt-7 text-xl font-bold">
          Ready to take the next step?
        </h1>
        <p className="text-lg mx-5 my-2">Sign In With Google</p>
        <p className="text-xs mx-5">
          By logging in, you understand and agree to {"Hipproject's"} Terms. You
          also acknowledge our Cookie and Privacy policies.
        </p>
      </div>
    </div>
  );
}

export default SetProfile;
