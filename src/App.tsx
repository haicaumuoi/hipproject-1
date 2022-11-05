import React, { useEffect } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "./redux/messageReducer";

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const { message, variant } = useSelector((state: any) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.isEmpty(message) === false) {
      enqueueSnackbar(message, { variant: variant, autoHideDuration: 3000 });
      dispatch(clearMessage);
    }
  }, [message]);
  return (
    <div>
      <DashboardLayout></DashboardLayout>
    </div>
  );
}

export default App;
