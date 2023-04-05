import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import './index.css';
import Cars from './routes/Cars';
import Instructors from './routes/Instructors';
import Lessons from './routes/Lessons';
import Root from './routes/Root';
import Sutdents from './routes/Students';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="lessons" />} />
      <Route path="lessons" element={<Lessons />} />
      <Route path="instructors" element={<Instructors />} />
      <Route path="students" element={<Sutdents />} />
      <Route path="cars" element={<Cars />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
