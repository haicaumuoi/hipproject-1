import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import FindProjects from '../pages/findProjects';
import Login from '../pages/login';
import Notification from '../pages/notification';
import Postjob from '../pages/postjob';
import Profile from '../pages/Profile';
import ProjectDetails from '../pages/projectDetails';
import Projects from '../pages/Projects';
import ProtectedRoute from './ProtectedRoute';

function Main() {
  const location = useLocation();
  const user = useSelector((state: any) => state.user);

  return (
    <div className='mb-20'>
    <Routes location={location} key={location.pathname}>

      <Route path="/" element={<FindProjects />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/findProject" element={<FindProjects />}></Route>
      <Route path="/findProject/:id" element={<ProjectDetails />}></Route>
      <Route path="/projects" element={
        <ProtectedRoute user={user}>
          <Projects/>
        </ProtectedRoute>
      }></Route>
      <Route path="/postjob" element={
        <ProtectedRoute user={user}>
          <Postjob />
        </ProtectedRoute>
      }></Route>
      <Route path="/profile" element={
        <ProtectedRoute user={user}>
          <Profile />
        </ProtectedRoute>
      }></Route>
      <Route path="/notification" element={
        <ProtectedRoute user={user}>
          <Notification />
        </ProtectedRoute>
      }></Route>
    </Routes></div>
  );
}

export default Main;
