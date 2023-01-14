import React, { ComponentType, createContext } from 'react';

export type ModalContextState = {
  state: State;
  showModal: ShowFn;
};

export type State = {
  [id: string]: DialogElement;
};

export type DialogElement = {
  component: ComponentType<any>;
  props?: object;
};

export type ShowFn = <P>(component: ComponentType<P>, props: Omit<P, 'open'>) => ShowFnOutput;

export type ShowFnOutput = {
  id: string;
  hide: () => void;
};

export const ModalContext = createContext<ModalContextState>({
  state: {},
  showModal: () => ({
    id: 'id',
    hide: () => {
      //
    }
  })
});
