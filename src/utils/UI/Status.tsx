import React from "react";

type Props = {
  status: string;
};

function Status({ status }: Props) {
  switch (status) {
    case "Pending":
      return (
        <button
          type="button"
          className="text-white bg-gray-700 hover:bg-gray-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 cursor-not-allowed"
        >
          {status}
        </button>
      );
    case "Accepted":
      return (
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 cursor-not-allowed"
        >
          {status}
        </button>
      );
    default:
      return (
        <button
          type="button"
          className="text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 cursor-not-allowed"
        >
          {status}
        </button>
      );
  }
}

export default Status;
