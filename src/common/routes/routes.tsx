import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Library from '../../features/library/Library';
import Collection from '../../features/collection/Collection';
import Transcription from '../../features/transcription/Transcription';
import NotFound from '../../features/not-found/NotFound';

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
    element: <Navigate to="/main/library" replace />
  }
];
