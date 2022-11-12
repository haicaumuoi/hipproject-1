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
  const dispatch = useDispatch();

  const page = useSelector((state: any) => state.pagination.page);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchUserList().then((res) => {
      dispatch(userListSlice.actions.initUserList(res));
    });
    fetchProject(page).then((res) => {
      dispatch(searchListSlice.actions.searchProjectList(res.projects));
      dispatch(paginationSlice.actions.setMaxPage(res.pages));
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
