import { Project } from '../../../typing.d';

export const fetchProject = async () => {
  const res = await fetch(`https://hipproback.herokuapp.com/api/prj/getallprj`);

  const data = await res.json();
  const projects: Project[] = data.project;
  return projects;
};
