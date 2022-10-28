import { Project } from '../../../typing.d';

export const fetchProject = async () => {
  const res = await fetch(`http://localhost:5000/api/prj/getallprj`);

  const data = await res.json();
  const projects: Project[] = data.project;
  return projects;
};
