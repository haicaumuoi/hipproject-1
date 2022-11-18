import indeedLogo from "../assets/logos/logo.png";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { userSlice } from "../redux/UserReducer";
import { useDispatch } from "react-redux";
import { userListSlice } from "../redux/UserListReducer";
import { setErrorMessage, setSuccessMessage } from "../redux/messageReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LogIn() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const client = axios.create({
    baseURL: "https://hipproback.herokuapp.com",
  });

  const clientId =
    "613985939864-7h3brr80t1hh5cu13gtmlou9kr44s36t.apps.googleusercontent.com";

  const loginGoogle = async (email: string, googleId: string) => {
    const respone = await client.post("/api/login", {
      email: email,
      _id: googleId,
    });
    const data = await respone.data.data;
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(userSlice.actions.userLogIn(data));
    dispatch(userSlice.actions.setUserProject(respone.data.project));
    if (respone.status === 200) {
      navigate("/", { state: { user } });
      dispatch(setSuccessMessage("Login Successfully"));
    } else {
      dispatch(setErrorMessage("Login Failed"));
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res: any) => {
    loginGoogle(res.profileObj.email, res.profileObj.googleId);
  };

  const onFailure = (err: any) => {
    handleClick();
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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

        <GoogleLogin
          clientId={clientId as string}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          className="flex items-center w-11/12 h-12 rounded-lg mx-auto text-center border-gray-300 border mt-5 justify-center cursor-pointer hover:bg-slate-100 transition-all text-black"
        />

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Log in failed!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default LogIn;
