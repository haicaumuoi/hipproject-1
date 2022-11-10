import React from "react";
import { useSelector } from "react-redux";
import EditIcon from "../utils/UI/EditIcon";

function Profile() {
  const user = useSelector((state: any) => state.user);
  const [showModal, setShowModal] = React.useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowModal(false);
  };
  return (
    <div className="flex justify-center mt-5 ">
      {showModal ? (
        <>
          <form className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Post Project Confirmation
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-col">
                  <p className="my-4 text-gray-600 text-lg">
                    Set your name: {user.name}
                  </p>
                  <p className="my-4 text-gray-600 text-lg">
                    Set your location:
                  </p>

                  <p className="my-4 text-gray-600 text-lg">
                    Set your University:
                  </p>

                  <p className="my-4 text-gray-600 text-lg">
                    Your light description a bout yourself
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="flex flex-col justify-start items-start w-10/12 xl:w-[33%] h-screen ">
        <div className="w-full h-32 bg-white flex items-center">
          <div className="text-black font-extrabold text-2xl w-20 h-20 flex justify-center items-center">
            <img className="rounded-full" src={user.avatar} alt="avatar" />
          </div>
          <div className="flex flex-col space-y-2 pl-5">
            <h1 className="text-2xl font-bold">Amit Nair</h1>
            <div className="flex ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>

              <h1 className="ml-2">Ho Chi Minh City</h1>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg border border-gray-300 h-44 mt-10 pl-3 relative">
          <div className="font-semibold text-lg my-2">Contact Information</div>
          <div className="text-gray-600 space-y-1 pt-2">
            <div>Armit Nair</div>
            <div>{user.email}</div>
            <div>12345678911</div>
          </div>
          <button onClick={() => setShowModal(true)}>
            <EditIcon />
          </button>
        </div>
        <div className="w-full relative rounded-lg  border border-gray-300 h-44 mt-10 pl-3">
          <div className="font-semibold text-lg my-2">Personal Information</div>
          <div className="text-gray-600 space-y-1 pt-2">
            <div>Ho Chi Minh City</div>
            <div>FPT University</div>
            <div>Front-end Developer</div>
          </div>
          <button>
            <EditIcon />
          </button>
        </div>
        <div className="w-full relative rounded-lg border border-gray-300 h-fit pb-5 mt-10 pl-3">
          <div className="font-semibold text-lg my-2">Project Preferences</div>
          <div className="text-gray-600 space-y-1 pt-2 w-10/12">
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              harum quasi deleniti blanditiis nihil minus? Vero necessitatibus
              officia quis illo ullam pariatur dicta quas? Labore nemo
              exercitationem vitae quas quasi?
            </div>
          </div>
          <button>
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
