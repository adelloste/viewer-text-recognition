import React from 'react';
import { useRoutes } from 'react-router-dom';
import ModalProvider from './features/dialog/modal-provider';
import useNotifier from './common/hooks/useNotifier';
import { routes } from './common/routes/routes';

const App = () => {
  useNotifier();
  const routing = useRoutes(routes);

  return <ModalProvider>{routing}</ModalProvider>;
};

export default App;
