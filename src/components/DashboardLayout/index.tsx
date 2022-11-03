import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { userSlice } from "../../redux/UserReducer";
import Footer from "../Footer";
// import Footer from '../Footer';
import Header from "../Header";
import Main from "../Main";

export default function DashboardLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userLS = localStorage.getItem("user");
  if (userLS) {
    dispatch(userSlice.actions.userLogIn(JSON.parse(userLS)));
  }

  const showHeader = location.pathname === "/login" ? false : true;
  return (
    <div>
      {showHeader && <Header />}
      <Main />
      <Footer />
    </div>
  );
}
