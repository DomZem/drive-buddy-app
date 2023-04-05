import { type FC } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ handleClose, isOpen, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      appElement={document.getElementById('root') as HTMLElement}
      onRequestClose={handleClose}
      style={{
        overlay: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '12px',
          backgroundColor: 'rgba(107, 114, 128, 0.75)',
        },
        content: {
          position: 'static',
          backgroundColor: 'white',
          padding: '0px',
          border: 'none',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '476px',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
