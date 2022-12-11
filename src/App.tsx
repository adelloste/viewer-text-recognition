import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './common/routes/routes';

const App = () => {
  const routing = useRoutes(routes);

  return <>{routing}</>;
};

export default App;
