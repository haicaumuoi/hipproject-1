import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import loadingSlice from "../../redux/LoadingSpinner";
import { userSlice } from "../../redux/UserReducer";
import LoadingSpinner from "../../utils/UI/LoadingSpinner";
import Footer from "../Footer";
// import Footer from '../Footer';
import Header from "../Header";
import Main from "../Main";

export default function DashboardLayout() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const userLS = localStorage.getItem("user");
    if (userLS) {
      dispatch(userSlice.actions.userLogIn(JSON.parse(userLS)));
    }
  }, []);

  const loading = useSelector((state: any) => state.loading.status);
  const showHeader = location.pathname === "/login" ? false : true;
  return (
    <div>
      {showHeader && <Header />}
      <Main />
      <Footer />
    </div>
  );
}
