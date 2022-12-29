import React from 'react';
import { useRoutes } from 'react-router-dom';
import useNotifier from './common/hooks/useNotifier';
import { routes } from './common/routes/routes';

const App = () => {
  useNotifier();
  const routing = useRoutes(routes);

  return <>{routing}</>;
};

export default App;
