import React from "react";

type Props = {
  status: string;
};

function StatusButton({ status }: Props) {
  switch (status) {
    case "Accepted":
      return (
        <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 cursor-default text-center w-fit">
          Accepted
        </button>
      );
    case "Declined":
      return (
        <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 cursor-default text-center w-fit">
          Declined
        </button>
      );
    default:
      return (
        <button className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 cursor-default text-center w-fit ">
          Expired
        </button>
      );
  }
}

export default StatusButton;
