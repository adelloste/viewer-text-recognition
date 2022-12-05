import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Transcript from '../../features/Transcript/Transcript';

export const routes: RouteObject[] = [
  {
    path: '/transcript',
    element: <Transcript />
  },
  {
    path: '*',
    element: <Navigate to="/transcript" replace />
  }
];
