import { useContext } from 'react';
import { ModalContext, ShowFn } from '../modal-context';

export const useModal = (): { showModal: ShowFn } => {
  const { showModal } = useContext(ModalContext);

  return {
    showModal: (component, props) => showModal(component, props)
  };
};
