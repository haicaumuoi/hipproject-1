import React, { useEffect, useState } from "react";
import ProjectCard from "../components/JobPage/ProjectCard";
import SearchBar from "../components/SearchBar";
import { fetchProject } from "../utils/functions/fetchProject";
import { Project } from "../../typing";

import dateFormat from "../utils/functions/dateFormat";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { projectListSlice } from "../redux/ProjectListReducer";
import { userListSlice } from "../redux/UserListReducer";
import { fetchUserList } from "../utils/functions/fetchUserList";
import { userSlice } from "../redux/UserReducer";
import { searchListSlice } from "../redux/SearchListReducer";
import LoadingSpinner from "../utils/UI/LoadingSpinner";
import FindProjectSmall from "../utils/UI/findProjectSmall";
import { paginationSlice } from "../redux/PaginationSlice";

const FindProjects = () => {
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const [projects, setProjects] = useState<Project[]>([]);
  dispatch(projectListSlice.actions.initProjectList(projects));
  dispatch(userListSlice.actions.initUserList(userList));
  dispatch(searchListSlice.actions.searchProjectList(projects));

  const page = useSelector((state: any) => state.pagination.page);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchProject().then((res) => {
      setProjects(res);
      setIsLoading(false);
    });

    fetchUserList().then((res) => {
      setUserList(res);
    });
  }, []);

  return (
    <div>
      {isLoading ? <LoadingSpinner /> : <FindProjectSmall page={page} />}
    </div>
  );
};
export default FindProjects;
