import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Library from '../../features/Library/Library';
import Collection from '../../features/Collection/Collection';
import Transcription from '../../features/Transcription/Transcription';
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
        path: 'library',
        element: <Library />
      },
      {
        path: 'collection/:id',
        element: <Collection />
      },
      {
        path: 'transcription/:id',
        element: <Transcription />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/main/transcription" replace />
  }
];
