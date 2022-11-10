import { useEffect, useState } from "react";
import { fetchProject } from "../utils/functions/fetchProject";

import { useDispatch, useSelector } from "react-redux";
import { projectListSlice } from "../redux/ProjectListReducer";
import { userListSlice } from "../redux/UserListReducer";
import { fetchUserList } from "../utils/functions/fetchUserList";
import { searchListSlice } from "../redux/SearchListReducer";
import LoadingSpinner from "../utils/UI/LoadingSpinner";
import FindProjectSmall from "../utils/UI/findProjectSmall";
import { paginationSlice } from "../redux/PaginationSlice";

const FindProjects = () => {
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  dispatch(userListSlice.actions.initUserList(userList));
  const projects = useSelector((state: any) => state.projectList.projectList);
  dispatch(searchListSlice.actions.searchProjectList(projects));

  const page = useSelector((state: any) => state.pagination.page);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchProject(page).then((res) => {
      dispatch(projectListSlice.actions.initProjectList(res.projects));
      dispatch(paginationSlice.actions.setMaxPage(res.pages));
    });
    fetchUserList().then((res) => {
      setUserList(res);
    });
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? <LoadingSpinner /> : <FindProjectSmall page={page} />}
    </div>
  );
};
export default FindProjects;
