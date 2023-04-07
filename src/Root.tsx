import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ProtectedRoute from './helpers/ProtectedRoute';
import { AuthProvider } from './providers/AuthProvider';
import Cars from './routes/Cars';
import Instructors from './routes/Instructors';
import Lessons from './routes/Lessons';
import Login from './routes/Login';
import Students from './routes/Students';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="lessons" element={<Lessons />} />
        <Route path="instructors" element={<Instructors />} />
        <Route path="students" element={<Students />} />
        <Route path="cars" element={<Cars />} />
      </Route>
    </Route>
  )
);

const Root = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default Root;
