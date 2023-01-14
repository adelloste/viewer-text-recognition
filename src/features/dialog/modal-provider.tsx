import React, { useState } from 'react';
import { ModalContext, State, ShowFn, ShowFnOutput } from './modal-context';

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const [state, setState] = useState<State>({});

  const hide = (id: string) => {
    setState(state => {
      const { [id]: _, ...rest } = state;
      return rest;
    });
  };

  const show: ShowFn = (component, props): ShowFnOutput => {
    const id = `id-${Date.now()}`;

    setState(state => ({
      ...state,
      [id]: {
        component,
        props: {
          ...props,
          open: true
        }
      }
    }));

    return {
      id,
      hide: () => hide(id)
    };
  };

  const render = () => {
    return Object.keys(state).map(id => {
      const { component: Component, props } = state[id];

      return <Component {...props} key={id} onClose={() => hide(id)} />;
    });
  };

  return (
    <ModalContext.Provider
      value={{
        state,
        showModal: show
      }}
    >
      {children}
      {render()}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
