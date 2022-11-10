import { Project } from "../../../typing.d";
import axios from "axios";
import { useDispatch } from "react-redux";

export const fetchProject = async (page: any) => {
  const res = await axios.get(
    `https://hipproback.herokuapp.com/api/prj/getallprj?page=${page - 1}`
  );
  const data = await res.data.project;
  const pages = await res.data.pageOptions.lastPage;
  const projects: Project[] = data;
  return { projects, pages };
};
