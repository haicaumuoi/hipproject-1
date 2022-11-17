import React from "react";

type Props = {
  avatar: string;
  email: string;
};

function Participant({ avatar, email }: Props) {
  return (
    <div className="flex items-center space-x-2 my-2 overflow-visible">
      <img className="w-10 h-10 rounded-full" src={avatar} alt="avt" />
      <p>{email}</p>
    </div>
  );
}

export default Participant;
