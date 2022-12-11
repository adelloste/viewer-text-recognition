import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Transcript from '../../features/Transcript/Transcript';
import NotFound from '../../features/NotFound/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/main',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <NotFound />
      },
      {
        path: 'transcript',
        element: <Transcript />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/main/transcript" replace />
  }
];
